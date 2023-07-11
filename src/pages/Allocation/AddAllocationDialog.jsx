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
  Select,
  MenuItem,
} from "@material-ui/core";
import { toast } from "react-toastify";
import * as React from "react";
import { useRef } from "react";
import { Form, Formik } from "formik";
import FormikController from "../../formik/FormikController";
import { createAllocation, updateAllocation } from "../../api/allocation";
import { getFaculty } from "../../api/faculty";
import { getbranchName, getSem, getSubject, getId, getNonAllocatedSubjects } from "../../api/Branch";
import { useState, useEffect } from "react";
import useHttp from "../../hooks/useHttp";

const AllocationDialog = ({ open, onCancel, loadData, currentRow,addNewAllocation,reloadAfterUpdation }) => {
  const [facultyCollection, setFacultyCollection] = useState([]);
  const [branchCollection, setBranchCollection] = useState([]);
  const [semCollection, setSemCollection] = useState([]);
  const [subjectCollection, setSubjectCollection] = useState([]);
  const [id,setId] = useState();

  const {error,sendRequest : sendTaskRequest} = useHttp();
  
  useEffect(() => {
    sendTaskRequest({url:"/getFaculty",method:"get"},(data)=>{setFacultyCollection(data)})
    sendTaskRequest({url:"/branch",method:"get"},(branch)=>{setBranchCollection(branch)})
    if (currentRow._id !== ""){
      sendTaskRequest({url:`/semester/${currentRow.branch}`,method:"get"},(semester)=>{setSemCollection(semester)})
      sendTaskRequest({url:`/getNonAllocatedSubjects/${currentRow.facultyId}/${currentRow.branch}/${currentRow.semester}/${currentRow.subject}`,method:"get"},(subject)=>{setSubjectCollection(subject)})
      setId(currentRow.facultyId)
    }
  },[sendTaskRequest,currentRow]);
   
  
  const formikRef = useRef();
  const reloadCreateData = (values, id) => {
    if (id){
      addNewAllocation(values)
    }
  }

  const reloadEditData = (values,acknowledgment) => {
    if (acknowledgment){
      reloadAfterUpdation(values)
    }
  }

  const onSubmit = () => {
    formikRef.current.submitForm().then((values) => {
      console.log(values);
      if (values){
        console.log({currentRow});
        if (currentRow._id){  
          sendTaskRequest({
            url : '/editAllocation',
            method :'put',
            data : {...values,facultyId:id}
          },reloadEditData.bind(null,values))
        }else{
          sendTaskRequest({
            url : '/addAllocation',
            method : 'post',
            data : {...values,id:id}
          },reloadCreateData.bind(null,values))
        }
        onCancel()
      }
    });
  };

  if (error){
    console.error(error);
  }

  return (
    <>
      <Dialog fullWidth open={open} onClose={onCancel}>
        <Box>
          <DialogTitle style={{ paddingBottom: "0px" }}>
            Add Faculty Allocation Details
          </DialogTitle>
          <Formik
            innerRef={formikRef}
            initialValues={currentRow}
            onSubmit={(values) => values}
          >
            {(formik) => (
              <Form style={{ padding: "30px", paddingTop: "0px" }}>
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel id="facultyName">Select Faculty</InputLabel>
                    <Select
                      control="select"
                      type="text"
                      name="facultyName"
                      value={formik.values.facultyName}
                      onChange={(e) => {
                        formik.setFieldValue('facultyName',e.target.value)
                        sendTaskRequest({url:`/id/${e.target.value}`,method:"get"},(facultyId)=>{setId(facultyId)})
                      }}
                    >
                      {facultyCollection?.map((d, i) => {
                        return <MenuItem value={d.fname}>{d.fname}</MenuItem>;
                      })}
                    </Select>
                  </FormControl>
                </Grid>
                <br />
                <Grid item container spacing={2}>
                  <Grid item xs={12} md={12}>
                    <FormControl fullWidth>
                      <InputLabel id="branch">Select Branch</InputLabel>
                      <Select
                        control="select"
                        type="text"
                        name="branch"
                        value={formik.values.branch}
                        onChange={(e) =>{
                          formik.setFieldValue('branch',e.target.value)
                          sendTaskRequest({url:`/semester/${e.target.value}`,method:"get"},(semester) => {setSemCollection(semester)})
                        }}
                      >
                        {branchCollection?.map((d) => {
                          return <MenuItem value={d}>{d}</MenuItem>;
                        })}
                      </Select>
                    </FormControl>
                  </Grid>
                  <br />
                  <Grid item xs={12} md={12}>
                    <FormControl fullWidth>
                      <InputLabel id="semester">Select Semester</InputLabel>
                      <Select
                        control="select"
                        type="text"
                        name="semester"
                        value={formik.values.semester}
                        onChange={(e) => {
                          formik.setFieldValue('semester',e.target.value)
                          sendTaskRequest({url:`/subject/${formik.values.branch}/${e.target.value}`,method:"get"},(subject)=>{setSubjectCollection(subject)})
                        }}
                      >
                        {semCollection?.map((d, i) => {
                          return <MenuItem value={d}>{d}</MenuItem>;
                        })}
                      </Select>
                    </FormControl>
                  </Grid>
                  <br />
                  <Grid item xs={12} textAlign="left">
                    <FormControl fullWidth>
                      <InputLabel id="subject">Select Subject</InputLabel>
                      <Select
                        control="select"
                        type="text"
                        name="subject"
                        value={formik.values.subject}
                        onChange={(e) => {
                          formik.setFieldValue("subject",e.target.value);
                        }}
                      >
                        {subjectCollection?.map((d) => {
                          return <MenuItem value={d}>{d}</MenuItem>;
                        })}
                      </Select>
                    </FormControl>
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

export default AllocationDialog;