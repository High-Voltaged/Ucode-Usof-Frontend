import { theme } from "@nextui-org/react";

const errorColor = theme.colors.error.value;

const overflow = { overflow: "visible" };
const margin = { mt: "20px" };

const styles = {
  card: { p: "10px", ...overflow },
  overflow,
  row: { fd: "column", ai: "flex-start" },
  rowSibling: { fd: "column", ai: "flex-start", ...margin },
  margin,
  error: { color: errorColor },
  btnGroup: {
    d: "flex",
    gap: 10,
    flexFlow: "row wrap",
    jc: "center",
    "@xs": { jc: "flex-start" },
  },
};

export default styles;
