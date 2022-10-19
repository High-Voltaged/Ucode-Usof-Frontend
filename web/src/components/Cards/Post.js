import { Avatar, Card, Col, Container, Text } from "@nextui-org/react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { AVATAR_PATH } from "~/consts/utils";
import useDate from "~/hooks/use-date";
import { colors } from "~/theme/config";
import CategoryBadges from "~/components/Category/Badges";
import { post as styles } from "./Card.styles";

const PostCard = ({
  post: {
    title,
    content,
    authorLogin,
    authorAvatar,
    publishDate,
    likesCount,
    categories,
  },
  onPress = null,
  ...props
}) => {
  const { date } = useDate(publishDate);

  const categoryBadges = <CategoryBadges categories={categories} />;

  return (
    <Card css={styles.card} onPress={onPress} {...props}>
      <Container css={styles.container}>
        <Col span={1}>
          <div style={styles.likes}>
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
