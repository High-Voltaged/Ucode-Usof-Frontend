import { Avatar, Button, Card, Col, Container, Text } from "@nextui-org/react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { AVATAR_PATH } from "~/consts/utils";
import useDate from "~/hooks/use-date";
import { colors } from "~/theme/config";
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

const PostCard = ({
  post: { id, title, content, authorLogin, authorAvatar, publishDate, rating },
  onPress = null,
  ...props
}) => {
  const { date } = useDate(publishDate);
  const { authorLike, author } = useAuthorLike(id, useGetPostLikesQuery);

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

  return (
    <Card css={styles.card} onPress={onPress} {...props}>
      <Container css={styles.container}>
        <Col span={1}>
          <div style={styles.likes}>
            <Button
              light={authorLike !== LIKES_ENUM[0]}
              flat={authorLike === LIKES_ENUM[0]}
              auto
              disabled={onPress !== null}
              css={{ minWidth: "auto" }}
              icon={<FaChevronUp size={20} />}
              onPress={addLikeHandler}
            />
            <Text css={styles.likesCount}>{rating}</Text>
            <Button
              light={authorLike !== LIKES_ENUM[1]}
              flat={authorLike === LIKES_ENUM[1]}
              auto
              disabled={onPress !== null}
              css={{ minWidth: "auto" }}
              icon={<FaChevronDown size={20} />}
              onPress={addDislikeHandler}
            />
          </div>
        </Col>
        <Col span={10} css={styles.colRight}>
          <Card.Body css={{ p: 0 }}>
            <Text h3>{title}</Text>
            <Text color={colors.default}>{content}</Text>
          </Card.Body>
          <Card.Footer css={{ ...styles.container, ...styles.colBottom }}>
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
