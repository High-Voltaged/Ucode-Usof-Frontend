import { Grid, Row } from "@nextui-org/react";
import { useFormik } from "formik";
import InputField from "~/components/InputField/InputField";
import BaseButton from "../Button/Button";

const styles = { ml: "10px" };

const FilterMenu = ({ setFilter }) => {
  const { values, errors, touched, handleSubmit, handleBlur, setFieldValue } =
    useFormik({
      initialValues: { category: "", dateStart: null, dateEnd: null },
      onSubmit: async (values) => {
        const data = Object.fromEntries(
          Object.entries(values).filter(([_, v]) => v)
        );
        setFilter(data);
      },
    });

  return (
    <Grid.Container gap={2}>
      <Grid xs={12} justify="center" alignItems="center">
        <form onSubmit={handleSubmit}>
          <Row justify="space-between" align="center">
            <InputField
              name="category"
              label="Search by a category"
              value={values.category}
              error={Boolean(touched.category && errors.category)}
              onBlur={handleBlur}
              setFieldValue={setFieldValue}
              helperText={touched.category && errors.category}
            />
            <InputField
              name="dateStart"
              label="Search by start date"
              type="date"
              value={values.dateStart}
              error={Boolean(touched.dateStart && errors.dateStart)}
              onBlur={handleBlur}
              setFieldValue={setFieldValue}
              helperText={touched.dateStart && errors.dateStart}
              css={styles}
            />
            <InputField
              name="dateEnd"
              label="Search by end date"
              type="date"
              value={values.dateEnd}
              error={Boolean(touched.dateEnd && errors.dateEnd)}
              onBlur={handleBlur}
              setFieldValue={setFieldValue}
              helperText={touched.dateEnd && errors.dateEnd}
              css={styles}
            />
          </Row>
          <Row justify="center" css={{ mt: "10px" }}>
            <BaseButton text="Apply" />
          </Row>
        </form>
      </Grid>
    </Grid.Container>
  );
};

export default FilterMenu;
