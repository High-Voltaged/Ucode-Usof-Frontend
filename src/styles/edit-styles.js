import { theme } from "@nextui-org/react";

const errorColor = theme.colors.error.value;

const margin = { mt: 20 };
const overflow = { overflow: "visible" };

const container = {
  container: { h: "100%" },
  card: { p: 30, ...overflow },
  overflow,
  margin,
};

const form = {
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
      borderRadius: 1000,
      background: theme.colors.warningLightActive.value,
    }),
  },
  error: { color: errorColor },
};

export { container, form };
