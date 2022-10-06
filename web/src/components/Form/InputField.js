import { Row, Input } from "@nextui-org/react";

const InputField = ({
  error,
  isPassword = false,
  isLast = false,
  ...props
}) => {
  const otherProps = {
    width: "300px",
    size: "lg",
  };

  return (
    <Row align="center" justify="center" css={!isLast ? { mb: "14px" } : ""}>
      {!isPassword ? (
        <Input
          width={otherProps.width}
          size={otherProps.size}
          status={error ? "error" : "default"}
          {...props}
        ></Input>
      ) : (
        <Input.Password
          width={otherProps.width}
          size={otherProps.size}
          status={error ? "error" : "default"}
          {...props}
        ></Input.Password>
      )}
    </Row>
  );
};

export default InputField;
