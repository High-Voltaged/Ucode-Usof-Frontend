import { useState } from "react";

const usePagination = () => {
  const [pageData, setPageData] = useState({ page: 1, pages: 0 });

  const controlHandler = (page) => setPageData((data) => ({ ...data, page }));

  return { pageData, setPageData, controlHandler };
};

export default usePagination;
