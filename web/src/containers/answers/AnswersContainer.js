import { Grid } from "@nextui-org/react";
import { useCallback, useEffect, useState } from "react";
import AnswerCard from "~/components/Cards/Answer";
import ErrorTitle from "~/components/ErrorTitle/ErrorTitle";
import Loader from "~/components/Loader/Loader";
import useRequest from "~/hooks/use-request";
import AnswersRequests from "~/requests/answers";
import CommentsContainer from "../comments/CommentsContainer";

const AnswersContainer = ({ postId }) => {
  const request = useCallback(() => AnswersRequests.getAll(postId), [postId]);
  const { sendRequest, error, loading, responseData } = useRequest(request);

  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    sendRequest();
  }, [sendRequest]);

  useEffect(() => {
    if (responseData && !error) {
      setAnswers(responseData);
    }
  }, [responseData, error]);

  if (loading) {
    return <Loader isFullScreen />;
  }

  if (error) {
    return <ErrorTitle text={error} />;
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
