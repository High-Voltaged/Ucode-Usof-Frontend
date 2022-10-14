import { Card, Text, useTheme } from "@nextui-org/react";

const PostCard = ({
  post: { title, content, authorLogin, authorAvatar, publishDate, likesCount },
}) => {
  const {
    theme: { colors },
  } = useTheme();
  return (
    <Card
      isHoverable
      isPressable
      css={{ bgColor: colors.warningLightActive.value, p: "16px" }}
    >
      <Card.Header>
        <Text h3>{title}</Text>
      </Card.Header>
      <Card.Body>
        <Text color={colors.default}>{content}</Text>
      </Card.Body>
    </Card>
  );
};

export default PostCard;
