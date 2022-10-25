import { sanitize } from "dompurify";

const useDomPurify = (content) => {
  const sanitized = sanitize(content, {
    USE_PROFILES: { html: true },
  });

  return { sanitized };
};

export default useDomPurify;
