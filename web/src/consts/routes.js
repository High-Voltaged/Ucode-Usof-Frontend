const routes = {
  main: "/*",
  profile: "/profile/*",
};

const mainRoutes = {
  login: "/login",
  register: "/register",
  forgotPassword: "/forgot-password",
  resetPassword: "/reset-password",
  landing: "/",
  posts: "/posts",
  postWithId: "/posts/:id",
};

const errorRoutes = {
  noAuth: "/not-authenticated",
};

const profileRoutes = {};

export { routes, mainRoutes, profileRoutes, errorRoutes };
