import { Grid, Spacer } from "@nextui-org/react";
import { useEffect, useState } from "react";
import AnswerCard from "~/components/Cards/Answer";
import ErrorTitle from "~/components/ErrorTitle/ErrorTitle";
import Loader from "~/components/Loader/Loader";
import { useGetPostAnswersQuery } from "~/redux/api/posts-api";
import CommentsContainer from "../comments/CommentsContainer";
import CreateComment from "../comments/CreateComment";
import styles from "./AnswersContainer.styles";

const AnswersContainer = ({ postId }) => {
  const { data, isFetching, error } = useGetPostAnswersQuery(postId);

  const [answers, setAnswers] = useState(null);

  useEffect(() => {
    data && setAnswers(data);
  }, [data]);

  if (isFetching) {
    return <Loader isFullScreen />;
  }

  if (error) {
    return <ErrorTitle text={error.data.message} />;
  }

  const answerCards = (answers || []).map((a) => (
    <>
      <Grid.Container xs={12} css={{ jc: "center" }} key={a.id}>
        <Grid xs={12}>
          <AnswerCard answer={a} />
        </Grid>
        <Grid xs={12} sm={11} css={styles.container}>
          <CommentsContainer answerId={a.id} />
          <CreateComment answerId={a.id} />
        </Grid>
      </Grid.Container>
      <Spacer y={4} />
    </>
  ));

  const answerContent =
    isFetching || !answers ? (
      <Loader isFullScreen />
    ) : !answerCards.length ? (
      <ErrorTitle size={40} text="There are no answers here yet." />
    ) : (
      <Grid.Container
        gap={2}
        alignContent="flex-start"
        justify="center"
        css={{ mt: "15px" }}
      >
        {answerCards}
      </Grid.Container>
    );

  return (
    <Grid.Container alignContent="flex-start">{answerContent}</Grid.Container>
  );
};

export default AnswersContainer;
