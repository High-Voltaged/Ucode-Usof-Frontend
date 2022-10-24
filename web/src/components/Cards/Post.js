import { Avatar, Card, Col, Container, Text } from "@nextui-org/react";
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
            <Container css={{ ...styles.container, ...styles.badges }}>
              <Col>{categoryBadges}</Col>
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

export default PostCard;
