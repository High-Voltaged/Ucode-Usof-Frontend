import { Button, Grid } from "@nextui-org/react";
import { useFormik } from "formik";
import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import InputField from "~/components/InputField/InputField";
import { useLazyGetPostsQuery } from "~/redux/api/posts-api";
import { colors } from "~/theme/config";
import SearchDropdown from "../Dropdown/SearchDropdown";

const SearchInput = () => {
  const [dropdown, setDropdown] = useState(false);
  const [getPosts, { data, isFetching, error }] = useLazyGetPostsQuery();

  const { values, handleSubmit, handleBlur, setFieldValue } = useFormik({
    initialValues: { search: "" },
    onSubmit: async () => {
      await getPosts();
      setDropdown(true);
    },
  });

  return (
    <Grid.Container css={{ position: "relative", ai: "center" }} gap={1}>
      <Grid xs={7} sm={8}>
        <InputField
          name="search"
          placeholder="Search..."
          aria-label="search"
          isLast
          clearable
          css={{ mw: 200 }}
          setFieldValue={setFieldValue}
          onBlur={handleBlur}
          value={values.search}
        ></InputField>
      </Grid>
      <Grid xs={3} sm={2} css={{ flexShrink: 0 }}>
        <Button
          icon={<FaSearch size={12} />}
          onPress={handleSubmit}
          auto
          color={colors.feature}
          size="sm"
        />
      </Grid>
      {dropdown && (
        <SearchDropdown
          search={values.search}
          error={error}
          isFetching={isFetching}
          posts={data.posts}
          setDropdown={setDropdown}
          resetSearch={() => setFieldValue("search", "")}
        />
      )}
    </Grid.Container>
  );
};

export default SearchInput;
