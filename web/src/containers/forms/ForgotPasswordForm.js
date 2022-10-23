import { Row } from "@nextui-org/react";
import { useFormik } from "formik";
import { FaAt } from "react-icons/fa";

import InputField from "~/components/InputField/InputField";
import { forgotPassSchema } from "~/validation/auth";
import { forgotPasswordValues } from "~/containers/forms/const";
import BaseButton from "~/components/Button/Button";
import { SUCCESS } from "~/consts/messages";
import { useForgotPasswordMutation } from "~/redux/api/auth-api";
import useRequest from "~/hooks/use-request";

const ForgotPasswordForm = () => {
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();
  const { request } = useRequest(forgotPassword, SUCCESS.FORGOT_PASS);

  const {
    values,
    errors,
    touched,
    handleSubmit,
    handleBlur,
    setFieldValue,
    resetForm,
  } = useFormik({
    initialValues: forgotPasswordValues,
    validationSchema: forgotPassSchema,
    onSubmit: async (values) => {
      await request(values, resetForm);
    },
  });

  return (
    <form onSubmit={handleSubmit}>
      <InputField
        name="email"
        label="Your email"
        placeholder="test@gmail.com"
        contentLeft={<FaAt />}
        value={values.email}
        error={Boolean(touched.email && errors.email)}
        onBlur={handleBlur}
        setFieldValue={setFieldValue}
        helperText={touched.email && errors.email}
      />
      <Row justify="center">
        <BaseButton block loading={isLoading} text="Submit" />
      </Row>
    </form>
  );
};

export default ForgotPasswordForm;
