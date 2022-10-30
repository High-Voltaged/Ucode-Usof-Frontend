export const getInitValues = (post, categories) => ({
  title: (post || {}).title || "",
  content: (post || {}).content || "",
  categories: (categories || []).map((c) => ({
    value: c.id,
    label: c.title,
  })),
});
