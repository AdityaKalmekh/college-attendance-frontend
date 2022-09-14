import TextArea from "../components/form-components/TextArea";
import Select from "../components/form-components/Select";
import RadioButtons from "../components/form-components/RadioButtons";
import CheckBoxes from "../components/form-components/CheckBoxes";
import Input from "../components/form-components/Input";

const FormikController = (props) => {
  const { control, ...rest } = props;
  switch (control) {
    case "input":
      return <Input {...rest} />;
    case "textArea":
      return <TextArea {...rest} />;
    case "select":
      return <Select {...rest} />;
    case "radio":
      return <RadioButtons {...rest} />;
    case "checkbox":
      return <CheckBoxes {...rest} />;
    default:
      return null;
  }
};
export default FormikController;
