import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";

TimeAgo.addLocale(en);

const useDate = (dateStr) => {
  const initialDate = new Date(dateStr);

  const timeAgo = new TimeAgo("en-US");
  const date = timeAgo.format(initialDate);

  return { date };
};

export default useDate;
