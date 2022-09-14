import { Form, Formik } from "formik";
import * as Yup from "yup";
// import { toast } from 'react-toastify';
import { Button, Typography } from "@mui/material";
import FormikController from "../../formik/FormikController";
import { loginWithEmailAndPassword } from "../../api/auth";
import { loginButtonWidth } from "./loginStyles";

const LoginWithUserNamePassword = () => {
  const initialValues = {
    email: "",
    password: "",
  };
  const validationSchema = Yup.object({
    email: Yup.string().email().required("Required"),
    password: Yup.string().required("Required"),
  });

  const onSubmit = (values, { resetForm }) => {
    if (values) {
      loginWithEmailAndPassword(values)
        .then(() => {
          resetForm();
        })
        .catch((err) => {
          // toast.error(err.message);
        });
    } else {
      // toast.error('Something went wrong');
    }
  };
  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {(formik) => (
          <Form>
            <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
              Log In to your account <br />
              to continue to Track your deal
            </Typography>
            <FormikController
              control="input"
              type="text"
              label="Email"
              name="email"
              fullWidth
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
            <br />
            <br />
            <FormikController
              control="input"
              type="password"
              label="Password"
              name="password"
              fullWidth
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
            <br />
            <br />
            <Button sx={loginButtonWidth} variant="contained" type="submit">
              Login
            </Button>
          </Form>
        )}
      </Formik>
      <br />
      <Typography component="p">OR</Typography>
    </>
  );
};

export default LoginWithUserNamePassword;
