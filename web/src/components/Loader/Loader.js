import { Loading } from "@nextui-org/react";
import Layout from "~/containers/layout/Layout";
import { colors } from "~/theme/config";

const Loader = ({ isFullScreen = true }) => {
  const loader = (
    <Loading
      loadingCss={{ $$loadingSize: "120px", $$loadingBorder: "8px" }}
      color={colors.feature}
    />
  );

  if (isFullScreen) {
    return <Layout>{loader}</Layout>;
  }
  return loader;
};

export default Loader;
