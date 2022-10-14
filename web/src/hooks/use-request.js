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
  const [error, setError] = useState("");
  const [responseData, setResponseData] = useState(null);
  const { setAlert } = useContext(AlertContext);

  const reqHandler = useCallback(
    (data) => (isDispatched ? dispatch(request(data)).unwrap() : request(data)),
    [isDispatched, dispatch, request]
  );

  const sendRequest = useCallback(
    (data) => {
      setLoading(true);
      return reqHandler(data)
        .then((response) => {
          resetForm && resetForm();
          successMessage && setAlert(successMessage, colors.success);
          response && setResponseData(response.data);
        })
        .catch((err) => {
          const errMsg =
            err.response && err.response.data.message
              ? err.response.data.message
              : err;
          setAlert(errMsg, colors.error);
          setError(errMsg);
          return errMsg;
        })
        .finally(() => {
          setLoading(false);
        });
    },
    [reqHandler, setAlert, successMessage, resetForm]
  );

  return { sendRequest, loading, error, responseData };
};

export default useRequest;
