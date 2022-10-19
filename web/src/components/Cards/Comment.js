import { Avatar, Card, Container, Text } from "@nextui-org/react";
import { AVATAR_PATH } from "~/consts/utils";
import useDate from "~/hooks/use-date";
import { colors } from "~/theme/config";
import { comment as styles } from "./Card.styles";

const CommentCard = ({
  comment: { content, authorLogin, authorAvatar, publishDate },
  ...props
}) => {
  const { date } = useDate(publishDate);

  return (
    <Card css={styles.card} {...props}>
      <Container css={styles.container}>
        <div>
          <Text color={colors.default}>{content}</Text>
        </div>
        <div style={{ ...styles.container, ...styles.footer }}>
          <Avatar size="xs" src={AVATAR_PATH(authorAvatar)} />
          <Text size="xs" css={styles.footerItem}>
            {authorLogin}
          </Text>
          <Text size="xs" css={styles.footerItem}>
            {date}
          </Text>
        </div>
      </Container>
    </Card>
  );
};

export default CommentCard;
