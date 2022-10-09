import { Link, Row } from "@nextui-org/react";
import { useFormik } from "formik";
import { FaAt, FaLock, FaUser } from "react-icons/fa";

import InputField from "~/components/InputField/InputField";
import { login } from "~/redux/auth-slice";
import { loginSchema } from "~/validation/auth";
import { loginValues } from "~/containers/forms/const";
import BaseButton from "~/components/Button/Button";
import useDispatchRequest from "~/hooks/use-dispatch-request";
import { SUCCESS_MSGS } from "~/consts/messages";
import { mainRoutes } from "~/consts/routes";
import { colors } from "~/theme/config";

const LoginForm = () => {
  const {
    values,
    errors,
    touched,
    handleSubmit,
    handleBlur,
    setFieldValue,
    resetForm,
  } = useFormik({
    initialValues: loginValues,
    validationSchema: loginSchema,
    onSubmit: (values) => sendRequest(values),
  });

  const request = (values) => login(values);
  const { sendRequest, loading } = useDispatchRequest(
    request,
    SUCCESS_MSGS.LOGIN_SUCCESS,
    resetForm
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
      <Row justify="flex-end">
        <Link href={mainRoutes.forgotPassword} color={colors.feature}>
          Forgot your password?
        </Link>
      </Row>
      <Row justify="center" css={{ mt: "10px" }}>
        <BaseButton loading={loading} text="Login" />
      </Row>
    </form>
  );
};

export default LoginForm;
