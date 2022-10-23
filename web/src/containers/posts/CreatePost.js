import { Card, Grid, Row } from "@nextui-org/react";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import Select from "react-select/async";
import BaseButton from "~/components/Button/Button";
import Heading from "~/components/Heading/Heading";
import InputField from "~/components/InputField/InputField";
import { SUCCESS_MSGS } from "~/consts/messages";
import Editor from "~/containers/editor/Editor";
import useAlert from "~/hooks/use-alert";
import {
  useCreatePostMutation,
  useGetCategoriesQuery,
} from "~/redux/api/posts-api";
import { colors } from "~/theme/config";
import { createSchema } from "~/validation/posts";
import styles from "./CreatePost.styles";

const CreatePost = () => {
  const { setAlert } = useAlert();
  const [categories, setCategories] = useState([]);

  const { data, isFetching: isCategoryFetching } = useGetCategoriesQuery();
  const [createPost, { isFetching }] = useCreatePostMutation();

  const fetchCategories = async (value) => {
    return categories.filter((c) =>
      c.label.toLowerCase().includes(value.toLowerCase())
    );
  };

  useEffect(() => {
    if (data) {
      const categoryData = data.map((c) => ({
        value: c.id,
        label: c.title,
      }));
      setCategories(categoryData);
    }
  }, [data]);

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
      createPost(data)
        .unwrap()
        .then(() => {
          resetForm();
          setAlert(SUCCESS_MSGS.POST_CREATION_SUCCESS, colors.success);
        })
        .catch(({ data }) => setAlert(data.message, colors.error));
    },
  });

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
            <form onSubmit={handleSubmit}>
              <InputField
                name="title"
                label="Post title"
                placeholder="test_title"
                value={values.title}
                error={Boolean(touched.title && errors.title)}
                onBlur={handleBlur}
                setFieldValue={setFieldValue}
                helperText={touched.title && errors.title}
                bordered
              />
              <Row css={styles.row}>
                <label
                  style={touched.content && errors.content ? styles.error : {}}
                >
                  Post content
                </label>
                <Editor
                  value={values.content}
                  onChange={(v) => setFieldValue("content", v)}
                />
                {touched.content && errors.content && (
                  <p className="nextui-input-helper-text" style={styles.error}>
                    {errors.content}
                  </p>
                )}
              </Row>
              <Row css={styles.rowSibling}>
                <label
                  style={
                    touched.categories && errors.categories ? styles.error : {}
                  }
                >
                  Post categories
                </label>
                <Select
                  styles={styles.select}
                  value={values.categories}
                  onChange={(opts) => setFieldValue("categories", opts)}
                  loadOptions={fetchCategories}
                  cacheOptions
                  defaultOptions={[]}
                  isMulti
                  isLoading={isCategoryFetching}
                />
                {touched.categories && errors.categories && (
                  <p className="nextui-input-helper-text" style={styles.error}>
                    {errors.categories}
                  </p>
                )}
              </Row>
              <Row justify="center" css={styles.margin}>
                <BaseButton text="Create post" loading={isFetching} />
              </Row>
            </form>
          </Card.Body>
        </Card>
      </Grid>
    </Grid.Container>
  );
};

export default CreatePost;
