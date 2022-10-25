import { theme } from "@nextui-org/react";

const errorColor = theme.colors.error.value;

const margin = { mt: "20px" };

const styles = {
  row: { fd: "column", ai: "flex-start" },
  rowSibling: { fd: "column", ai: "flex-start", ...margin },
  select: {
    container: (styles) => ({ ...styles, width: "100%" }),
    control: (styles) => ({
      ...styles,
      borderRadius: "0.875rem",
    }),
    multiValue: (styles) => ({
      ...styles,
      borderRadius: "1000px",
      background: theme.colors.warningLightActive.value,
    }),
  },
  error: { color: errorColor },
};

export default styles;
