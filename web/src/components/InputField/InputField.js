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
    width: "100%",
    size: "lg",
  };

  const {
    bindings: { onChange },
    currentRef,
  } = useInput("");

  const handleChange = (e) => {
    onChange(e);
    setFieldValue(name, currentRef.current);
  };

  const CustomInput = isPassword ? Input.Password : Input;

  return (
    <Row align="center" justify="center" css={!isLast ? styles.input : ""}>
      <CustomInput
        {...props}
        width={otherProps.width}
        size={otherProps.size}
        status={error ? colors.error : "default"}
        helperColor={colors.error}
        onChange={handleChange}
      />
    </Row>
  );
};

export default InputField;
