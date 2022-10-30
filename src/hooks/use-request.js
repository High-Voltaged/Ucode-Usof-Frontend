import { colors } from "~/theme/config";
import useAlert from "~/hooks/use-alert";
import { useCallback } from "react";

const useRequest = (mutation, successMsg) => {
  const { setAlert } = useAlert();

  const request = useCallback(
    async (values, resetForm) => {
      try {
        const response = await mutation(values).unwrap();
        resetForm && resetForm();
        setAlert(successMsg, colors.success);
        return response;
      } catch ({ data }) {
        setAlert(data.message, colors.error);
      }
    },
    [mutation, setAlert, successMsg]
  );

  return { request };
};

export default useRequest;
