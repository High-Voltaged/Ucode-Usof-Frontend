import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const useAuthorCheck = (useQuery, id) => {
  const { data, isLoading, error } = useQuery(id);
  const { user } = useSelector((state) => state.auth);
  const [isAuthor, setIsAuthor] = useState(null);

  useEffect(() => {
    if (data) {
      setIsAuthor(data.author === user.id);
    }
  }, [data, setIsAuthor, user.id]);

  return { isLoading, error, isAuthor };
};

export default useAuthorCheck;
