import { Card, Grid, Row } from "@nextui-org/react";
import { useFormik } from "formik";
import { useParams } from "react-router-dom";
import BaseButton from "~/components/Button/Button";
import ErrorTitle from "~/components/ErrorTitle/ErrorTitle";
import Heading from "~/components/Heading/Heading";
import Loader from "~/components/Loader/Loader";
import {
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

const EditPostContainer = () => {
  const { id } = useParams();
  const { data: post, isFetching, error } = useGetPostQuery(Number(id));

  const { data: categories, error: categoryError } = useGetPostCategoriesQuery(
    Number(id)
  );
  const [editPost, { isLoading }] = useEditPostMutation(Number(id));
  const { isCategoryFetching, filterCategories } = useCategories();

  const { request } = useRequest(editPost, SUCCESS.POST_UPDATE);

  const {
    values,
    errors,
    touched,
    handleSubmit,
    handleBlur,
    setFieldValue,
    resetForm,
  } = useFormik({
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

      if (!Object.keys(body).length) {
        return;
      }

      await request({ id: Number(id), body }, resetForm);
    },
  });

  if (error) {
    return <ErrorTitle text={error.message} />;
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
              <Row justify="center" css={styles.margin}>
                <BaseButton text="Update the post" loading={isLoading} />
              </Row>
            </CreatePostForm>
          </Card.Body>
        </Card>
      </Grid>
    </Grid.Container>
  );
};

export default EditPostContainer;
