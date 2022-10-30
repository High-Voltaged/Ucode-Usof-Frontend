import { useSelector } from "react-redux";
import { colors } from "~/theme/config";
import useAlert from "./use-alert";

const useAuthCheck = () => {
  const { user } = useSelector((state) => state.auth);
  const { setAlert } = useAlert();

  const authCheck = (callback) => {
    if (!user.id) {
      setAlert("You must be logged in to do this.", colors.error);
    } else {
      callback();
    }
  };

  return { authCheck };
};

export default useAuthCheck;
