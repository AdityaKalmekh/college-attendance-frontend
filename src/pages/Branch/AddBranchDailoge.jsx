/* eslint-disable no-unused-vars */
import {
  DialogTitle,
  TextField,
  Button,
  Box,
  Dialog,
  Grid,
  Select,
} from "@material-ui/core";
import * as React from "react";
import { useRef, useState } from "react";
import { Form, Formik } from "formik";
import { createStudent, updateStudent } from "../../api/student";
import { MenuItem } from "@mui/material";

const BranchDailog = ({ open, onCancel, loadData, currentRow }) => {
  const formikRef = useRef();
  const [fieldvalues, setFieldValues] = useState([{}]);
  console.log({ fieldvalues });
  const [counter, setCounter] = useState(0);
  const [inputValues, setInputValues] = useState();
  const onSubmit = () => {
    formikRef.current.submitForm().then((values) => {
      if (values) {
        if (currentRow.firebaseId) {
          updateStudent({
            ...values,
          });
        } else {
          createStudent({});
        }
        onCancel();
        loadData();
      }
    });
  };

  const handleClick = () => {
    setCounter(counter + 1);
  };

  const handleOnChange = (e) => {
    let arr = [];
    for (let i = 1; i <= e.target.value; i++) {
      arr.push(i);
      console.log(i);
    }
    console.log(arr);
    setFieldValues(arr);
  };

  return (
    <>
      <Dialog fullWidth open={open} onClose={onCancel}>
        <Box>
          <DialogTitle style={{ paddingBottom: "0px" }}>
            Add Branch Details
          </DialogTitle>
          <Formik
            innerRef={formikRef}
            initialValues={currentRow}
            onSubmit={(values) => values}
          >
            {(formik) => (
              <Form style={{ padding: "30px", paddingTop: "0px" }}>
                <Grid item container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <TextField
                      control="input"
                      type="text"
                      label="Branch Name"
                      name="bname"
                      fullWidth
                      value={formik.values.bname}
                      onChange={formik.handleChange}
                      error={
                        formik.touched.bname && Boolean(formik.errors.bname)
                      }
                      helperText={formik.touched.bname && formik.errors.bname}
                    />
                  </Grid>
                  <br />
                  <Grid item xs={12} md={6}>
                    <TextField
                      control="input"
                      type="text"
                      label="Total Sem"
                      name="tsem"
                      fullWidth
                      // value={fieldvalues}
                      onChange={handleOnChange}
                      // error={formik.touched.tsem && Boolean(formik.errors.tsem)}
                      // helperText={formik.touched.tsem && formik.errors.tsem}
                    />
                  </Grid>
                  <br />
                  <Grid item xs={12} md={6}>
                    <Select
                      label="Total Subject"
                      name="tsub"
                      fullWidth
                      value={formik.values.tsub}
                      onChange={formik.handleChange}
                      error={formik.touched.tsub && Boolean(formik.errors.tsub)}
                      helperText={formik.touched.tsub && formik.errors.tsub}
                    >
                      {/* {fieldvalues?.slice().map((option) => {
                        console.log(option);
                        return <MenuItem key={option}>{option}</MenuItem>;
                      })} */}
                      <MenuItem>{fieldvalues}</MenuItem>
                    </Select>
                  </Grid>
                  <br />
                  <Grid item md={12} xs={12}>
                    <Box sx={{ border: "2px solid black" }}>
                      <Button variant="contained" onClick={handleClick}>
                        + Add Subject
                      </Button>
                      {Array.from(Array(counter)).map((c, index) => {
                        return (
                          <TextField
                            // onChange={handleOnChange}
                            key={c}
                            className={index}
                            type="text"
                            value={formik.values.tsubname}
                            onChange={formik.handleChange}
                            error={
                              formik.touched.tsem &&
                              Boolean(formik.errors.tsubname)
                            }
                            helperText={
                              formik.touched.tsem && formik.errors.tsubname
                            }
                          />
                        );
                      })}
                    </Box>
                  </Grid>
                </Grid>
                <br />
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

export default BranchDailog;
