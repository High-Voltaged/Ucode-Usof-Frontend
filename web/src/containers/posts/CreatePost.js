import { Card, Grid, Row } from "@nextui-org/react";
import { useFormik } from "formik";
import BaseButton from "~/components/Button/Button";
import Heading from "~/components/Heading/Heading";
import { SUCCESS } from "~/consts/messages";
import useCategories from "~/hooks/use-categories";
import useRequest from "~/hooks/use-request";
import { useCreatePostMutation } from "~/redux/api/posts-api";
import { createSchema } from "~/validation/posts";
import CreatePostForm from "../forms/CreatePostForm";
import styles from "./CreatePost.styles";

const CreatePost = () => {
  const { isCategoryFetching, filterCategories } = useCategories();
  const [createPost, { isFetching }] = useCreatePostMutation();
  const { request } = useRequest(createPost, SUCCESS.POST_CREATION);

  const {
    values,
    errors,
    touched,
    handleSubmit,
    handleBlur,
    setFieldValue,
    resetForm,
  } = useFormik({
    initialValues: {
      title: "",
      content: "",
      categories: [],
    },
    validationSchema: createSchema,
    onSubmit: async ({ categories: opts, ...values }) => {
      const categories = opts.map((o) => o.value);
      const data = { categories, ...values };
      await request(data, resetForm);
    },
  });

  const formik = {
    values,
    errors,
    touched,
    handleSubmit,
    handleBlur,
    setFieldValue,
  };

  const select = { loadOptions: filterCategories, loading: isCategoryFetching };

  return (
    <Grid.Container
      alignContent="flex-start"
      justify="center"
      css={styles.container}
    >
      <Grid xs={12} sm={8} md={6} xl={4}>
        <Card css={styles.card}>
          <Card.Header>
            <Heading text="Submit a new post" />
          </Card.Header>
          <Card.Body css={styles.overflow}>
            <CreatePostForm formik={formik} select={select}>
              <Row justify="center" css={styles.margin}>
                <BaseButton text="Create post" loading={isFetching} />
              </Row>
            </CreatePostForm>
          </Card.Body>
        </Card>
      </Grid>
    </Grid.Container>
  );
};

export default CreatePost;
