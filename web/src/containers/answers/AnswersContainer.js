import { Grid } from "@nextui-org/react";
import { useCallback, useEffect, useState } from "react";
import AnswerCard from "~/components/Cards/Answer";
import ErrorTitle from "~/components/ErrorTitle/ErrorTitle";
import Loader from "~/components/Loader/Loader";
import useRequest from "~/hooks/use-request";
import AnswersRequests from "~/requests/answers";

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
    <Grid xs={12} sm={6} lg={4} key={a.id}>
      <AnswerCard answer={a} />
    </Grid>
  ));

  return (
    <Grid.Container alignContent="flex-start" css={{ h: "100%" }}>
      {answerCards}
    </Grid.Container>
  );
};

export default AnswersContainer;
