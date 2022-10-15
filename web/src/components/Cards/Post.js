import { Avatar, Badge, Card, Col, Container, Text } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { AVATAR_PATH } from "~/consts/utils";
import useDate from "~/hooks/use-date";
import useRequest from "~/hooks/use-request";
import PostsRequests from "~/requests/posts";
import { colors } from "~/theme/config";
import styles from "./Card.styles";

const PostCard = ({
  post: {
    id,
    title,
    content,
    authorLogin,
    authorAvatar,
    publishDate,
    likesCount,
  },
}) => {
  const { date } = useDate(publishDate);
  const [categories, setCategories] = useState([]);
  const { loading, sendRequest, responseData, error } = useRequest(
    PostsRequests.getPostCategories
  );

  useEffect(() => {
    sendRequest(id);
  }, [sendRequest, id]);

  useEffect(() => {
    if (responseData && !error) {
      setCategories(responseData);
    }
  }, [responseData, error]);

  const categoryBadges = loading ? (
    <Badge variant="points" />
  ) : (
    categories.map((c) => (
      <Badge variant="flat" key={c.title} size="md">
        {c.title}
      </Badge>
    ))
  );

  return (
    <Card isHoverable isPressable css={styles.post}>
      <Container css={styles.container}>
        <Col span={1}>
          <div style={styles.postLikes}>
            <span>
              <FaChevronUp size={20} />
            </span>
            <Text css={styles.likesCount}>{likesCount}</Text>
            <span>
              <FaChevronDown size={20} />
            </span>
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
              <Col css={{ ...styles.footerCol, ...styles.colBottom }}>
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
