import TextField from '@mui/material/TextField';

function Input(props) {
  const { name, label, ...rest } = props;
  return <TextField id={name} name={name} label={label} {...rest} />;
}
export default Input;
