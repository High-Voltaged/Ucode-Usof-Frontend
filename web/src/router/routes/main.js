import { Routes, Route } from "react-router-dom";
import { mainRoutes } from "~/consts/routes";
import {
  ResetPasswordPage,
  ForgotPasswordPage,
  LandingPage,
  LoginPage,
  RegisterPage,
} from "~/pages";

const MainRoutes = () => {
  return (
    <Routes>
      <Route path={mainRoutes.landing} element={<LandingPage />}></Route>
      <Route path={mainRoutes.login} element={<LoginPage />}></Route>
      <Route path={mainRoutes.register} element={<RegisterPage />}></Route>
      <Route
        path={mainRoutes.resetPassword}
        element={<ResetPasswordPage />}
      ></Route>
      <Route
        path={mainRoutes.forgotPassword}
        element={<ForgotPasswordPage />}
      ></Route>
    </Routes>
  );
};

export default MainRoutes;
