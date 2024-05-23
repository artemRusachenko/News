import { Formik, Form } from "formik";
import { observer } from "mobx-react-lite";
import { Input } from "semantic-ui-react";
import { useStore } from "../stores/store";

export default observer(function Search() {
  const { newsStore } = useStore();
  return (
    <Formik
      initialValues={{
        text: "",
      }}
      enableReinitialize
      onSubmit={(values, { setFieldValue }) => {
        newsStore.setPredicate("text", values.text);
        setFieldValue("text", "");
      }}
    >
      {({ handleSubmit, values, setFieldValue }) => (
        <Form className="ui form" onSubmit={handleSubmit} autoComplete="off">
          <Input
            icon="search"
            placeholder="Search..."
            size="large"
            value={values.text}
            onChange={(_, { value }) => setFieldValue("text", value)}
          />
        </Form>
      )}
    </Formik>
  );
});
