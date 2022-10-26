import { Text } from "@nextui-org/react";

const ErrorTitle = ({ text, size }) => {
  return (
    <Text
      h1
      size={size || 80}
      css={{
        textGradient: "45deg, $yellow600 40%, $red600 80%",
        textAlign: "center",
        userSelect: "none",
      }}
      weight="bold"
    >
      {text}
    </Text>
  );
};

export default ErrorTitle;
