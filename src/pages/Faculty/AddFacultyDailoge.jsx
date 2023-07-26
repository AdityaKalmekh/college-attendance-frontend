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
import useHttp from "../../hooks/useHttp";

const FacultyDialog = ({ open, onCancel, currentRow, reloadNewData, reloadAfterUpdation }) => {
  const formikRef = useRef();
  const {error,sendRequest : sendTaskRequest} = useHttp();

  const reloadCreateData = (values, id) => {
    if (id){
      toast.success("Added Successfully");
      reloadNewData({...values,_id:id},id);
    }else{
      toast.error(id);
    }
  }

  const reloadEditData = (values,acknowledgment) => {
    if (acknowledgment){
      toast.success("Updated Successfully");
      reloadAfterUpdation(values);
    }else{
      toast.error(acknowledgment);
    }
  }

  const onSubmit = () => {
    formikRef.current.submitForm().then((values) => {
      if (values){
        if (currentRow._id){
          sendTaskRequest({
            url : "/editFaculty",
            method : "put",
            data : values
          },reloadEditData.bind(null,values))
        }else{
          sendTaskRequest({
            url : "/checkEmail",
            method : "post",
            data : {"email": values.email}
          }, (data) => {if (data){
            toast.error("Email already exists")
          }else{
            sendTaskRequest({
              url : "/addFaculty",
              method : "post",
              data : values
            },reloadCreateData.bind(null,values))
          }})
        }
        onCancel();
      }
    });
  };

  if (error){
    toast.error(error);
  }

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
                      label="Experience"
                      name="experience"
                      fullWidth
                      value={formik.values.experience}
                      onChange={formik.handleChange}
                      error={
                        formik.touched.experience &&
                        Boolean(formik.errors.experience)
                      }
                      helperText={
                        formik.touched.experience && formik.errors.experience
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
                  <Grid item xs={12} textAlign="left">
                    <TextField
                      control="input"
                      type="text"
                      label="Email"
                      name="email"
                      fullWidth
                      value={formik.values.email}
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
                  <br/>
                  <Grid item xs={12} textAlign="left">
                    <TextField
                      control="input"
                      type="text"
                      label="Password"
                      name="password"
                      fullWidth
                      value={formik.values.password}
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