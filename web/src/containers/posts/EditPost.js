import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import { Button, Card, Grid, Popover } from "@nextui-org/react";
import BaseButton from "~/components/Button/Button";
import ErrorTitle from "~/components/ErrorTitle/ErrorTitle";
import Heading from "~/components/Heading/Heading";
import Loader from "~/components/Loader/Loader";
import {
  useDeletePostMutation,
  useEditPostMutation,
  useGetPostCategoriesQuery,
  useGetPostQuery,
} from "~/redux/api/posts-api";
import { createSchema } from "~/validation/posts";
import CreatePostForm from "~/containers/forms/CreatePostForm";
import styles from "./CreatePost.styles";
import useCategories from "~/hooks/use-categories";
import { getInitValues } from "./const";
import useRequest from "~/hooks/use-request";
import { SUCCESS } from "~/consts/messages";
import { colors } from "~/theme/config";
import BasePopover from "~/components/popover/Popover";
import { postNav } from "~/consts/routes";

const EditPostContainer = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { id } = useParams();
  const navigate = useNavigate();
  const { data: post, isFetching, error } = useGetPostQuery(Number(id));

  const { data: categories, error: categoryError } = useGetPostCategoriesQuery(
    Number(id)
  );
  const [editPost, { editLoading }] = useEditPostMutation();
  const [deletePost, { deleteLoading }] = useDeletePostMutation();
  const { isCategoryFetching, filterCategories } = useCategories();

  const { request: editRequest } = useRequest(editPost, SUCCESS.POST_UPDATE);
  const { request: deleteRequest } = useRequest(
    deletePost,
    SUCCESS.POST_DELETION
  );

  const onConfirm = async () => {
    await deleteRequest(Number(id));
    navigate(postNav.posts);
  };

  const { values, errors, touched, handleSubmit, handleBlur, setFieldValue } =
    useFormik({
      initialValues: getInitValues(post, categories),
      validationSchema: createSchema,
      enableReinitialize: true,
      onSubmit: async ({ categories: options, ...values }) => {
        const newCategories = options.map((o) => o.value);
        const oldCategories = categories.map((c) => c.id);

        const body = {};
        if (JSON.stringify(newCategories) !== JSON.stringify(oldCategories)) {
          body.categories = newCategories;
        }
        Object.entries(values).forEach(([key, value]) => {
          if (post[key] !== value) {
            body[key] = value;
          }
        });

        await editRequest({ id: Number(id), body }, null);
      },
    });

  if (error) {
    return <ErrorTitle text={error.data.message} />;
  }
  if (categoryError) {
    return <ErrorTitle text={categoryError.data.message} />;
  }

  if (isFetching || !post) {
    return <Loader />;
  }

  const formik = {
    values,
    errors,
    touched,
    handleSubmit,
    handleBlur,
    setFieldValue,
  };

  const select = {
    loadOptions: filterCategories,
    loading: isCategoryFetching,
  };

  return (
    <Grid.Container
      alignContent="flex-start"
      justify="center"
      css={styles.container}
    >
      <Grid xs={12} sm={8} md={6} xl={4}>
        <Card css={styles.card}>
          <Card.Header>
            <Heading text="Edit the post" />
          </Card.Header>
          <Card.Body css={styles.overflow}>
            <CreatePostForm formik={formik} select={select}>
              <Grid.Container justify="center" gap={1} css={styles.margin}>
                <Grid>
                  <BaseButton text="Update the post" loading={editLoading} />
                </Grid>
                <Grid>
                  <Popover isOpen={isOpen} onOpenChange={setIsOpen}>
                    <Popover.Trigger>
                      <Button color={colors.error} size="lg" flat>
                        {deleteLoading ? <Loader /> : "Delete"}
                      </Button>
                    </Popover.Trigger>
                    <Popover.Content>
                      <BasePopover
                        onCancel={() => setIsOpen(false)}
                        onConfirm={onConfirm}
                        message="Are you sure you want to delete this post?"
                      />
                    </Popover.Content>
                  </Popover>
                </Grid>
              </Grid.Container>
            </CreatePostForm>
          </Card.Body>
        </Card>
      </Grid>
    </Grid.Container>
  );
};

export default EditPostContainer;
