import { Avatar, Card, Grid, Text } from "@nextui-org/react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { AVATAR_PATH } from "~/consts/utils";
import EditCommentForm from "~/containers/comments/EditCommentForm";
import useDate from "~/hooks/use-date";
import { colors } from "~/theme/config";
import EditButton from "../Button/EditButton";
import { comment as styles } from "./Card.styles";

const CommentCard = ({
  comment: { id, content, author, authorLogin, authorAvatar, publishDate },
  ...props
}) => {
  const { date } = useDate(publishDate);
  const [editMode, setEditMode] = useState(false);
  const { user } = useSelector((state) => state.auth);

  const isPostAuthor = author === user.id;

  const Comment = (
    <Card css={styles.card} {...props}>
      <Card.Body css={{ p: 0 }}>
        <Text color={colors.default}>{content}</Text>
      </Card.Body>
      <Card.Footer style={{ ...styles.container, ...styles.colBottom }}>
        <Grid.Container gap={1} css={styles.footerGrid}>
          {isPostAuthor && (
            <Grid xs={2}>
              <EditButton onPress={() => setEditMode(true)} />
            </Grid>
          )}
          <Grid xs={isPostAuthor ? 10 : 12} css={{ jc: "flex-end" }}>
            <Avatar size="xs" src={AVATAR_PATH(authorAvatar)} />
            <Text size="xs" css={styles.footerItem}>
              {authorLogin}
            </Text>
            <Text size="xs" css={styles.footerItem}>
              {date}
            </Text>
          </Grid>
        </Grid.Container>
      </Card.Footer>
    </Card>
  );

  return !editMode ? (
    Comment
  ) : (
    <EditCommentForm
      comment={{ id, content }}
      onCancel={() => setEditMode(false)}
    />
  );
};

export default CommentCard;
