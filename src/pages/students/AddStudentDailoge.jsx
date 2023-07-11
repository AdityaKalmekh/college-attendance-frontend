/* eslint-disable no-unused-vars */
import {
  DialogTitle,
  TextField,
  Button,
  Box,
  Dialog,
  Grid,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@material-ui/core";
import * as React from "react";
import { useRef, useEffect } from "react";
import { Form, Formik } from "formik";
import { createStudent, updateStudent } from "../../api/student";
import { getbranchName, getSem } from "../../api/Branch";
import { useState } from "react";
import useHttp from "../../hooks/useHttp";
import { async } from "@firebase/util";
import { PropaneSharp } from "@mui/icons-material";
import FormikController from "../../formik/FormikController";

const StudentDialog = ({ open, onCancel, loadData, currentRow,addGetNewStudent,resetAfterUpdation }) => {
  const [viewBranch, setViewBranch] = useState([]);
  const [viewSem, setSem] = useState([]);
  const {error,sendRequest: sendTaskRequest} = useHttp();
  
  useEffect(() => {
    sendTaskRequest({url:"/branch",method:"get"},(branch)=>{setViewBranch(branch)})
    if (currentRow._id !== ""){
      sendTaskRequest({url:`/semester/${currentRow.course}`,method:"get"},(semester)=>setSem(semester))
    }
  },[sendTaskRequest,currentRow]);

  const reloadCreateData = (values, id) => {
    if (id){
      addGetNewStudent({...values,_id:id})
    }
  }

  const reloadEditData = (values,acknowledgment) => {
    if (acknowledgment){
      resetAfterUpdation(values,acknowledgment)
    }
  }

  const formikRef = useRef();

  const onSubmit = () => {
    formikRef.current.submitForm().then((values) => {
      console.log({values});
      console.log({currentRow});
      if (values) {
        if (currentRow._id) {
          sendTaskRequest({
            url: '/editStudent',
            method: 'put',
            data : values
          },reloadEditData.bind(null,values))
        } else {
          sendTaskRequest({
            url : '/addStudents',
            method : 'post',
            data : values
          },reloadCreateData.bind(null,values));
        }
        onCancel();
      }
    });
  };

  if (error){
    console.log(error);
  }

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
                    <FormControl fullWidth>
                      <InputLabel id="branch">Select Branch</InputLabel>
                      <Select
                        control = "select"
                        type = "text"
                        name = "course"
                        value={formik.values.course}
                        onChange={(e) =>{
                          formik.setFieldValue('course',e.target.value)
                          sendTaskRequest({url:`/semester/${e.target.value}`,method:"get"},(semester)=>setSem(semester))
                          // getSem(e.target.value).then(setSem);
                        }}>
                        {viewBranch?.map((d) => {
                          return <MenuItem value={d}>{d}</MenuItem>;
                        })}
                      </Select>
                      {/* </FormikController> */}
                    </FormControl>
                  </Grid>
                  <br />
                  <Grid item xs={12} md={6}>
                    <FormControl fullWidth>
                      <InputLabel id="sem">Select Semester</InputLabel>
                      <Select
                        control="select"
                        type="text"
                        name="sem"
                        value={formik.values.sem}
                        onChange={(e) => {
                          formik.setFieldValue('sem',e.target.value)
                        }}
                      >
                        {viewSem?.map((d) => {
                          return <MenuItem value={d}>{d}</MenuItem>;
                        })}
                      </Select>
                    </FormControl>
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