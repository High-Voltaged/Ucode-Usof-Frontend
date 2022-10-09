import { useCallback, useContext, useState } from "react";
import { useDispatch } from "react-redux";
import { AlertContext } from "~/context/Alert";
import { colors } from "~/theme/config";

const useDispatchRequest = (request, successMessage = "", resetForm) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const { setAlert } = useContext(AlertContext);

  const sendRequest = useCallback(
    (data) => {
      setLoading(true);
      dispatch(request(data))
        .unwrap()
        .then(() => {
          successMessage && setAlert(successMessage, colors.success);
          resetForm();
        })
        .catch((err) => {
          setAlert(err, colors.error);
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
