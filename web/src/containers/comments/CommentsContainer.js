import { Grid } from "@nextui-org/react";
import { useCallback, useEffect, useState } from "react";
import CommentCard from "~/components/Cards/Comment";
import ErrorTitle from "~/components/ErrorTitle/ErrorTitle";
import Loader from "~/components/Loader/Loader";
import useRequest from "~/hooks/use-request";
import AnswersRequests from "~/requests/answers";

const CommentsContainer = ({ answerId }) => {
  const request = useCallback(
    () => AnswersRequests.getAnswerComments(answerId),
    [answerId]
  );

  const { sendRequest, error, loading, responseData } = useRequest(request);

  const [comments, setComments] = useState([]);

  useEffect(() => {
    sendRequest();
  }, [sendRequest]);

  useEffect(() => {
    if (responseData && !error) {
      setComments(responseData);
    }
  }, [responseData, error]);

  if (loading) {
    return <Loader isFullScreen />;
  }

  if (error) {
    return <ErrorTitle text={error} />;
  }

  const commentCards = comments.map((a) => (
    <CommentCard key={a.id} comment={a} />
  ));

  return (
    <Grid.Container alignContent="flex-start">{commentCards}</Grid.Container>
  );
};

export default CommentsContainer;
