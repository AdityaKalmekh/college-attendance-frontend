import { Grid } from "@mui/material";
// import { toast } from 'react-toastify';
import { Form, Formik } from "formik";
import FormikController from "../../formik/FormikController";
import * as Yup from "yup";
import { createUser, updateUser } from "../../api/users";
import Modal from "../../common/Modal";
import { useRef } from "react";
import Loading from "../../common/Loader";
import useProgress from "../../hooks/useProgress";

const CreateUserForm = ({ handleClose, currentRow }) => {
  const [createNewUser, createLoading] = useProgress(createUser);
  const [updateExistingUser, updateLoading] = useProgress(updateUser);
  const formikRef = useRef();
  const validationSchema = Yup.object({
    contact: Yup.string().required("Required"),
    firstName: Yup.string().required("Required"),
    lastName: Yup.string().required("Required"),
    email: Yup.string().required("Required"),
    role: Yup.string().required("Required"),
  });

  const onOk = () => {
    formikRef.current.submitForm().then((values) => {
      if (values) {
        if (currentRow.firebaseId) {
          updateExistingUser(values).then(() => {
            // toast.success("User updated successfully");
            handleClose();
          });
        } else {
          createNewUser(values).then(() => {
            // toast.success("User created successfully");
            handleClose();
          });
        }
      }
    });
  };

  return (
    <Modal
      title={currentRow.firebaseId ? "Update Data" : "Create Data"}
      onOk={onOk}
      onCancel={handleClose}
      sx={{ minHeight: (createLoading || updateLoading) && "200px" }}
    >
      {createLoading || updateLoading ? (
        <Loading
          title={
            currentRow.firebaseId
              ? "Please wait updating your details..."
              : "Please wait creating your details..."
          }
          top="65%"
        />
      ) : (
        <Grid item xs={12}>
          <Formik
            innerRef={formikRef}
            initialValues={currentRow}
            validationSchema={validationSchema}
            onSubmit={(values) => values}
          >
            {(formik) => (
              <Form>
                <Grid item xs={12}>
                  <FormikController
                    control="input"
                    type="text"
                    label="FirstName"
                    name="firstName"
                    fullWidth
                    value={formik.values.firstName}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.firstName &&
                      Boolean(formik.errors.firstName)
                    }
                    helperText={
                      formik.touched.firstName && formik.errors.firstName
                    }
                  />
                </Grid>

                <Grid item xs={12} paddingTop="1rem">
                  <FormikController
                    control="input"
                    type="text"
                    label="lastName"
                    name="lastName"
                    fullWidth
                    value={formik.values.lastName}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.lastName && Boolean(formik.errors.lastName)
                    }
                    helperText={
                      formik.touched.lastName && formik.errors.lastName
                    }
                  />
                </Grid>

                <Grid item xs={12} paddingTop="1rem">
                  <FormikController
                    control="input"
                    type="text"
                    label="contact"
                    name="contact"
                    fullWidth
                    value={formik.values.contact}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.contact && Boolean(formik.errors.contact)
                    }
                    helperText={formik.touched.contact && formik.errors.contact}
                  />
                </Grid>

                <Grid item xs={12} paddingTop="1rem">
                  <FormikController
                    control="input"
                    type="text"
                    label="email"
                    name="email"
                    fullWidth
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                  />
                </Grid>
              </Form>
            )}
          </Formik>
        </Grid>
      )}
    </Modal>
  );
};
export default CreateUserForm;
