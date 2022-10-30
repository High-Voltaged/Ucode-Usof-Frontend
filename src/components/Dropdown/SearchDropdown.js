import { Card, Grid, Text } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import { postNav } from "~/consts/routes";
import { colors } from "~/theme/config";
import ErrorTitle from "../ErrorTitle/ErrorTitle";
import Loader from "../Loader/Loader";

const Wrapper = ({ children }) => (
  <Grid.Container css={{ position: "absolute", top: "100%" }}>
    <Card css={{ p: 10 }}>{children}</Card>
  </Grid.Container>
);

const SearchDropdown = ({
  search,
  posts,
  isFetching,
  error,
  setDropdown,
  resetSearch,
}) => {
  const navigate = useNavigate();

  const clickHandler = (id) => {
    navigate(postNav.post(id));
    setDropdown(false);
    resetSearch();
  };

  if (!search) {
    return <div></div>;
  }

  if (error) {
    return (
      <Wrapper>
        <ErrorTitle size={24} text={error.data.message} />;
      </Wrapper>
    );
  }

  if (isFetching || !posts) {
    return (
      <Wrapper>
        <Loader />
      </Wrapper>
    );
  }

  const postCards = posts
    .filter((p) => p.title.toLowerCase().includes(search.toLowerCase()))
    .slice(0, 5)
    .map((p) => (
      <Grid xs={12} css={{ p: 5 }} key={p.id}>
        <Card
          css={{ p: 10 }}
          variant="bordered"
          isPressable
          isHoverable
          onPress={() => clickHandler(p.id)}
        >
          <Text color={colors.feature} h5>
            {p.title}
          </Text>
        </Card>
      </Grid>
    ));

  if (!postCards.length) {
    return (
      <Wrapper>
        <ErrorTitle size={24} text="No posts found." />
      </Wrapper>
    );
  }

  return <Wrapper>{postCards}</Wrapper>;
};

export default SearchDropdown;
