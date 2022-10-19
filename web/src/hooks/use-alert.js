const { useContext, useCallback } = require("react");
const { AlertContext } = require("~/context/Alert");

const useAlert = () => {
  const { setAlert: alert } = useContext(AlertContext);

  const setAlert = useCallback((text, color) => alert(text, color), [alert]);

  return { setAlert };
};

export default useAlert;
