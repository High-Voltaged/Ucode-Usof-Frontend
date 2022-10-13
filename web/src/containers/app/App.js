import { useSelector } from "react-redux";
import Loader from "~/components/Loader/Loader";
import Router from "~/router";
import AppNavbar from "~/components/Navbar/Navbar";
import styles from "./App.styles";

const App = () => {
  const { loading } = useSelector((state) => state.auth);

  return (
    <div style={styles.mainContainer}>
      <AppNavbar></AppNavbar>
      {loading ? <Loader isFullScreen /> : <Router />}
    </div>
  );
};

export default App;
