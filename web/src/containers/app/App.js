import AppNavbar from "~/components/Navbar/Navbar";
import Router from "~/router";
import styles from "./App.styles";

const App = () => {
  return (
    <div style={styles.mainContainer}>
      <AppNavbar></AppNavbar>
      <Router></Router>
    </div>
  );
};

export default App;
