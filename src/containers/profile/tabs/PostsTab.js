import { Grid, Pagination, Text } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PostCard from "~/components/Cards/Post";
import ErrorTitle from "~/components/ErrorTitle/ErrorTitle";
import Loader from "~/components/Loader/Loader";
import { postNav } from "~/consts/routes";
import usePagination from "~/hooks/use-pagination";
import { useGetMyPostsQuery } from "~/redux/api/auth-api";
import { colors } from "~/theme/config";

const PostsTab = () => {
  const navigate = useNavigate();

  const { pageData, setPageData, controlHandler } = usePagination();

  const [posts, setPosts] = useState(null);

  const { data, isFetching, error } = useGetMyPostsQuery({
    page: pageData.page,
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
      <Grid xs={12} sm={6} key={post.id} css={{ d: "flex", ai: "center" }}>
        <PostCard
          post={post}
          isPressable
          isHoverable
          variant="bordered"
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
      <Grid.Container gap={2} alignContent="flex-start" justify="center">
        <Grid xs={12} justify="center">
          <Text
            size={34}
            weight="semibold"
            css={{ textGradient: "45deg, $yellow600, $purple600" }}
          >
            Your recent posts
          </Text>
        </Grid>
        {postCards}
      </Grid.Container>
    );

  return (
    <Grid.Container alignContent="flex-start" justify="center">
      {postsContent}
      {posts && posts.length > 0 && (
        <Grid.Container alignItems="center" justify="center" gap={2}>
          <Grid>
            <Pagination
              size="lg"
              color={colors.feature}
              shadow
              initialPage={pageData.page}
              total={pageData.pages}
              onChange={controlHandler}
            />
          </Grid>
        </Grid.Container>
      )}
    </Grid.Container>
  );
};

export default PostsTab;
