import { useLayoutEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "~/components/Loader/Loader";
import Router from "~/router";
import AppNavbar from "~/components/Navbar/Navbar";
import { authenticate } from "~/redux/auth-slice";
import styles from "./App.styles";

const App = () => {
  const { loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    dispatch(authenticate());
  }, [dispatch]);

  return (
    <div style={styles.mainContainer}>
      {loading ? (
        <Loader isFullScreen />
      ) : (
        <>
          <AppNavbar></AppNavbar>
          <Router></Router>
        </>
      )}
    </div>
  );
};

export default App;
