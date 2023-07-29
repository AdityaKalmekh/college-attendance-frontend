import { Form, Formik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { Button, Typography } from "@mui/material";
import FormikController from "../../formik/FormikController";
import { loginButtonWidth } from "./loginStyles";
import useHttp from "../../hooks/useHttp";
import AuthContext from "../../context/AuthContext";
import { useContext } from "react";

const LoginWithUserNamePassword = () => {
  const authctx = useContext(AuthContext);

  const { sendRequest } = useHttp();
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
      sendRequest({
        url : "/checkEmail",
        method : "post",
        data : values
      },(data) => {if (data.length > 0)  
                    {
                      authctx.userHandler(data[0].role)
                      authctx.onLogin()
                      authctx.idHandler(data[0].facultyId)
                    } else {
                      toast.error("user not exist")}
                      resetForm();
                  })
      // setTimeout(() => {console.log(authctx.user)},5000);
      // console.log(authctx.user);
      // LoginWithEmailAndPassword(values)
      //   .then(() => {
      //     resetForm();
      //   })
      //   .catch((err) => {
      //     toast.error(err.message);
      //   });
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
              Login
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
