import { Grid, Pagination } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import PostCard from "~/components/Cards/Post";
import ErrorTitle from "~/components/ErrorTitle/ErrorTitle";
import Loader from "~/components/Loader/Loader";
import { postNav } from "~/consts/routes";
import usePagination from "~/hooks/use-pagination";
import { colors } from "~/theme/config";
import { useGetPostsQuery } from "~/redux/api/posts-api";
import { useEffect, useState } from "react";

const PostsContainer = () => {
  const navigate = useNavigate();

  const { pageData, setPageData, controlHandler } = usePagination();
  const [posts, setPosts] = useState([]);

  const { data, isFetching, error } = useGetPostsQuery(pageData.page);

  useEffect(() => {
    if (data) {
      const { currentPage, posts, pagesCount } = data;
      setPosts(posts);
      setPageData({ page: currentPage, pages: pagesCount });
    }
  }, [data, setPageData]);

  if (isFetching) {
    return <Loader isFullScreen />;
  }

  if (error) {
    return <ErrorTitle text={error.data.message} />;
  }

  const cardClickHandler = (id) => {
    navigate(postNav.post(id));
  };

  const postCards = posts.map((post) => {
    return (
      <Grid xs={12} sm={6} lg={4} key={post.id}>
        <PostCard
          post={post}
          isPressable
          isHoverable
          onPress={() => cardClickHandler(post.id)}
        />
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
            initialPage={data.currentPage || pageData.current}
            total={data.pagesCount || pageData.pages}
            onChange={controlHandler}
          />
        </Grid>
      </Grid.Container>
    </Grid.Container>
  );
};

export default PostsContainer;
