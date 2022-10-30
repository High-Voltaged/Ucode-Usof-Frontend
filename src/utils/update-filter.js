const updateFilter = (values, entity) => {
  const body = {};
  Object.entries(values).forEach(([key, value]) => {
    if (entity[key] !== value) {
      body[key] = value;
    }
  });

  if (!Object.keys(body).length) {
    return null;
  }
  return body;
};

export default updateFilter;
