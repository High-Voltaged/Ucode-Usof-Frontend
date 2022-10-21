import { Avatar, Button, Card, Col, Container, Text } from "@nextui-org/react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { AVATAR_PATH } from "~/consts/utils";
import { LIKES_ENUM } from "~/consts/validation";
import useAuthorLike from "~/hooks/use-author-like";
import useDate from "~/hooks/use-date";
import {
  useAddAnswerLikeMutation,
  useGetAnswerLikesQuery,
} from "~/redux/api/answers-api";
import { colors } from "~/theme/config";
import { answer as styles } from "./Card.styles";

const AnswerCard = ({
  answer: { id, content, authorLogin, authorAvatar, publishDate, rating },
  ...props
}) => {
  const { id: postId } = useParams();
  const { date } = useDate(publishDate);
  const { authorLike, author } = useAuthorLike(id, useGetAnswerLikesQuery);

  const [addLike] = useAddAnswerLikeMutation();

  const addLikeHandler = () =>
    addLike({
      answerId: id,
      type: LIKES_ENUM[0],
      author,
      postId: Number(postId),
    });
  const addDislikeHandler = () =>
    addLike({
      answerId: id,
      type: LIKES_ENUM[1],
      author,
      postId: Number(postId),
    });

  return (
    <Card css={styles.card} {...props}>
      <Container css={styles.container}>
        <Col span={1}>
          <div style={styles.likes}>
            <Button
              light={authorLike !== LIKES_ENUM[0]}
              flat={authorLike === LIKES_ENUM[0]}
              auto
              css={{ minWidth: "auto" }}
              icon={<FaChevronUp size={20} />}
              onPress={addLikeHandler}
            />
            <Text css={styles.likesCount}>{rating}</Text>
            <Button
              light={authorLike !== LIKES_ENUM[1]}
              flat={authorLike === LIKES_ENUM[1]}
              auto
              css={{ minWidth: "auto" }}
              icon={<FaChevronDown size={20} />}
              onPress={addDislikeHandler}
            />
          </div>
        </Col>
        <Col span={10} css={styles.colRight}>
          <Card.Body css={{ p: 0 }}>
            <Text color={colors.default}>{content}</Text>
          </Card.Body>
          <Card.Footer css={{ ...styles.container, ...styles.colBottom }}>
            <Container css={styles.container}>
              <Col css={{ ...styles.footer, ...styles.colBottom }}>
                <Avatar size="sm" src={AVATAR_PATH(authorAvatar)} />
                <Text size="xs" css={styles.footerItem}>
                  {authorLogin}
                </Text>
                <Text size="xs" css={styles.footerItem}>
                  {date}
                </Text>
              </Col>
            </Container>
          </Card.Footer>
        </Col>
      </Container>
    </Card>
  );
};

export default AnswerCard;
