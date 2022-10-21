import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { LIKES_ENUM } from "~/consts/validation";

const useAuthorLike = (id, useQuery) => {
  const { user } = useSelector((state) => state.auth);
  const [authorLike, setAuthorLike] = useState("");
  const { data: likesData } = useQuery(id);

  useEffect(() => {
    if (likesData) {
      const like = likesData.find(
        (l) => l.author === user.id && l.type === LIKES_ENUM[0]
      );
      if (like) {
        setAuthorLike(LIKES_ENUM[0]);
      } else {
        const dislike = likesData.find(
          (l) => l.author === user.id && l.type === LIKES_ENUM[1]
        );
        if (dislike) setAuthorLike(LIKES_ENUM[1]);
        else setAuthorLike("");
      }
    }
  }, [likesData, user.id]);

  return { authorLike, author: user.id };
};

export default useAuthorLike;
