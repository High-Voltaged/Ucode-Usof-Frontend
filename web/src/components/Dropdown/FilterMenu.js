import { Grid, Row } from "@nextui-org/react";
import { useFormik } from "formik";
import InputField from "~/components/InputField/InputField";
import BaseButton from "../Button/Button";

const styles = { ml: "10px" };

const FilterMenu = ({ setFilter }) => {
  const { values, errors, touched, handleSubmit, handleBlur, setFieldValue } =
    useFormik({
      initialValues: { category: "", dateStart: "", dateEnd: "" },
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
          <Row
            justify="space-between"
            align="center"
            css={{
              fd: "column",
              "@xs": { fd: "row" },
            }}
          >
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
              css={{ "@xs": styles }}
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
              css={{ "@xs": styles }}
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
