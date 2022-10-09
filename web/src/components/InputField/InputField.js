import { Row, Input, useInput } from "@nextui-org/react";
import { colors } from "~/theme/config";
import styles from "./InputField.styles";

const InputField = ({
  error,
  name,
  setFieldValue,
  isPassword = false,
  isLast = false,
  ...props
}) => {
  const otherProps = {
    width: "300px",
    size: "lg",
  };

  const {
    bindings: { onChange, value },
    currentRef,
  } = useInput("");

  const handleChange = (e) => {
    onChange(e);
    setFieldValue(name, currentRef.current);
  };

  return (
    <Row align="center" justify="center" css={!isLast ? styles.input : ""}>
      {!isPassword ? (
        <Input
          {...props}
          width={otherProps.width}
          size={otherProps.size}
          status={error ? colors.error : "default"}
          helperColor={colors.error}
          value={value}
          onChange={handleChange}
        ></Input>
      ) : (
        <Input.Password
          {...props}
          width={otherProps.width}
          size={otherProps.size}
          status={error ? colors.error : "default"}
          helperColor={colors.error}
          value={value}
          onChange={handleChange}
        ></Input.Password>
      )}
    </Row>
  );
};

export default InputField;
