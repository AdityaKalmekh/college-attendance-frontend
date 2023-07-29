import { Form, Formik } from "formik";
import * as Yup from "yup";
// import { useRef } from "react";
import { toast } from "react-toastify";
import { Button, Typography } from "@mui/material";
import FormikController from "../../formik/FormikController";
import { loginButtonWidth } from "../../components/login/loginStyles";
import useHttp from "../../hooks/useHttp";

const SignupForm = () => {
  // const formikRef = useRef();
  const initialValues = {
    email: "",
    password: "",
  };

  const {sendRequest : sendTaskRequest} = useHttp();

  const loadNewUser = (values,response) =>{
    if (response === true){
      toast.error("Email already exists")
    }else{
      console.log("hello");
    }
  }

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
      // createUserSignup(values)
      sendTaskRequest({
        url : "/checkEmail",
        method : "post",
        data : values
      },(data) => {if (data.length > 0){
        toast.error("User already exists");
        resetForm();
      }else{
        sendTaskRequest({
          url:"/addUser",
          method:"post",
          data : values},loadNewUser.bind(null,values)).then(() => {
            resetForm();
          })
          .catch((err) => {
            toast.error(err.message);
          });
      }})
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