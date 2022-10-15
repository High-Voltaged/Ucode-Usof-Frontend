import { Avatar, Card, Col, Container, Text } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { useParams } from "react-router-dom";
import CategoryBadges from "~/components/Category/Badges";
import ErrorTitle from "~/components/ErrorTitle/ErrorTitle";
import Loader from "~/components/Loader/Loader";
import { AVATAR_PATH } from "~/consts/utils";
import useDate from "~/hooks/use-date";
import useRequest from "~/hooks/use-request";
import PostsRequests from "~/requests/posts";
import { colors } from "~/theme/config";
import styles from "./PostContainer.styles";

const PostsContainer = () => {
  const { sendRequest, error, loading, responseData } = useRequest(
    PostsRequests.getPost
  );

  const { id } = useParams();

  const [post, setPost] = useState({});
  const { date } = useDate(post.publishDate);

  useEffect(() => {
    sendRequest(id);
  }, [sendRequest, id]);

  useEffect(() => {
    if (responseData && !error) {
      setPost(responseData);
    }
  }, [responseData, error]);

  if (loading) {
    return <Loader isFullScreen />;
  }

  if (error) {
    return <ErrorTitle text={error} />;
  }

  if (!responseData || !post) {
    return <ErrorTitle text="No post found with that id." />;
  }

  const categoryBadges = <CategoryBadges categories={post.categories} />;

  return (
    <Card isHoverable isPressable css={styles.post}>
      <Container css={styles.container}>
        <Col span={1}>
          <div style={styles.postLikes}>
            <span>
              <FaChevronUp size={20} />
            </span>
            <Text css={styles.likesCount}>{post.likesCount}</Text>
            <span>
              <FaChevronDown size={20} />
            </span>
          </div>
        </Col>
        <Col span={10} css={styles.colRight}>
          <Card.Body css={{ p: 0 }}>
            <Text h3>{post.title}</Text>
            <Text color={colors.default}>{post.content}</Text>
          </Card.Body>
          <Card.Footer css={{ ...styles.container, ...styles.colBottom }}>
            <Container css={{ ...styles.container, ...styles.badges }}>
              <Col>{categoryBadges}</Col>
              <Col css={{ ...styles.footerCol, ...styles.colBottom }}>
                <Avatar size="sm" src={AVATAR_PATH(post.authorAvatar)} />
                <Text size="xs" css={styles.footerItem}>
                  {post.authorLogin}
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

export default PostsContainer;
