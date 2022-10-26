import { Grid } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PostCard from "~/components/Cards/Post";
import ErrorTitle from "~/components/ErrorTitle/ErrorTitle";
import Loader from "~/components/Loader/Loader";
import { useGetPostQuery } from "~/redux/api/posts-api";
import AnswersContainer from "../answers/AnswersContainer";
import CreateAnswer from "../answers/CreateAnswer";
import styles from "./PostContainer.styles";

const PostContainer = () => {
  const { id } = useParams();

  const { data, isFetching, error } = useGetPostQuery(Number(id));
  const [post, setPost] = useState({});

  useEffect(() => {
    data && setPost(data);
  }, [data]);

  if (error) {
    return <ErrorTitle text={error.data.message} />;
  }

  if (isFetching || !post.id) {
    return <Loader isFullScreen />;
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
      <Grid xs={12} sm={10} css={{ mt: "120px", ...styles.container }}>
        <CreateAnswer postId={Number(id)} />
        <AnswersContainer postId={Number(id)} />
      </Grid>
    </Grid.Container>
  );
};

export default PostContainer;
