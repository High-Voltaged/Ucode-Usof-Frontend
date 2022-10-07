const getLocalStorageItem = (key) => {
  return localStorage.getItem(key);
};

const removeFromLocalStorage = (key) => {
  localStorage.removeItem(key);
};

const updateLocalStorage = (key, value) => {
  localStorage.setItem(key, value);
};

export { getLocalStorageItem, removeFromLocalStorage, updateLocalStorage };
