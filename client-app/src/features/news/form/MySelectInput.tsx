import { useField } from "formik";
import { Form, Label, Select } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import { useStore } from "../../../app/stores/store";
import { useEffect } from "react";

interface Props {
  placeholder: string;
  name: string;
  label?: string;
}

export default observer(function MySelectInput(props: Props) {
  const { categoryStore } = useStore();
  const { categeryOptions, selectCategory } = categoryStore;

  const [field, meta, helpers] = useField(props.name);
  useEffect(() => {
    if(field.value != "") selectCategory(field.value);
  }, []);
  
  return (
    <Form.Field error={meta.touched && !!meta.error}>
      <label>{props.label}</label>
      <Select
        clearable
        options={categeryOptions}
        value={field.value || null}
        onChange={(_, d) => {
          helpers.setValue(d.value);
          selectCategory(d.value)
        }}
        onBlur={() => helpers.setTouched(true)}
        placeholder={props.placeholder}
      />
      {meta.touched && meta.error ? (
        <Label basic color="red">
          {meta.error}
        </Label>
      ) : null}
    </Form.Field>
  );
});
