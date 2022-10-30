const SERVER_URL = process.env.REACT_APP_API_URL;
const AVATAR_PATH = (avatar) =>
  avatar ? `${SERVER_URL}/${avatar}` : `/images/default-avatar.png`;

export { SERVER_URL, AVATAR_PATH };
