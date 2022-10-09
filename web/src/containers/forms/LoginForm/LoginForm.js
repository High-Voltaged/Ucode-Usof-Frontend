import { useContext, useState } from "react";
import { Row } from "@nextui-org/react";
import { useFormik } from "formik";
import { FaAt, FaLock, FaUser } from "react-icons/fa";
import { useDispatch } from "react-redux";

import InputField from "~/components/InputField/InputField";
import { login } from "~/redux/auth-slice";
import { loginSchema } from "~/validation/auth";
import { loginValues } from "~/containers/forms/const";
import { AlertContext } from "~/context/Alert";
import BaseButton from "~/components/Button/Button";
import { colors } from "~/theme/config";

const LoginForm = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const { setAlert } = useContext(AlertContext);

  const { errors, touched, handleSubmit, handleBlur, setFieldValue } =
    useFormik({
      initialValues: loginValues,
      validationSchema: loginSchema,
      onSubmit: (values) => {
        setLoading(true);
        dispatch(login(values))
          .unwrap()
          .catch((err) => {
            setAlert(err, colors.error);
          })
          .finally(() => {
            setLoading(false);
          });
      },
    });

  return (
    <>
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
        <Row justify="center">
          <BaseButton loading={loading} text="Login" />
        </Row>
      </form>
    </>
  );
};

export default LoginForm;
