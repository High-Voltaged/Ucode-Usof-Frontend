import * as DOMPurify from "dompurify";

const useDomPurify = (content) => {
  const sanitized = DOMPurify.sanitize(content, {
    USE_PROFILES: { html: true },
  });

  return { sanitized };
};

export default useDomPurify;
