import { useCallback, useContext, useState } from "react";
import { AlertContext } from "~/context/Alert";
import { colors } from "~/theme/config";

const useRequest = (request, successMessage = "", resetForm = null) => {
  const [loading, setLoading] = useState(false);
  const { setAlert } = useContext(AlertContext);

  const sendRequest = useCallback(
    (data = null) => {
      setLoading(true);
      request(data)
        .then(() => {
          resetForm && resetForm();
          successMessage && setAlert(successMessage, colors.success);
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
