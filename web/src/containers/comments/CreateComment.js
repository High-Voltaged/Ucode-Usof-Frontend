import { Grid } from "@nextui-org/react";
import { useFormik } from "formik";
import { useState } from "react";
import { useSelector } from "react-redux";
import BaseButton from "~/components/Button/Button";
import InputField from "~/components/InputField/InputField";
import { SUCCESS } from "~/consts/messages";
import useRequest from "~/hooks/use-request";
import { useAddAnswerCommentMutation } from "~/redux/api/answers-api";
import { colors } from "~/theme/config";
import { createSchema } from "~/validation/comments";

const CreateComment = ({ answerId }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const {
    user: { login },
  } = useSelector((state) => state.auth);
  const [createComment, { isLoading }] = useAddAnswerCommentMutation();
  const { request } = useRequest(createComment, SUCCESS.COMMENT_CREATION);

  const {
    values,
    errors,
    touched,
    handleSubmit,
    handleBlur,
    setFieldValue,
    resetForm,
  } = useFormik({
    initialValues: { content: "" },
    validationSchema: createSchema,
    onSubmit: async ({ content }) => {
      const toBeUpdated = {
        publishDate: new Date().toISOString(),
        authorLogin: login,
      };
      const body = { content, ...toBeUpdated };
      await request({ answerId, body }, resetForm);
      setIsExpanded(false);
    },
  });

  return (
    <Grid.Container css={{ flexFlow: "column nowrap" }}>
      <Grid css={{ d: "flex", gap: 10 }}>
        <BaseButton
          text={!isExpanded ? "Add a comment" : "Cancel"}
          color={isExpanded ? colors.error : colors.feature}
          size="sm"
          bordered
          onPress={() => setIsExpanded((prev) => !prev)}
        />
        {isExpanded && (
          <BaseButton
            text="Submit"
            size="sm"
            loading={isLoading}
            onPress={handleSubmit}
          />
        )}
      </Grid>
      {isExpanded && (
        <Grid css={{ mt: 20 }}>
          <InputField
            aria-label="content"
            name="content"
            placeholder="test_content"
            value={values.content}
            error={Boolean(touched.content && errors.content)}
            onBlur={handleBlur}
            setFieldValue={setFieldValue}
            helperText={touched.content && errors.content}
          />
        </Grid>
      )}
    </Grid.Container>
  );
};

export default CreateComment;
