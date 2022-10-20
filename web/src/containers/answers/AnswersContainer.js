import { Grid } from "@nextui-org/react";
import { useEffect, useState } from "react";
import AnswerCard from "~/components/Cards/Answer";
import ErrorTitle from "~/components/ErrorTitle/ErrorTitle";
import Loader from "~/components/Loader/Loader";
import { useGetPostAnswersQuery } from "~/redux/api/posts-api";
import CommentsContainer from "../comments/CommentsContainer";

const AnswersContainer = ({ postId }) => {
  const { data, isFetching, error } = useGetPostAnswersQuery(postId);

  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    data && setAnswers(data);
  }, [data]);

  if (isFetching) {
    return <Loader isFullScreen />;
  }

  if (error) {
    return <ErrorTitle text={error.data.message} />;
  }

  const answerCards = answers.map((a) => (
    <Grid.Container xs={12} key={a.id}>
      <Grid xs={12}>
        <AnswerCard answer={a} />
      </Grid>
      <Grid xs={12} css={{ mt: "20px", px: "30px" }}>
        <CommentsContainer answerId={a.id} />
      </Grid>
    </Grid.Container>
  ));

  return (
    <Grid.Container alignContent="flex-start">{answerCards}</Grid.Container>
  );
};

export default AnswersContainer;
