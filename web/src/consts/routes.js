const routes = {
  main: "/*",
  profile: "/profile/*",
};

const mainRoutes = {
  login: "/login",
  register: "/register",
  forgotPassword: "/forgot-password",
  landing: "/",
  posts: "/posts",
  postWithId: "/posts/:id",
};

const profileRoutes = {};

export { routes, mainRoutes, profileRoutes };
