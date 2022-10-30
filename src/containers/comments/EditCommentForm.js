import { useFormik } from "formik";
import { Card, Grid, Row } from "@nextui-org/react";
import BaseButton from "~/components/Button/Button";
import { getInitValues } from "./const";
import useRequest from "~/hooks/use-request";
import { SUCCESS } from "~/consts/messages";
import { updateSchema } from "~/validation/comments";
import { container, form } from "~/styles/edit-styles";
import PopoverMenu from "~/components/popover/PopoverMenu";
import {
  useDeleteCommentMutation,
  useEditCommentMutation,
} from "~/redux/api/answers-api";
import InputField from "~/components/InputField/InputField";

const EditCommentForm = ({ comment: { id, content }, onCancel }) => {
  const [editComment, { editLoading }] = useEditCommentMutation();
  const [deleteComment, { deleteLoading }] = useDeleteCommentMutation();

  const { request: editRequest } = useRequest(
    editComment,
    SUCCESS.COMMENT_UPDATE
  );
  const { request: deleteRequest } = useRequest(
    deleteComment,
    SUCCESS.COMMENT_DELETION
  );

  const onConfirm = async () => {
    await deleteRequest(id);
  };

  const { values, errors, touched, handleSubmit, handleBlur, setFieldValue } =
    useFormik({
      initialValues: getInitValues({ content }),
      validationSchema: updateSchema,
      enableReinitialize: true,
      onSubmit: async (body) => {
        if (body.content === content) {
          return;
        }

        await editRequest({ commentId: id, body }, null);
      },
    });

  return (
    <Grid.Container
      alignContent="flex-start"
      justify="center"
      css={container.container}
    >
      <Grid xs={12}>
        <Card css={{ ...container.card, p: 10 }}>
          <Card.Body css={container.overflow}>
            <form onSubmit={handleSubmit}>
              <Row css={form.row}>
                <InputField
                  aria-label="content"
                  name="content"
                  value={values.content}
                  error={Boolean(touched.content && errors.content)}
                  onBlur={handleBlur}
                  setFieldValue={setFieldValue}
                  isLast
                  helperText={touched.content && errors.content}
                />
              </Row>
              <Grid.Container justify="center" gap={1} css={{ mt: 10 }}>
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
                    text="Update the comment"
                    loading={editLoading}
                    size="md"
                  />
                </Grid>
                <Grid>
                  <PopoverMenu
                    btnLoading={deleteLoading}
                    onConfirm={onConfirm}
                    message="Are you sure you want to delete this comment?"
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

export default EditCommentForm;
