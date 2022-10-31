import { Form, Formik } from "formik";
import * as Yup from "yup";
// import { useRef } from "react";
import { toast } from "react-toastify";
import { Button, Typography } from "@mui/material";
import FormikController from "../../formik/FormikController";
import { createUserSignup } from "../../api/Signup";
import { loginButtonWidth } from "../../components/login/loginStyles";

const SignupForm = () => {
  // const formikRef = useRef();
  const initialValues = {
    username: "",
    email: "",
    password: "",
    confirmpassword: "",
  };
  const validationSchema = Yup.object({
    email: Yup.string().email().required("Required"),
    password: Yup.string().required("Required"),
    confirmpassword: Yup.string().oneOf(
      [Yup.ref("password"), null],
      "Passwords must match"
    ),
  });

  const onSubmit = (values, { resetForm }) => {
    if (values) {
      createUserSignup(values)
        .then(() => {
          resetForm();
        })
        .catch((err) => {
          toast.error(err.message);
        });
    } else {
      toast.error("Something went wrong");
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
            <Typography variant="h5" fontWeight="bold" sx={{ mb: 2 }}>
              Collage Attendence Systems
            </Typography>
            <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
              Signup
            </Typography>
            <FormikController
              control="input"
              type="text"
              label="User Name"
              name="username"
              fullWidth
              value={formik.values.username}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.username)}
              helperText={formik.touched.username && formik.errors.username}
            />
            <br />
            <br />
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
            <FormikController
              control="input"
              type="password"
              label="Confierm Password"
              name="confirmpassword"
              fullWidth
              value={formik.values.confirmpassword}
              onChange={formik.handleChange}
              error={
                formik.touched.confirmpassword &&
                Boolean(formik.errors.confirmpassword)
              }
              helperText={
                formik.touched.confirmpassword && formik.errors.confirmpassword
              }
            />
            <br />
            <br />
            <Button sx={loginButtonWidth} variant="contained" type="submit">
              Signup
            </Button>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default SignupForm;
