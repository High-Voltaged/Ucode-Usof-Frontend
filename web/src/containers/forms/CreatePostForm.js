import { Row } from "@nextui-org/react";
import Select from "react-select/async";
import InputField from "~/components/InputField/InputField";
import Editor from "~/containers/editor/Editor";
import styles from "./CreatePostForm.styles";

const CreatePostForm = ({
  formik: { values, errors, touched, handleSubmit, handleBlur, setFieldValue },
  select: { loadOptions, loading },
  children,
}) => {
  return (
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
        <label style={touched.content && errors.content ? styles.error : {}}>
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
          style={touched.categories && errors.categories ? styles.error : {}}
        >
          Post categories
        </label>
        <Select
          styles={styles.select}
          value={values.categories}
          onChange={(opts) => setFieldValue("categories", opts)}
          loadOptions={loadOptions}
          // cacheOptions
          isMulti
          isLoading={loading}
        />
        {touched.categories && errors.categories && (
          <p className="nextui-input-helper-text" style={styles.error}>
            {errors.categories}
          </p>
        )}
      </Row>
      {children}
    </form>
  );
};

export default CreatePostForm;
