import { useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import { Card, Grid } from "@nextui-org/react";
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
import { container as styles } from "~/styles/edit-styles";
import useCategories from "~/hooks/use-categories";
import { getInitValues } from "./const";
import useRequest from "~/hooks/use-request";
import { SUCCESS } from "~/consts/messages";
import { postNav } from "~/consts/routes";
import PopoverMenu from "~/components/popover/PopoverMenu";
import updateFilter from "~/utils/update-filter";

const EditPostContainer = () => {
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

        values.content = values.content.replaceAll(/<p><br><\/p>/g, "");

        let body = {};
        if (JSON.stringify(newCategories) !== JSON.stringify(oldCategories)) {
          body.categories = newCategories;
        }
        Object.assign(body, updateFilter(values, post));

        if (!Object.keys(body).length) {
          return;
        }

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
                  <PopoverMenu
                    btnSize="lg"
                    btnLoading={deleteLoading}
                    onConfirm={onConfirm}
                    message="Are you sure you want to delete this post"
                  />
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
