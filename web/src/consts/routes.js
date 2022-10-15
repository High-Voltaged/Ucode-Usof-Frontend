const routes = {
  main: "/*",
  profile: "/profile/*",
  posts: "/posts/*",
};

const mainRoutes = {
  login: "/login",
  register: "/register",
  forgotPassword: "/forgot-password",
  resetPassword: "/reset-password",
  confirmEmail: "/confirm-email",
  landing: "/",
  categories: "/categories",
};

const profileRoutes = {
  profile: "/profile",
};

const postRoutes = {
  postWithId: "/:id",
};

const postNav = {
  posts: "/posts",
  post: (id) => `/posts/${id}`,
};

export { routes, mainRoutes, profileRoutes, postRoutes, postNav };
