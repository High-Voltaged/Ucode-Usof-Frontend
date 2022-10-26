import { useFormik } from "formik";
import { Card, Grid, Row } from "@nextui-org/react";
import BaseButton from "~/components/Button/Button";
import {
  useDeletePostAnswerMutation,
  useEditPostAnswerMutation,
} from "~/redux/api/posts-api";
import { getInitValues } from "./const";
import useRequest from "~/hooks/use-request";
import { SUCCESS } from "~/consts/messages";
import Editor from "../editor/Editor";
import { updateSchema } from "~/validation/answers";
import { container, form } from "~/styles/edit-styles";
import PopoverMenu from "~/components/popover/PopoverMenu";

const EditAnswerForm = ({ answer: { id, content }, onCancel }) => {
  const [editAnswer, { editLoading }] = useEditPostAnswerMutation();
  const [deleteAnswer, { deleteLoading }] = useDeletePostAnswerMutation();

  const { request: editRequest } = useRequest(
    editAnswer,
    SUCCESS.ANSWER_UPDATE
  );
  const { request: deleteRequest } = useRequest(
    deleteAnswer,
    SUCCESS.ANSWER_DELETION
  );

  const onConfirm = async () => {
    await deleteRequest(id);
  };

  const { values, errors, touched, handleSubmit, setFieldValue } = useFormik({
    initialValues: getInitValues({ content }),
    validationSchema: updateSchema,
    enableReinitialize: true,
    onSubmit: async (body) => {
      if (body.content === content) {
        return;
      }

      await editRequest({ answerId: id, body }, null);
    },
  });

  return (
    <Grid.Container
      alignContent="flex-start"
      justify="center"
      css={container.container}
    >
      <Grid xs={12}>
        <Card css={container.card}>
          <Card.Body css={container.overflow}>
            <form onSubmit={handleSubmit}>
              <Row css={form.row}>
                <Editor
                  height={200}
                  value={values.content}
                  onChange={(v) => setFieldValue("content", v)}
                />
                {touched.content && errors.content && (
                  <p className="nextui-input-helper-text" style={form.error}>
                    {errors.content}
                  </p>
                )}
              </Row>
              <Grid.Container justify="center" gap={1} css={container.margin}>
                <Grid>
                  <BaseButton
                    text="Cancel"
                    type="button"
                    flat
                    onPress={onCancel}
                    size="md"
                  />
                </Grid>
                <Grid>
                  <BaseButton
                    text="Update the answer"
                    loading={editLoading}
                    size="md"
                  />
                </Grid>
                <Grid>
                  <PopoverMenu
                    btnLoading={deleteLoading}
                    onConfirm={onConfirm}
                    message="Are you sure you want to delete this answer?"
                  />
                </Grid>
              </Grid.Container>
            </form>
          </Card.Body>
        </Card>
      </Grid>
    </Grid.Container>
  );
};

export default EditAnswerForm;
