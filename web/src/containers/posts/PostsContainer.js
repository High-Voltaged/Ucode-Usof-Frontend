import { Grid, Pagination } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PostCard from "~/components/Cards/Post";
import ErrorTitle from "~/components/ErrorTitle/ErrorTitle";
import Loader from "~/components/Loader/Loader";
import { postNav } from "~/consts/routes";
import usePagination from "~/hooks/use-pagination";
import { colors } from "~/theme/config";
import { useGetPostsQuery } from "~/redux/api/posts-api";
import PostMenu from "~/containers/post-menu/PostMenu";

const PostsContainer = () => {
  const navigate = useNavigate();

  const [sort, setSort] = useState("date");
  const [filter, setFilter] = useState({});
  const { pageData, setPageData, controlHandler } = usePagination();

  const [posts, setPosts] = useState(null);

  const { data, isFetching, error } = useGetPostsQuery({
    page: pageData.page,
    sort,
    filter,
  });

  useEffect(() => {
    if (data) {
      const { currentPage, posts, pagesCount } = data;
      setPosts(posts);
      setPageData({ page: currentPage, pages: pagesCount });
    }
  }, [data, setPageData]);

  if (error) {
    return <ErrorTitle text={error.data.message} />;
  }

  const cardClickHandler = (id) => {
    navigate(postNav.post(id));
  };

  const postCards = (posts || []).map((post) => {
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

  const postsContent =
    isFetching || !posts ? (
      <Loader isFullScreen />
    ) : !postCards.length ? (
      <ErrorTitle text="No posts were found" />
    ) : (
      <Grid.Container
        gap={2}
        alignContent="flex-start"
        justify="center"
        css={{ mt: "15px" }}
      >
        {postCards}
      </Grid.Container>
    );

  return (
    <Grid.Container
      alignContent="flex-start"
      justify="center"
      css={{ h: "100%" }}
    >
      <PostMenu setSort={setSort} setFilter={setFilter} />
      {postsContent}
      {posts && posts.length > 0 && (
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
      )}
    </Grid.Container>
  );
};

export default PostsContainer;
