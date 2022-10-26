export const getInitValues = (comment) => ({
  content: (comment || {}).content || "",
});
