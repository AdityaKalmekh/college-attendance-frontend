import { FormControl, FormHelperText, TextField } from '@mui/material';

function TextArea(props) {
  const { label, name, value, helperText, style, ...rest } = props;
  return (
    <FormControl sx={{ minWidth: '100%' }}>
      <TextField label={label} name={name} id={name} multiline rows={4} defaultValue={value} style={style} {...rest} />

      <FormHelperText sx={{ color: 'red' }}>{helperText}</FormHelperText>
    </FormControl>
  );
}
export default TextArea;
