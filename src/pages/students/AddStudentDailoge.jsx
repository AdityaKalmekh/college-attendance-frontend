/* eslint-disable no-unused-vars */
import {
  DialogTitle,
  TextField,
  Button,
  Box,
  Dialog,
  Grid,
} from "@material-ui/core";
import * as React from "react";
import { useRef, useEffect } from "react";
import { Form, Formik } from "formik";
import FormikController from "../../formik/FormikController";
import dayjs from "dayjs";
import { createStudent, updateStudent } from "../../api/student";
import { getbranchName, getSem } from "../../api/Branch";
import { useState } from "react";

const StudentDialog = ({ open, onCancel, loadData, currentRow }) => {
  const [viewBranch, setViewBranch] = useState([]);
  const [viewSem,setSem] = useState([]);
  const [branchData, setBranchData] = useState();
  const [branch, setBranch] = useState();
  console.log({addi: branch});
  const loadBranchData = () => {
    getbranchName().then(setViewBranch);
  };

  useEffect(() => {
    loadBranchData();
  }, []);
  const formikRef = useRef();
  const onSubmit = () => {
    formikRef.current.submitForm().then((values) => {
      console.log(currentRow);
      if (values) {
        if (currentRow.id) {
          console.log("hi");
          updateStudent({
            ...values,
            course: branchData,
          });
        } else {
          createStudent({
            ...values,
            course: branch,
          });
        }
        console.log({values})
        onCancel();
        loadData();
      }
    });
  };

  const branchHandler = (event) => {
    setBranch(event.target.value);
    setBranchData(event.target.value);
    getSem(event.target.value).then(setSem);
    
  }
  console.log({branch});
  // console.log(viewBranch);
  return (
    <>
      <Dialog fullWidth open={open} onClose={onCancel}>
        <Box>
          <DialogTitle style={{ paddingBottom: "0px" }}>
            Add Student Data
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
                    label="First Name"
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
                  <Grid item xs={12} md={6}>
                    <TextField
                      control="input"
                      type="text"
                      label="Middle Name"
                      name="mname"
                      fullWidth
                      value={formik.values.mname}
                      onChange={formik.handleChange}
                      error={
                        formik.touched.mname && Boolean(formik.errors.mname)
                      }
                      helperText={formik.touched.mname && formik.errors.mname}
                    />
                  </Grid>
                  <br />
                  <Grid item xs={12} md={6}>
                    <TextField
                      control="input"
                      type="text"
                      label="SureName"
                      name="sname"
                      fullWidth
                      value={formik.values.sname}
                      onChange={formik.handleChange}
                      error={
                        formik.touched.sname && Boolean(formik.errors.sname)
                      }
                      helperText={formik.touched.sname && formik.errors.sname}
                    />
                  </Grid>
                </Grid>
                <br />
                <Grid item xs={12}>
                  <TextField
                    control="input"
                    type="text"
                    label="Address"
                    name="address"
                    fullWidth
                    value={formik.values.address}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.address && Boolean(formik.errors.address)
                    }
                    helperText={formik.touched.address && formik.errors.address}
                  />
                </Grid>
                <br />
                <Grid item xs={12}>
                  <TextField
                    control="input"
                    type="text"
                    label="Enrollement No"
                    name="enroll"
                    fullWidth
                    value={formik.values.enroll}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.enroll && Boolean(formik.errors.enroll)
                    }
                    helperText={formik.touched.enroll && formik.errors.enroll}
                  />
                </Grid>
                <br />
                <Grid item container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <FormikController
                      sx={{ width: "16rem" }}
                      variant="standard"
                      control="select"
                      type="text"
                      label="Branch"
                      name="branch"
                      fullWidth
                      options={viewBranch?.map((b) => ({
                        value: b,
                        label: b,
                      }))}
                      value={formik.values.course}
                      // onChange={(e) => {
                      //   const branchId = e.target.value;
                      //   setBranchData(
                      //     viewBranch?.find((b) => b.branchname === branchId)
                      //   );

                      //   formik.handleChange(e);
                      // }}
                      onChange = {branchHandler}
                      error={
                        formik.touched.branch && Boolean(formik.errors.branch)
                      }
                      helperText={formik.touched.branch && formik.errors.branch}
                    />
                  </Grid>
                  <br />
                  <Grid item xs={12} md={6}>
                    <FormikController
                      sx={{ width: "16rem" }}
                      variant="standard"
                      control="select"
                      type="nember"
                      label="Semester"
                      name="sem"
                      fullWidth
                      options={viewSem?.map((b) => ({
                        value: b,
                        label: b,
                      }))}
                      value={formik.values.sem}
                      onChange={(e) => {
                        const semId = e.target.value;
                        setBranchData(
                          viewBranch?.find((b) => b.totalSemvalues === semId)
                        );

                        formik.handleChange(e);
                      }}
                      error={formik.touched.sem && Boolean(formik.errors.sem)}
                      helperText={formik.touched.sem && formik.errors.sem}
                    />
                  </Grid>
                  <br />
                </Grid>
                <br />
                <Grid item container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <TextField
                      control="input"
                      type="text"
                      label="Parents Contact"
                      name="pcontact"
                      fullWidth
                      value={formik.values.pcontact}
                      onChange={formik.handleChange}
                      error={
                        formik.touched.pcontact &&
                        Boolean(formik.errors.pcontact)
                      }
                      helperText={
                        formik.touched.pcontact && formik.errors.pcontact
                      }
                    />
                  </Grid>
                  <br />
                  <Grid item xs={12} md={6}>
                    <TextField
                      control="input"
                      type="text"
                      label="Student Contact"
                      name="scontact"
                      fullWidth
                      value={formik.values.scontact}
                      onChange={formik.handleChange}
                      error={
                        formik.touched.scontact &&
                        Boolean(formik.errors.scontact)
                      }
                      helperText={
                        formik.touched.scontact && formik.errors.scontact
                      }
                    />
                  </Grid>
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

export default StudentDialog;
