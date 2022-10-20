import { Avatar, Card, Col, Container, Text } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { AVATAR_PATH } from "~/consts/utils";
import useDate from "~/hooks/use-date";
import { useGetAnswerLikesQuery } from "~/redux/api/posts-api";
import { colors } from "~/theme/config";
import { answer as styles } from "./Card.styles";

const AnswerCard = ({
  answer: { id, content, authorLogin, authorAvatar, publishDate },
  ...props
}) => {
  const { date } = useDate(publishDate);

  const { data: likesData } = useGetAnswerLikesQuery(id);

  const [likes, setLikes] = useState([]);

  useEffect(() => {
    likesData && setLikes(likesData);
  }, [likesData]);

  return (
    <Card css={styles.card} {...props}>
      <Container css={styles.container}>
        <Col span={1}>
          <div style={styles.likes}>
            <span>
              <FaChevronUp size={20} />
            </span>
            <Text css={styles.likesCount}>{likes.length}</Text>
            <span>
              <FaChevronDown size={20} />
            </span>
          </div>
        </Col>
        <Col span={10} css={styles.colRight}>
          <Card.Body css={{ p: 0 }}>
            <Text color={colors.default}>{content}</Text>
          </Card.Body>
          <Card.Footer css={{ ...styles.container, ...styles.colBottom }}>
            <Container css={styles.container}>
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

export default AnswerCard;
