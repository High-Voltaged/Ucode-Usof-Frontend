const base = {
  card: { padding: 16 },
  container: {
    display: "flex",
    padding: 0,
  },
  footerItem: { marginLeft: 6 },
  footerGrid: {
    px: 0,
    flexWrap: "wrap",
    fd: "column",
    ai: "flex-start",
    "@xs": { fd: "row", ai: "center" },
  },
  avatar: { "@xsMax": "xs", "@xs": "sm" },
};

const post = {
  ...base,
  card: { p: 16 },
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
    ml: 16,
    height: "100%",
    d: "flex",
    fd: "column",
  },
};

const answer = {
  ...post,
};

const comment = {
  ...post,
  card: { px: 20, py: 14 },
};

export { post, answer, comment };
