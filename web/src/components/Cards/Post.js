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
import EditDeleteBtns from "../Button/EditButton";
import { postNav } from "~/consts/routes";

const PostCard = ({
  post: { id, title, content, authorLogin, authorAvatar, publishDate, rating },
  onPress = null,
  ...props
}) => {
  const isPostPage = onPress === null;
  const { date } = useDate(publishDate);
  const { authorLike, author } = useAuthorLike(id, useGetPostLikesQuery);
  const { sanitized } = useDomPurify(content);

  const { data: categoriesData } = useGetPostCategoriesQuery(id);
  const [addLike] = useAddPostLikeMutation();

  const addLikeHandler = () =>
    addLike({ postId: id, type: LIKES_ENUM[0], author });
  const addDislikeHandler = () =>
    addLike({ postId: id, type: LIKES_ENUM[1], author });

  const [categories, setCategories] = useState([]);
  const categoryBadges = <CategoryBadges categories={categories} />;

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
            <Grid.Container
              gap={2}
              css={{ px: 0, flexWrap: "wrap" }}
              alignItems="center"
            >
              <Grid xs={12}>{categoryBadges}</Grid>
              {isPostPage && (
                <Grid xs={2}>
                  <EditDeleteBtns routeTo={postNav.edit(id)} />
                </Grid>
              )}
              <Grid xs={isPostPage ? 10 : 12} css={{ jc: "flex-end" }}>
                <Avatar size="sm" src={AVATAR_PATH(authorAvatar)} />
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
