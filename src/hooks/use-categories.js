import { useEffect, useState } from "react";
import { useGetCategoriesQuery } from "~/redux/api/posts-api";

const useCategories = () => {
  const { data, isFetching: isCategoryFetching } = useGetCategoriesQuery();

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    if (data) {
      const categoryData = data.map((c) => ({
        value: c.id,
        label: c.title,
      }));
      setCategories(categoryData);
    }
  }, [data]);

  const filterCategories = async (value) => {
    return categories.filter((c) =>
      c.label.toLowerCase().includes(value.toLowerCase())
    );
  };

  return { isCategoryFetching, filterCategories };
};

export default useCategories;
