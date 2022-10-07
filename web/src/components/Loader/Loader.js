import Layout from "~/containers/layout/Layout";

const { Loading } = require("@nextui-org/react");

const Loader = ({ isFullScreen = true }) => {
  const loader = (
    <Loading
      loadingCss={{ $$loadingSize: "120px", $$loadingBorder: "8px" }}
      color="warning"
    />
  );

  if (isFullScreen) {
    return <Layout>{loader}</Layout>;
  }
  return loader;
};

export default Loader;
