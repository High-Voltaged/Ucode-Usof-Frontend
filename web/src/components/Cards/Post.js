import { Avatar, Card, Col, Container, Text, Grid } from "@nextui-org/react";
import { AVATAR_PATH } from "~/consts/utils";
import useDate from "~/hooks/use-date";
import CategoryBadges from "~/components/Category/Badges";
import { post as styles } from "./Card.styles";
import {
  useAddPostLikeMutation,
  useGetPostCategoriesQuery,
  useGetPostLikesQuery,
} from "~/redux/api/posts-api";
import { useEffect, useState } from "react";
import useAuthorLike from "~/hooks/use-author-like";
import { LIKES_ENUM } from "~/consts/validation";
import useDomPurify from "~/hooks/use-dom-purify";
import LikeButton from "../Button/LikeButton";
import DislikeButton from "../Button/DislikeButton";
import EditButton from "../Button/EditButton";
import { postNav } from "~/consts/routes";
import { useNavigate } from "react-router-dom";
import useAuthCheck from "~/hooks/use-auth-check";
import ErrorTitle from "../ErrorTitle/ErrorTitle";

const PostCard = ({
  post: {
    id,
    title,
    content,
    author: authorId,
    authorLogin,
    authorAvatar,
    publishDate,
    rating,
  },
  onPress = null,
  ...props
}) => {
  const { date } = useDate(publishDate);
  const { authorLike, author } = useAuthorLike(id, useGetPostLikesQuery);
  const { authCheck } = useAuthCheck();
  const { sanitized } = useDomPurify(content);
  const navigate = useNavigate();

  const isPostAuthor = author === authorId;
  const isPostPage = onPress === null;

  const { data: categoriesData, error } = useGetPostCategoriesQuery(id);
  const [addLike] = useAddPostLikeMutation();

  const addLikeHandler = () =>
    authCheck(() => addLike({ postId: id, type: LIKES_ENUM[0], author }));

  const addDislikeHandler = () =>
    authCheck(() => addLike({ postId: id, type: LIKES_ENUM[1], author }));

  const [categories, setCategories] = useState([]);
  const categoryBadges = error ? (
    <ErrorTitle size={14} text="The post is inactive" />
  ) : (
    <CategoryBadges categories={categories} />
  );

  const editHandler = () => navigate(postNav.edit(id));

  useEffect(() => {
    categoriesData && setCategories(categoriesData);
  }, [categoriesData]);

  const footerStyles = isPostPage
    ? { ...styles.container, ...styles.colBottom }
    : { ...styles.container };

  return (
    <Card css={styles.card} onPress={onPress} {...props}>
      <Container css={styles.container}>
        <Col span={1}>
          <div style={styles.likes}>
            <LikeButton
              like={authorLike}
              handler={addLikeHandler}
              disabled={!isPostPage}
            />
            <Text css={styles.likesCount}>{rating}</Text>
            <DislikeButton
              like={authorLike}
              handler={addDislikeHandler}
              disabled={!isPostPage}
            />
          </div>
        </Col>
        <Col span={10} css={styles.colRight}>
          <Card.Body css={{ p: 0 }}>
            <Text h3>{title}</Text>
            {isPostPage && (
              <div dangerouslySetInnerHTML={{ __html: sanitized }}></div>
            )}
          </Card.Body>
          <Card.Footer css={footerStyles}>
            <Grid.Container gap={2} css={styles.footerGrid}>
              <Grid xs={12}>{categoryBadges}</Grid>
              {isPostPage && isPostAuthor && (
                <Grid xs={2}>
                  <EditButton onPress={editHandler} />
                </Grid>
              )}
              <Grid
                xs={isPostPage && isPostAuthor ? 10 : 12}
                css={{ jc: "flex-end" }}
              >
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
};

export default PostCard;
