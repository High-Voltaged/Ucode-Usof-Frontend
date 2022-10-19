const base = {
  card: { padding: "16px" },
  container: {
    display: "flex",
    padding: 0,
  },
  footer: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  footerItem: { marginLeft: "6px" },
};

const post = {
  ...base,
  card: { p: "16px" },
  container: {
    ...base.container,
    alignItems: "flex-start",
  },
  likes: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  likesCount: {
    lh: "$lg",
    fontWeight: "$semibold",
  },
  footer: {
    ...base.footer,
    justifyContent: "flex-end",
  },
  badges: {
    fd: "column",
  },
  colRight: { ml: "16px" },
  colBottom: { mt: "10px" },
};

const answer = {
  ...post,
};

const comment = {
  ...base,
  container: {
    ...base.container,
    justifyContent: "space-between",
    alignItems: "center",
  },
  footer: {
    ...base.footer,
    marginLeft: "16px",
  },
};

export { post, answer, comment };
