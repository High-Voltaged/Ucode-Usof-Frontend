import { useCallback, useContext, useState } from "react";
import { useDispatch } from "react-redux";
import { AlertContext } from "~/context/Alert";
import { colors } from "~/theme/config";

const useRequest = (
  request,
  successMessage = "",
  resetForm = null,
  isDispatched = false
) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const { setAlert } = useContext(AlertContext);

  const reqHandler = useCallback(
    (data) => (isDispatched ? dispatch(request(data)).unwrap() : request(data)),
    [isDispatched, dispatch, request]
  );

  const sendRequest = useCallback(
    (data) => {
      setLoading(true);
      return reqHandler(data)
        .then(() => {
          resetForm && resetForm();
          successMessage && setAlert(successMessage, colors.success);
          return true;
        })
        .catch((err) => {
          setAlert(err.response.data.message, colors.error);
          return false;
        })
        .finally(() => {
          setLoading(false);
        });
    },
    [reqHandler, setAlert, successMessage, resetForm]
  );

  return { sendRequest, loading };
};

export default useRequest;
