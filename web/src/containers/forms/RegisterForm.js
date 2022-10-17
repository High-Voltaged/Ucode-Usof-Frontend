import { Row } from "@nextui-org/react";
import { useFormik } from "formik";
import { FaAt, FaLock, FaUser } from "react-icons/fa";

import InputField from "~/components/InputField/InputField";
import { registerSchema } from "~/validation/auth";
import BaseButton from "~/components/Button/Button";
import AuthRequests from "~/requests/auth";
import { registerValues } from "~/containers/forms/const";

import useRequest from "~/hooks/use-request";
import { SUCCESS_MSGS } from "~/consts/messages";

const RegisterForm = () => {
  const {
    values,
    errors,
    touched,
    handleSubmit,
    handleBlur,
    setFieldValue,
    resetForm,
  } = useFormik({
    initialValues: registerValues,
    validationSchema: registerSchema,
    onSubmit: (values) => sendRequest(values),
  });

  const request = (data) => AuthRequests.register(data);
  const { sendRequest, loading } = useRequest(
    request,
    true,
    SUCCESS_MSGS.REGISTER_SUCCESS,
    resetForm,
    false,
    false
  );

  return (
    <form onSubmit={handleSubmit}>
      <InputField
        name="login"
        label="Your login"
        placeholder="test_login"
        contentLeft={<FaUser />}
        value={values.login}
        error={Boolean(touched.login && errors.login)}
        onBlur={handleBlur}
        setFieldValue={setFieldValue}
        helperText={touched.login && errors.login}
      />
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
      <InputField
        name="fullName"
        label="Your full name"
        placeholder="John Doe"
        contentLeft={<FaAt />}
        value={values.fullName}
        error={Boolean(touched.fullName && errors.fullName)}
        onBlur={handleBlur}
        setFieldValue={setFieldValue}
        helperText={touched.fullName && errors.fullName}
      />
      <InputField
        name="password"
        label="Your password"
        placeholder="your_password"
        isPassword
        contentLeft={<FaLock />}
        value={values.password}
        error={Boolean(touched.password && errors.password)}
        onBlur={handleBlur}
        setFieldValue={setFieldValue}
        helperText={touched.password && errors.password}
      />
      <InputField
        name="passwordConfirm"
        label="Confirm your password"
        placeholder="your_password"
        isPassword
        contentLeft={<FaLock />}
        value={values.passwordConfirm}
        error={Boolean(touched.passwordConfirm && errors.passwordConfirm)}
        onBlur={handleBlur}
        setFieldValue={setFieldValue}
        helperText={touched.passwordConfirm && errors.passwordConfirm}
      />
      <Row justify="center">
        <BaseButton block loading={loading} text="Submit" />
      </Row>
    </form>
  );
};

export default RegisterForm;
