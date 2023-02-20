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
import { getbranchName, getSem, getSubject, getId, getAllSubjects } from "../../api/Branch";
import { useState, useEffect } from "react";

const AllocationDialog = ({ open, onCancel, loadData, currentRow }) => {
  const [facultyCollection, setFacultyCollection] = useState([]);
  const [branchCollection, setBranchCollection] = useState([]);
  const [semCollection, setSemCollection] = useState([]);
  const [subjectCollection, setSubjectCollection] = useState([]);
  const [allocatedFacuty, setAllocatedFacuty] = useState();
  const [allocatedbranch, setallocatedbranch] = useState();
  const [allocatedSemester, setAllocatedSemester] = useState();
  const [allocatedSubject, setAllocatedsubject] = useState();
  const [id,setId] = useState();
  let fName;
  // console.log({ branchCollection });
  // console.log({facultyCollection});
  console.log({ semCollection });
  console.log({subjectCollection});
  const loadDataForFaculty = () => {
    // setAllocatedFacuty(currentRow.facultyName);
    // setAllocatedFacuty(currentRow.facultyName);
    // setAllocatedSemester(currentRow.semester);
    // setAllocatedsubject(currentRow.subject);
    // setallocatedbranch(currentRow.branch);
    getFaculty().then(setFacultyCollection);
    getbranchName().then(setBranchCollection);
    getSem(currentRow.branch).then(setSemCollection);
    getAllSubjects(currentRow.branch,currentRow.semester).then(setSubjectCollection);
    setId(currentRow.facultyId)
    // getSubject(currentRow.subject).then(setSubjectCollection);
  };

  const editFaculty = () =>{
    setAllocatedFacuty(currentRow.facultyName);
  }
  console.log({subjectCollection});

  useEffect(() => {
    editFaculty()
  },[]);

  useEffect(() => {
    loadDataForFaculty();
  }, []);
  
  const formikRef = useRef();

  const branchHandler = (e) => {
    console.log(e.target.value);
    setallocatedbranch(e.target.value);
    getSem(e.target.value).then(setSemCollection);
  };

  const facultyHandler = (e) => {
    setAllocatedFacuty(e.target.value);
    getId(e.target.value);
  };

  // console.log({ allocatedFacuty });

  const onSubmit = () => {
    formikRef.current.submitForm().then((values) => {
      console.log(values);
      if (values) {
        if (currentRow.id) {
          updateAllocation({...values,facultyId : id})
          toast.success("Faculty Allocation updated successfully");
        } else {
          createAllocation({
            ...values,
            id : id
          });
          toast.success("Faculty Allocation created successfully");
        }
        onCancel();
        loadData();
      }
    });
  };
  console.log(currentRow);
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
                      // labelId="fname"
                      id="facultyName"
                      // option={facultyCollection}
                      // defaultValue={facultyCollection[0]}
                      // value={formik.values.facultyName}
                      value={formik.values.facultyName}
                      onChange={(e) => {
                        formik.values.facultyName = e.target.value
                        setAllocatedFacuty(e.target.value);
                        getId(e.target.value).then(setId);
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
                        labelId="branch"
                        id="branch"
                        value={formik.values.branch}
                        onChange={(e) =>{
                          formik.values.branch = e.target.value
                          setallocatedbranch(e.target.value);
                          getSem(e.target.value).then(setSemCollection);
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
                        id="semester"
                        value={formik.values.semester}
                        onChange={(e) => {
                          formik.values.semester = e.target.value
                          setAllocatedSemester(e.target.value)
                            getSubject(allocatedbranch,e.target.value).then(setSubjectCollection);
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
                      <InputLabel id="fname">Select Subject</InputLabel>
                      <Select
                        labelId="fname"
                        id="subject"
                        value={formik.values.subject}
                        onChange={(e) => {
                          formik.values.subject = e.target.value
                          console.log(e.target.value);
                          setAllocatedsubject(e.target.value);
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