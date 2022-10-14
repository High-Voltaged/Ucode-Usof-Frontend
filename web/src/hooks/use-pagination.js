const { useState } = require("react");

const usePagination = (sendRequest) => {
  const [pageData, setPageData] = useState({ current: 1, pages: 0, items: 0 });

  const controlHandler = (page) => {
    sendRequest({ page });
  };

  return { pageData, setPageData, controlHandler };
};

export default usePagination;
