import { Grid } from "@nextui-org/react";
import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PostCard from "~/components/Cards/Post";
import ErrorTitle from "~/components/ErrorTitle/ErrorTitle";
import Loader from "~/components/Loader/Loader";
import useRequest from "~/hooks/use-request";
import PostsRequests from "~/requests/posts";
import AnswersContainer from "../answers/AnswersContainer";

const PostsContainer = () => {
  const { id } = useParams();

  const request = useCallback(() => PostsRequests.getPost(id), [id]);
  const { sendRequest, error, loading, responseData } = useRequest(request);

  const [post, setPost] = useState({});

  useEffect(() => {
    sendRequest(id);
  }, [sendRequest, id]);

  useEffect(() => {
    if (responseData && !error) {
      setPost(responseData);
    }
  }, [responseData, error]);

  if (loading) {
    return <Loader isFullScreen />;
  }

  if (error) {
    return <ErrorTitle text={error} />;
  }

  return (
    <Grid.Container
      alignContent="flex-start"
      justify="center"
      xs={12}
      md={8}
      xl={6}
      css={{ h: "100%" }}
    >
      <Grid xs={12} sm={10}>
        <PostCard post={post} />
      </Grid>
      <Grid xs={12} sm={10} css={{ mt: "120px" }}>
        <AnswersContainer postId={id} />
      </Grid>
    </Grid.Container>
  );
};

export default PostsContainer;
