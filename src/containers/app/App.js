import { useSelector } from "react-redux";
import Loader from "~/components/Loader/Loader";
import Router from "~/router";
import AppNavbar from "~/components/Navbar/Navbar";
import styles from "./App.styles";
import { useRefreshMutation } from "~/redux/api/auth-api";
import { useEffect } from "react";

const App = () => {
  const { user } = useSelector((state) => state.auth);
  const [refresh, { isLoading, error }] = useRefreshMutation();

  useEffect(() => {
    if (!user.id) {
      refresh();
    }
  }, [refresh, user.id]);

  if (isLoading || (!user.id && !error)) {
    return (
      <div style={styles.mainContainer}>
        <Loader />
      </div>
    );
  }

  return (
    <div style={styles.mainContainer}>
      <AppNavbar></AppNavbar>
      <Router />
    </div>
  );
};

export default App;
