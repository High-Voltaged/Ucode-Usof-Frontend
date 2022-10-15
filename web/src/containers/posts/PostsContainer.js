import { Grid, Pagination } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PostCard from "~/components/Cards/Post";
import ErrorTitle from "~/components/ErrorTitle/ErrorTitle";
import Loader from "~/components/Loader/Loader";
import { postNav } from "~/consts/routes";
import usePagination from "~/hooks/use-pagination";
import useRequest from "~/hooks/use-request";
import PostsRequests from "~/requests/posts";
import { colors } from "~/theme/config";

const PostsContainer = () => {
  const navigate = useNavigate();
  const { sendRequest, error, loading, responseData } = useRequest(
    PostsRequests.getAll
  );

  const [posts, setPosts] = useState([]);
  const { pageData, setPageData, controlHandler } = usePagination(sendRequest);

  useEffect(() => {
    sendRequest();
  }, [sendRequest]);

  useEffect(() => {
    if (responseData && !error) {
      const { currentPage, itemsCount, pagesCount } = responseData;
      setPosts(responseData.posts);
      setPageData({
        current: currentPage,
        pages: pagesCount,
        items: itemsCount,
      });
    }
  }, [responseData, error, setPageData]);

  if (loading) {
    return <Loader isFullScreen />;
  }

  if (error) {
    return <ErrorTitle text={error} />;
  }

  const cardClickHandler = (id) => {
    navigate(postNav.post(id));
  };

  const postCards = posts.map((post) => {
    return (
      <Grid xs={12} sm={6} lg={4} key={post.id}>
        <PostCard post={post} onPress={() => cardClickHandler(post.id)} />
      </Grid>
    );
  });

  return (
    <Grid.Container alignContent="flex-start" css={{ h: "100%" }}>
      <Grid.Container gap={2} alignContent="flex-start" justify="center">
        {!postCards.length ? <ErrorTitle text="No posts" /> : postCards}
      </Grid.Container>
      <Grid.Container alignItems="center" justify="center" gap={6}>
        <Grid>
          <Pagination
            size="lg"
            color={colors.feature}
            shadow
            initialPage={pageData.current}
            total={pageData.pages}
            onChange={controlHandler}
          />
        </Grid>
      </Grid.Container>
    </Grid.Container>
  );
};

export default PostsContainer;
