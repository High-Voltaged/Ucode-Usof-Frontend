import { useCallback, useContext, useState } from "react";
import { useDispatch } from "react-redux";
import { AlertContext } from "~/context/Alert";
import { colors } from "~/theme/config";

const useDispatchRequest = (request, successMessage = "", resetForm = null) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const { setAlert } = useContext(AlertContext);

  const sendRequest = useCallback(
    (data) => {
      setLoading(true);
      return dispatch(request(data))
        .unwrap()
        .then(() => {
          resetForm && resetForm();
          successMessage && setAlert(successMessage, colors.success);
          return true;
        })
        .catch((err) => {
          setAlert(err, colors.error);
          return false;
        })
        .finally(() => {
          setLoading(false);
        });
    },
    [dispatch, request, setAlert, successMessage, resetForm]
  );

  return { sendRequest, loading };
};

export default useDispatchRequest;
