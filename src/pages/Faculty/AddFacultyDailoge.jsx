/* eslint-disable no-unused-vars */
import {
  DialogTitle,
  TextField,
  Button,
  Box,
  Dialog,
  Grid,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  ListItem,
  Typography,
} from "@material-ui/core";
import * as React from "react";
import { useRef } from "react";
import { Form, Formik } from "formik";
import dayjs from "dayjs";
import { createStudent, updateStudent } from "../../api/student";

const FacultyDialog = ({ open, onCancel, loadData, currentRow }) => {
  const formikRef = useRef();
  const onSubmit = () => {
    formikRef.current.submitForm().then((values) => {
      if (values) {
        if (currentRow.firebaseId) {
          updateStudent({
            ...values,
          });
        } else {
          createStudent({
            ...values,
            date: dayjs().format(),
          });
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
                    <Typography>Select Any Branch</Typography>
                    <Select
                      control="select"
                      type="text"
                      label="Branch"
                      name="sbranch"
                      fullWidth
                      value={formik.values.sbranch}
                      onChange={formik.handleChange}
                      error={
                        formik.touched.sbranch && Boolean(formik.errors.sbranch)
                      }
                      helperText={
                        formik.touched.sbranch && formik.errors.sbranch
                      }
                    />
                  </Grid>
                  <br />
                  <Grid item xs={12} md={12}>
                    <Typography>Select Subject</Typography>
                    <Select
                      type="text"
                      name="ssubject"
                      fullWidth
                      value={formik.values.ssubject}
                      onChange={formik.handleChange}
                      error={
                        formik.touched.ssubject &&
                        Boolean(formik.errors.ssubject)
                      }
                      helperText={
                        formik.touched.ssubject && formik.errors.ssubject
                      }
                    />
                  </Grid>
                </Grid>
                <br />
                <Grid item xs={12}>
                  <Typography>Select Any Semester</Typography>
                  <Select
                    type="text"
                    name="ssem"
                    fullWidth
                    value={formik.values.ssem}
                    onChange={formik.handleChange}
                    error={formik.touched.ssem && Boolean(formik.errors.ssem)}
                    helperText={formik.touched.ssem && formik.errors.ssem}
                  />
                </Grid>
                <br />
                <Button onClick={onSubmit} variant="contained" type="submit">
                  Submit
                </Button>
              </Form>
            )}
          </Formik>
        </Box>
      </Dialog>
    </>
  );
};

export default FacultyDialog;
