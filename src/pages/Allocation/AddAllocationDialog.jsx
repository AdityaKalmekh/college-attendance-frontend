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
import FormikController from "../../formik/FormikController";
import { createAllocation, updateAllocation } from "../../api/allocation";
import { getFaculty } from "../../api/faculty";
import { getbranchName,getSem,getSubject,getId } from "../../api/Branch";
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
  console.log({ branchCollection });
  console.log({ facultyCollection });

  const loadDataForFaculty = () => {
    getFaculty().then(setFacultyCollection);
    getbranchName().then(setBranchCollection);
    getSem(currentRow.branch).then(setSemCollection);
  };

  useEffect(() => {
    loadDataForFaculty();
  }, []);

  
  const formikRef = useRef();

  const branchHandler = (e) => {
    setallocatedbranch(e.target.value);
    getSem(e.target.value).then(setSemCollection);
  }

  const semHandler = (e) => {
    setAllocatedSemester(e.target.value);
    getSubject(e.target.value).then(setSubjectCollection);
  }

  const facultyHandler = (e) => {
    setAllocatedFacuty(e.target.value);
    getId(e.target.value);
  }

  console.log({allocatedFacuty});
  const onSubmit = () => {
    formikRef.current.submitForm().then((values) => {
      if (values) {
        console.log(values);
        console.log(currentRow);
        if (currentRow.id) {
          updateAllocation({  
            ...values,
            facultyName : allocatedFacuty,
            branch : allocatedbranch,
            semester : allocatedSemester,
            subject : allocatedSubject            
          });
          toast.success("Faculty Allocation updated successfully");
        } else {
          createAllocation({
            ...values,
            facultyName : allocatedFacuty,
            branch : allocatedbranch,
            semester : allocatedSemester,
            subject : allocatedSubject
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
                  <FormikController
                    control="select"
                    type="text"
                    label="Faculty"
                    name="product"
                    fullWidth
                    options={facultyCollection.map((f) => {
                      return {
                        value: f.fname,
                        label: f.fname,
                      };
                    })}
                    value={formik.values.product}
                    // onChange={(e) => {
                    //   const productId = e.target.value;
                    //   setAllocatedFacuty(
                    //     facultyCollection.find(
                    //       (product) => product.product === productId
                    //     )
                    //   );
                    //   formik.handleChange(e);
                    // }}
                    onChange = {facultyHandler}
                    error={
                      formik.touched.product && Boolean(formik.errors.product)
                    }
                    helperText={formik.touched.product && formik.errors.product}
                  />
                </Grid>
                <br />
                <Grid item container spacing={2}>
                  <Grid item xs={12} md={12}>
                    <FormikController
                      control="select"
                      type="text"
                      label="Branch"
                      name="product"
                      fullWidth
                      options={branchCollection.map((product) => {
                        return {
                          value: product,
                          label: product,
                        };
                      })}
                      value={formik.values.product}
                      // onChange={(e) => {
                      //   const productId = e.target.value;
                      //   setallocatedbranch(
                      //     facultyCollection.find(
                      //       (product) => product.product === productId
                      //     )
                      //   );

                      //   formik.handleChange(e);
                      // }}
                      onChange = {branchHandler}
                      error={
                        formik.touched.product && Boolean(formik.errors.product)
                      }
                      helperText={
                        formik.touched.product && formik.errors.product
                      }
                    />
                  </Grid>
                  <br />
                  <Grid item xs={12} md={12}>
                    <FormControl fullWidth>
                      <InputLabel id="fname">Select Faculty</InputLabel>
                      <Select
                        labelId="fname"
                        id="fname"
                        value={allocatedFacuty}
                        label="Age"
                        onChange={(e) => {
                          setAllocatedFacuty(e.target.value);
                        }}
                      >
                        {facultyCollection?.map((d, i) => {
                          return <MenuItem value={i}>{d.fname}</MenuItem>;
                        })}
                      </Select>
                    </FormControl>
                  </Grid>
                  <br />
                  <Grid item xs={12} textAlign="left">
                    <FormikController
                      control="select"
                      type="text"
                      label="Subject"
                      name="product"
                      fullWidth
                      options={semCollection.map((product) => {
                        return {
                          value: product,
                          label: product,
                        };
                      })}
                      value={formik.values.product}
                      onChange={(e) => {
                        const productId = e.target.value;
                        setAllocatedsubject(
                          facultyCollection.find(
                            (product) => product.product === productId
                          )
                        );

                        formik.handleChange(e);
                      }}
                      error={
                        formik.touched.product && Boolean(formik.errors.product)
                      }
                      helperText={
                        formik.touched.product && formik.errors.product
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

export default AllocationDialog;
