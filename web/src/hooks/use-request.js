import { useCallback, useContext, useState } from "react";
import { AlertContext } from "~/context/Alert";
import { colors } from "~/theme/config";

const useRequest = (request, successMessage = "", resetForm) => {
  const [loading, setLoading] = useState(false);
  const { setAlert } = useContext(AlertContext);

  const sendRequest = useCallback(
    (data) => {
      setLoading(true);
      request(data)
        .then(() => {
          resetForm();
          setAlert(successMessage, colors.success);
        })
        .catch((err) => {
          setAlert(err.response.data.message, colors.error);
        })
        .finally(() => {
          setLoading(false);
        });
    },
    [successMessage, request, setAlert, resetForm]
  );

  return { sendRequest, loading };
};

export default useRequest;
