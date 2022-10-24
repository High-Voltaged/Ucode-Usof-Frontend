import { Avatar, Card, Col, Container, Text } from "@nextui-org/react";
import { useParams } from "react-router-dom";
import { AVATAR_PATH } from "~/consts/utils";
import { LIKES_ENUM } from "~/consts/validation";
import useAuthorLike from "~/hooks/use-author-like";
import useDate from "~/hooks/use-date";
import useDomPurify from "~/hooks/use-dom-purify";
import {
  useAddAnswerLikeMutation,
  useGetAnswerLikesQuery,
} from "~/redux/api/answers-api";
import DislikeButton from "../Button/DislikeButton";
import LikeButton from "../Button/LikeButton";
import { answer as styles } from "./Card.styles";

const AnswerCard = ({
  answer: { id, content, authorLogin, authorAvatar, publishDate, rating },
  ...props
}) => {
  const { id: postId } = useParams();
  const { date } = useDate(publishDate);
  const { sanitized } = useDomPurify(content);
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
            <LikeButton like={authorLike} handler={addLikeHandler} />
            <Text css={styles.likesCount}>{rating}</Text>
            <DislikeButton like={authorLike} handler={addDislikeHandler} />
          </div>
        </Col>
        <Col span={10} css={styles.colRight}>
          <Card.Body css={{ p: 0 }}>
            <div dangerouslySetInnerHTML={{ __html: sanitized }}></div>
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
