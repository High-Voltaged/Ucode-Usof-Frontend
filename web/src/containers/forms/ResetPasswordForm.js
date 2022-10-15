import { Row } from "@nextui-org/react";
import { useFormik } from "formik";
import { FaLock } from "react-icons/fa";

import InputField from "~/components/InputField/InputField";
import { resetPassSchema } from "~/validation/auth";
import { resetPasswordValues } from "~/containers/forms/const";
import BaseButton from "~/components/Button/Button";
import { SUCCESS_MSGS } from "~/consts/messages";
import AuthRequests from "~/requests/auth";
import useRequest from "~/hooks/use-request";
import { useSearchParams } from "react-router-dom";

const ResetPasswordForm = () => {
  const {
    values,
    errors,
    touched,
    handleSubmit,
    handleBlur,
    setFieldValue,
    resetForm,
  } = useFormik({
    initialValues: resetPasswordValues,
    validationSchema: resetPassSchema,
    onSubmit: (values) => sendRequest({ ...values, resetToken }),
  });

  const [searchParams] = useSearchParams();
  const resetToken = searchParams.get("resetToken");

  const request = (values) => AuthRequests.resetPassword(values);
  const { sendRequest, loading } = useRequest(
    request,
    true,
    SUCCESS_MSGS.RESET_PASS_SUCCESS,
    resetForm
  );

  return (
    <form onSubmit={handleSubmit}>
      <InputField
        name="password"
        label="Your new password"
        placeholder="your_password"
        contentLeft={<FaLock />}
        isPassword
        value={values.password}
        error={Boolean(touched.password && errors.password)}
        onBlur={handleBlur}
        setFieldValue={setFieldValue}
        helperText={touched.password && errors.password}
      ></InputField>
      <Row justify="center">
        <BaseButton block loading={loading} text="Confirm" />
      </Row>
    </form>
  );
};

export default ResetPasswordForm;
