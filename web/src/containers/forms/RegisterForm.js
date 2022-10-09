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
  const request = (data) => AuthRequests.register(data);
  const { sendRequest, loading } = useRequest(
    request,
    SUCCESS_MSGS.REGISTER_SUCCESS
  );

  const { errors, touched, handleSubmit, handleBlur, setFieldValue } =
    useFormik({
      initialValues: registerValues,
      validationSchema: registerSchema,
      onSubmit: (values) => sendRequest(values),
    });

  return (
    <form onSubmit={handleSubmit}>
      <InputField
        name="login"
        label="Your login"
        placeholder="test_login"
        contentLeft={<FaUser />}
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
        error={Boolean(touched.passwordConfirm && errors.passwordConfirm)}
        onBlur={handleBlur}
        setFieldValue={setFieldValue}
        helperText={touched.passwordConfirm && errors.passwordConfirm}
      />
      <Row justify="center">
        <BaseButton loading={loading} text="Submit" />
      </Row>
    </form>
  );
};

export default RegisterForm;
