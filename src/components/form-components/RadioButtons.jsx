import { FormControl, FormLabel } from '@mui/material';
import { ErrorMessage, Field } from 'formik';

function RadioButtons(props) {
  const { label, name, options, defaultValue, ...rest } = props;
  return (
    <FormControl>
      <FormLabel id="demo-radio-buttons-group-label">{label}</FormLabel>
      <Field name={name}>
        {(formik) => {
          const { field } = formik;
          return options.map((option) => {
            return (
              <div
                style={{
                  marginTop: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  flexDirection: 'row',
                  marginBottom: '8px',
                }}
                key={option.key}
              >
                <input
                  type="radio"
                  id={option.value}
                  {...field}
                  {...rest}
                  value={option.value}
                  checked={field.value === option.value}
                />
                <label
                  style={{
                    marginLeft: '10px',
                    fontFamily: '"Roboto","Helvetica","Arial",sans-serif',
                  }}
                  htmlFor={option.value}
                >
                  {option.label}
                </label>
              </div>
            );
          });
        }}
      </Field>
      <ErrorMessage name={name} />
    </FormControl>
  );
}

export default RadioButtons;
