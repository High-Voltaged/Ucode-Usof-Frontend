import { Avatar, Card, Col, Container, Grid, Text } from "@nextui-org/react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { AVATAR_PATH } from "~/consts/utils";
import { LIKES_ENUM } from "~/consts/validation";
import EditAnswerForm from "~/containers/answers/EditAnswerForm";
import useAuthCheck from "~/hooks/use-auth-check";
import useAuthorLike from "~/hooks/use-author-like";
import useDate from "~/hooks/use-date";
import useDomPurify from "~/hooks/use-dom-purify";
import {
  useAddAnswerLikeMutation,
  useGetAnswerLikesQuery,
} from "~/redux/api/answers-api";
import DislikeButton from "../Button/DislikeButton";
import EditButton from "../Button/EditButton";
import LikeButton from "../Button/LikeButton";
import { answer as styles } from "./Card.styles";

const AnswerCard = ({
  answer: {
    id,
    content,
    author: authorId,
    authorLogin,
    authorAvatar,
    publishDate,
    rating,
  },
  ...props
}) => {
  const { id: postId } = useParams();
  const { date } = useDate(publishDate);
  const { authCheck } = useAuthCheck();
  const { sanitized } = useDomPurify(content);
  const { authorLike, author } = useAuthorLike(id, useGetAnswerLikesQuery);

  const isPostAuthor = authorId === author;

  const [editMode, setEditMode] = useState(false);

  const [addLike] = useAddAnswerLikeMutation();

  const addLikeHandler = () =>
    authCheck(() =>
      addLike({
        answerId: id,
        type: LIKES_ENUM[0],
        author,
        postId: Number(postId),
      })
    );
  const addDislikeHandler = () =>
    authCheck(() =>
      addLike({
        answerId: id,
        type: LIKES_ENUM[1],
        author,
        postId: Number(postId),
      })
    );

  const Answer = (
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
            <Grid.Container gap={1} css={styles.footerGrid}>
              {isPostAuthor && (
                <Grid xs={2}>
                  <EditButton onPress={() => setEditMode(true)} />
                </Grid>
              )}
              <Grid xs={isPostAuthor ? 10 : 12} css={{ jc: "flex-end" }}>
                <Avatar size={styles.avatar} src={AVATAR_PATH(authorAvatar)} />
                <Text size="xs" css={styles.footerItem}>
                  {authorLogin}
                </Text>
                <Text size="xs" css={styles.footerItem}>
                  {date}
                </Text>
              </Grid>
            </Grid.Container>
          </Card.Footer>
        </Col>
      </Container>
    </Card>
  );

  return !editMode ? (
    Answer
  ) : (
    <EditAnswerForm
      answer={{ id, content }}
      onCancel={() => setEditMode(false)}
    />
  );
};

export default AnswerCard;
