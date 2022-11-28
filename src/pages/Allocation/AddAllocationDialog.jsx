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
import { getBranch } from "../../api/Branch";
import { useState, useEffect } from "react";

const AllocationDialog = ({ open, onCancel, loadData, currentRow }) => {
  const [facultyCollection, setFacultyCollection] = useState([]);
  const [branchCollection, setBranchCollection] = useState([]);
  const [allocatedFacuty, setAllocatedFacuty] = useState();
  const [allocatedbranch, setallocatedbranch] = useState();
  const [allocatedSemester, setAllocatedSemester] = useState();
  const [allocatedSubject, setAllocatedsubject] = useState();
  console.log({ branchCollection });
  console.log({ facultyCollection });
  const loadDataForFaculty = () => {
    getFaculty().then(setFacultyCollection);
  };

  useEffect(() => {
    loadDataForFaculty();
  }, []);

  const loadDataForBranch = () => {
    getBranch().then(setBranchCollection);
  };

  useEffect(() => {
    loadDataForBranch();
  }, []);

  const formikRef = useRef();

  const onSubmit = () => {
    formikRef.current.submitForm().then((values) => {
      if (values) {
        if (currentRow.firebaseId) {
          createAllocation({
            ...values,
            allocatedFacuty,
          });
          toast.success("Faculty Allocation updated successfully");
        } else {
          updateAllocation({
            ...values,
            allocatedFacuty,
          });
          toast.success("Faculty Allocation created successfully");
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
                    label="Product*"
                    name="product"
                    fullWidth
                    options={facultyCollection.map((f) => {
                      return {
                        value: f.fname,
                        label: f.fname,
                      };
                    })}
                    value={formik.values.product}
                    onChange={(e) => {
                      const productId = e.target.value;
                      setAllocatedFacuty(
                        facultyCollection.find(
                          (product) => product.product === productId
                        )
                      );

                      formik.handleChange(e);
                    }}
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
                      label="Product*"
                      name="product"
                      fullWidth
                      options={facultyCollection.map((product) => {
                        return {
                          value: product.product,
                          label: product.product,
                        };
                      })}
                      value={formik.values.product}
                      onChange={(e) => {
                        const productId = e.target.value;
                        setallocatedbranch(
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
                  <Grid item xs={12} md={12}>
                    <FormikController
                      control="select"
                      type="text"
                      label="Product*"
                      name="product"
                      fullWidth
                      options={facultyCollection.map((product) => {
                        return {
                          value: product.product,
                          label: product.product,
                        };
                      })}
                      value={formik.values.product}
                      onChange={(e) => {
                        const productId = e.target.value;
                        setAllocatedSemester(
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
                  <Grid item xs={12} textAlign="left">
                    <FormikController
                      control="select"
                      type="text"
                      label="Product*"
                      name="product"
                      fullWidth
                      options={facultyCollection.map((product) => {
                        return {
                          value: product.product,
                          label: product.product,
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
