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
  categories: "/categories",
};

const profileRoutes = {
  profile: "/profile",
};

export { routes, mainRoutes, profileRoutes };
