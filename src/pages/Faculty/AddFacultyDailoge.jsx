/* eslint-disable no-unused-vars */
import {
  DialogTitle,
  TextField,
  Button,
  Box,
  Dialog,
  Grid,
} from "@material-ui/core";
import { toast } from "react-toastify";
import * as React from "react";
import { useRef } from "react";
import { Form, Formik } from "formik";
import { createFaculty, updateFaculty } from "../../api/faculty";

const FacultyDialog = ({ open, onCancel, loadData, currentRow }) => {
  const formikRef = useRef();

  const onSubmit = () => {
    formikRef.current.submitForm().then((values) => {
      if (values) {
        if (currentRow.firebaseId) {
          updateFaculty({
            ...values,
          });
          toast.success("Faculty updated successfully");
        } else {
          createFaculty({
            ...values,
          });
          toast.success("Faculty created successfully");
        }
        onCancel();
        loadData();
      }
    });
  };

  return (
    <>
      <Dialog fullWidth open={open} onClose={onCancel}>
        <Box>
          <DialogTitle style={{ paddingBottom: "0px" }}>
            Add Faculty Details
          </DialogTitle>
          <Formik
            innerRef={formikRef}
            initialValues={currentRow}
            onSubmit={(values) => values}
          >
            {(formik) => (
              <Form style={{ padding: "30px", paddingTop: "0px" }}>
                <Grid item xs={12}>
                  <TextField
                    control="input"
                    type="text"
                    label="Faculty Name"
                    name="fname"
                    fullWidth
                    value={formik.values.fname}
                    onChange={formik.handleChange}
                    error={formik.touched.fname && Boolean(formik.errors.fname)}
                    helperText={formik.touched.fname && formik.errors.fname}
                  />
                </Grid>
                <br />
                <Grid item container spacing={2}>
                  <Grid item xs={12} md={12}>
                    <TextField
                      control="input"
                      type="text"
                      label="Qulification"
                      name="qulification"
                      fullWidth
                      value={formik.values.qulification}
                      onChange={formik.handleChange}
                      error={
                        formik.touched.qulification &&
                        Boolean(formik.errors.qulification)
                      }
                      helperText={
                        formik.touched.qulification &&
                        formik.errors.qulification
                      }
                    />
                  </Grid>
                  <br />
                  <Grid item xs={12} md={12}>
                    <TextField
                      control="input"
                      type="number"
                      label="Expirience"
                      name="expirience"
                      fullWidth
                      value={formik.values.expirience}
                      onChange={formik.handleChange}
                      error={
                        formik.touched.expirience &&
                        Boolean(formik.errors.expirience)
                      }
                      helperText={
                        formik.touched.expirience && formik.errors.expirience
                      }
                    />
                  </Grid>
                  <br />
                  <Grid item xs={12} textAlign="left">
                    <TextField
                      control="input"
                      type="text"
                      label="Expertise"
                      name="expertise"
                      fullWidth
                      value={formik.values.expertise}
                      onChange={formik.handleChange}
                      error={
                        formik.touched.expertise &&
                        Boolean(formik.errors.expertise)
                      }
                      helperText={
                        formik.touched.expertise && formik.errors.expertise
                      }
                    />
                  </Grid>
                  <br />
                  <Button onClick={onSubmit} variant="contained" type="submit">
                    Submit
                  </Button>
                </Grid>
              </Form>
            )}
          </Formik>
        </Box>
      </Dialog>
    </>
  );
};

export default FacultyDialog;
