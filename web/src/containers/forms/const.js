const loginValues = {
  login: "",
  email: "",
  password: "",
};

const registerValues = {
  login: "",
  email: "",
  password: "",
  passwordConfirm: "",
  fullName: "",
};

const forgotPasswordValues = {
  email: "",
};

const resetPasswordValues = {
  password: "",
};

const getProfileValues = (user) => ({
  login: (user || {}).login || "",
  email: (user || {}).email || "",
  fullName: (user || {}).fullName || "",
});

export {
  registerValues,
  loginValues,
  forgotPasswordValues,
  resetPasswordValues,
  getProfileValues,
};
