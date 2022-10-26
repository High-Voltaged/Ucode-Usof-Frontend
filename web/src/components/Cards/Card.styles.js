const base = {
  card: { padding: "16px" },
  container: {
    display: "flex",
    padding: 0,
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
  colRight: {
    ml: "16px",
    height: "100%",
    d: "flex",
    fd: "column",
  },
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
