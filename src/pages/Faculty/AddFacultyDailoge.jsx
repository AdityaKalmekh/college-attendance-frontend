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
import { addFaculty } from "../../api/faculty";
import { getFacultyBranch,getFacultySem,getFacultySubject } from "../../api/faculty";
import { useState } from "react";
import FormikController from "../../formik/FormikController";

const FacultyDialog = ({ open, onCancel, loadData, currentRow }) => {

  const formikRef = useRef();
  const [branchName,setBranchName] = useState([]);
  const [semArray,setSemArray] = useState([]);
  const [bname,setbname] =  useState();
  const [subjects,setSubjects] = useState([]);

  const onSubmit = () => {
    formikRef.current.submitForm().then((values) => {
      if (values) {
        if (currentRow.firebaseId) {
          // updateStudent({
          //   ...values,
          // });
        } else {
          addFaculty({
            ...values,
          });
        }
        onCancel();
        loadData();
      }
    });
  };

  const loadBranchName = () =>{
    getFacultyBranch().then(setBranchName);
  }
  console.log(branchName);

  React.useEffect(() =>{
    loadBranchName();
  },[])

  const branchNameHandler = (e) => {
    setbname(e.target.value);
    getFacultySem(e.target.value).then(setSemArray);
  }

  const semesterHandler = (e) => {
    getFacultySubject(bname,e.target.value).then(setSubjects);
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
                    <Typography>Select Any Branch</Typography>
                    <FormikController
                      control="select"
                      type="text"
                      label="Branch"
                      // name="sbranch"
                      fullWidth
                      options={branchName?.map((option) => ({
                        value: option,
                        label: option,
                      }))}
                      onChange={branchNameHandler}
                    
                    />
                  </Grid>
                  <br />
                  <Grid item xs={12} md={12}>
                    <Typography>Select Semester</Typography>
                    <FormikController
                      control="select"
                      type="text"
                      fullWidth
                      options={semArray?.map((option) => ({
                        value: option,
                        label: option,
                      }))}
                      onChange={semesterHandler}
                    />
                  </Grid>
                </Grid>
                <br />
                <Grid item xs={12}>
                  <Typography>Select Subject</Typography>
                  <FormikController
                    control="select"
                    type="text"
                    name="ssem"
                    fullWidth
                    options={subjects?.map((option) => ({
                      value: option,
                      label: option,
                    }))}
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
