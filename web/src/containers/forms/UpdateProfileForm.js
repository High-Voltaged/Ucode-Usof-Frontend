import { Link, Row } from "@nextui-org/react";
import { useFormik } from "formik";
import { FaAt, FaUser } from "react-icons/fa";

import InputField from "~/components/InputField/InputField";
import { updateProfileSchema } from "~/validation/auth";
import { getProfileValues } from "~/containers/forms/const";
import BaseButton from "~/components/Button/Button";
import { SUCCESS } from "~/consts/messages";
import { mainRoutes } from "~/consts/routes";
import { colors } from "~/theme/config";
import { useUpdateProfileMutation } from "~/redux/api/auth-api";
import useRequest from "~/hooks/use-request";
import { useSelector } from "react-redux";
import updateFilter from "~/utils/update-filter";

const UpdateProfileForm = () => {
  const { user } = useSelector((state) => state.auth);
  const [updateProfile, { isLoading }] = useUpdateProfileMutation();
  const { request } = useRequest(updateProfile, SUCCESS.PROFILE_UPDATE);

  const {
    values,
    errors,
    touched,
    handleSubmit,
    handleBlur,
    setFieldValue,
    resetForm,
  } = useFormik({
    initialValues: getProfileValues(user),
    validationSchema: updateProfileSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      const body = updateFilter(values, user);
      if (!body) return;

      await request({ body }, resetForm);
    },
  });

  return (
    <form onSubmit={handleSubmit}>
      <InputField
        name="login"
        label="Your login"
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
        contentLeft={<FaAt />}
        value={values.fullName}
        error={Boolean(touched.fullName && errors.fullName)}
        onBlur={handleBlur}
        setFieldValue={setFieldValue}
        helperText={touched.fullName && errors.fullName}
      />
      <Row justify="flex-end">
        <Link href={mainRoutes.forgotPassword} color={colors.feature}>
          Reset my password
        </Link>
      </Row>
      <Row justify="center" css={{ mt: 10 }}>
        <BaseButton block loading={isLoading} text="Update my profile" />
      </Row>
    </form>
  );
};

export default UpdateProfileForm;
