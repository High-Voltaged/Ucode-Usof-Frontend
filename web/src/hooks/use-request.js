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
          response && setResponseData(response);
        })
        .catch((err) => {
          setAlert(err, colors.error);
          return err;
        })
        .finally(() => {
          setLoading(false);
        });
    },
    [reqHandler, setAlert, successMessage, resetForm]
  );

  return { sendRequest, loading, responseData };
};

export default useRequest;
