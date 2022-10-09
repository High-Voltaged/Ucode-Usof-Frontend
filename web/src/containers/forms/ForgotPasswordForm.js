import { Row } from "@nextui-org/react";
import { useFormik } from "formik";
import { FaAt } from "react-icons/fa";

import InputField from "~/components/InputField/InputField";
import { forgotPassSchema } from "~/validation/auth";
import { forgotPasswordValues } from "~/containers/forms/const";
import BaseButton from "~/components/Button/Button";
import { SUCCESS_MSGS } from "~/consts/messages";
import AuthRequests from "~/requests/auth";
import useRequest from "~/hooks/use-request";

const ForgotPasswordForm = () => {
  const request = (values) => AuthRequests.forgotPassword(values);
  const { sendRequest, loading } = useRequest(
    request,
    SUCCESS_MSGS.FORGOT_PASS_SUCCESS
  );

  const { errors, touched, handleSubmit, handleBlur, setFieldValue } =
    useFormik({
      initialValues: forgotPasswordValues,
      validationSchema: forgotPassSchema,
      onSubmit: (values) => sendRequest(values),
    });

  return (
    <form onSubmit={handleSubmit}>
      <InputField
        name="email"
        label="Your email"
        placeholder="test@gmail.com"
        contentLeft={<FaAt />}
        error={Boolean(touched.email && errors.email)}
        onBlur={handleBlur}
        setFieldValue={setFieldValue}
        helperText={touched.email && errors.email}
      />
      <Row justify="center">
        <BaseButton loading={loading} text="Submit" />
      </Row>
    </form>
  );
};

export default ForgotPasswordForm;
