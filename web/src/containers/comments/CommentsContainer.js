import { Grid, Spacer } from "@nextui-org/react";
import { useEffect, useState } from "react";
import CommentCard from "~/components/Cards/Comment";
import ErrorTitle from "~/components/ErrorTitle/ErrorTitle";
import Loader from "~/components/Loader/Loader";
import { useGetCommentsQuery } from "~/redux/api/answers-api";

const CommentsContainer = ({ answerId }) => {
  const { data, isFetching, error } = useGetCommentsQuery(answerId);

  const [comments, setComments] = useState([]);

  useEffect(() => {
    data && setComments(data);
  }, [data]);

  if (isFetching) {
    return <Loader isFullScreen />;
  }

  if (error) {
    return <ErrorTitle text={error.data.message} />;
  }

  const commentCards = comments.map((a) => (
    <>
      <Grid xs={12} key={a.id}>
        <CommentCard comment={a} />
      </Grid>
      <Spacer />
    </>
  ));

  return (
    <Grid.Container alignContent="flex-start">{commentCards}</Grid.Container>
  );
};

export default CommentsContainer;
