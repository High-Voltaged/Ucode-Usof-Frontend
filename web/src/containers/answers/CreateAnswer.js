import { Card, Grid, Row } from "@nextui-org/react";
import { useFormik } from "formik";
import { useState } from "react";
import { useSelector } from "react-redux";
import BaseButton from "~/components/Button/Button";
import { SUCCESS } from "~/consts/messages";
import Editor from "~/containers/editor/Editor";
import useAuthCheck from "~/hooks/use-auth-check";
import useRequest from "~/hooks/use-request";
import { useCreatePostAnswerMutation } from "~/redux/api/posts-api";
import { colors } from "~/theme/config";
import { createSchema } from "~/validation/answers";
import styles from "./CreateAnswer.styles";

const CreateAnswer = ({ postId }) => {
  const { authCheck } = useAuthCheck();
  const [isExpanded, setIsExpanded] = useState(false);
  const {
    user: { login },
  } = useSelector((state) => state.auth);

  const [createAnswer, { isLoading }] = useCreatePostAnswerMutation();
  const { request } = useRequest(createAnswer, SUCCESS.ANSWER_CREATION);

  const { values, errors, touched, handleSubmit, setFieldValue, resetForm } =
    useFormik({
      initialValues: { content: "" },
      validationSchema: createSchema,
      onSubmit: async ({ content }) => {
        const toBeUpdated = {
          publishDate: new Date().toISOString(),
          authorLogin: login,
        };
        const body = { content, ...toBeUpdated };
        await request({ postId, body }, resetForm);
        setIsExpanded(false);
      },
    });

  return (
    <Grid.Container css={{ flexFlow: "column nowrap" }}>
      <Grid css={styles.btnGroup}>
        <BaseButton
          text={!isExpanded ? "Add an answer" : "Cancel"}
          color={isExpanded ? colors.error : colors.feature}
          flat={isExpanded}
          size="md"
          onPress={() => authCheck(() => setIsExpanded((prev) => !prev))}
        />
        {isExpanded && (
          <BaseButton
            text="Submit"
            size="md"
            loading={isLoading}
            onPress={handleSubmit}
          />
        )}
      </Grid>
      {isExpanded && (
        <Grid css={{ mt: 20 }}>
          <Card css={styles.card}>
            <Card.Body css={styles.overflow}>
              <Row css={styles.row}>
                <label
                  style={touched.content && errors.content ? styles.error : {}}
                >
                  Answer content
                </label>
                <Editor
                  height={200}
                  value={values.content}
                  onChange={(v) => setFieldValue("content", v)}
                />
                {touched.content && errors.content && (
                  <p className="nextui-input-helper-text" style={styles.error}>
                    {errors.content}
                  </p>
                )}
              </Row>
            </Card.Body>
          </Card>
        </Grid>
      )}
    </Grid.Container>
  );
};

export default CreateAnswer;
