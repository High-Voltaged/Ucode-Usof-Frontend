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
  categories: "/categories",
};

const profileRoutes = {
  profile: "/profile",
};

const postRoutes = {
  postWithId: "/:id",
  create: "/create",
  edit: "/edit/:id",
};

const postNav = {
  posts: "/",
  post: (id) => `/posts/${id}`,
  create: "/posts/create",
  edit: (id) => `/posts/edit/${id}`,
};

export { routes, mainRoutes, profileRoutes, postRoutes, postNav };
