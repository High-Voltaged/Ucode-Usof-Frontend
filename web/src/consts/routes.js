const routes = {
  main: "/*",
  profile: "/profile/*",
};

const mainRoutes = {
  login: "/login",
  register: "/register",
  forgotPassword: "/forgot-password",
  resetPassword: "/reset-password",
  confirmEmail: "/confirm-email",
  landing: "/",
  posts: "/posts",
  postWithId: "/posts/:id",
};

const errorRoutes = {
  noAuth: "/not-authenticated",
};

const profileRoutes = {
  profile: "/profile",
};

export { routes, mainRoutes, profileRoutes, errorRoutes };
