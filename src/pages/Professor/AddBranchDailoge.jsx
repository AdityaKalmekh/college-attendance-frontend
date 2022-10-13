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
import { useRef } from "react";
import { Form, Formik } from "formik";
import dayjs from "dayjs";
import { createBranch, updateBranch } from "../../api/Branch";
const BranchDialog = ({ open, onCancel, loadData, currentRow }) => {
  const formikRef = useRef();

  const onSubmit = () => {
    formikRef.current.submitForm().then((values) => {
      if (values) {
        if (currentRow.firebaseId) {
          updateBranch({
            ...values,
          });
        } else {
          createBranch({
            ...values,
            date: dayjs().format(),
          });
        }
        onCancel();
        loadData();
      }
    });
  };

  // $('[name="cand_no"]').on("change", function () {
  //   if (this.value != "") {
  //     var val = parseInt(this.value, 10);

  //     for (var i = 0; i < val; i++) {
  //       var $cloned = $(".template tbody").clone();
  //       $("#studentTable tbody").append($cloned.html());
  //     }
  //   }
  // });

  return (
    <>
      <Dialog fullWidth open={open} onClose={onCancel}>
        <Box>
          <DialogTitle style={{ paddingBottom: "0px" }}>Add Branch</DialogTitle>
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
                    label="Branch Name"
                    name="bname"
                    fullWidth
                    value={formik.values.bname}
                    onChange={formik.handleChange}
                    error={formik.touched.bname && Boolean(formik.errors.bname)}
                    helperText={formik.touched.bname && formik.errors.bname}
                  />
                </Grid>
                <br />
                <Grid item container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <TextField
                      control="input"
                      type="text"
                      label="Total Sem"
                      name="tsem"
                      fullWidth
                      value={formik.values.tsem}
                      onChange={formik.handleChange}
                      error={formik.touched.tsem && Boolean(formik.errors.tsem)}
                      helperText={formik.touched.tsem && formik.errors.tsem}
                    />
                  </Grid>
                  <br />
                </Grid>
                <Button onClick={onSubmit} variant="contained" type="submit">
                  Submit
                </Button>

                <Grid>
                  <p>
                    <label>
                      <strong>No of Candidates</strong>
                    </label>
                    <label>
                      <input
                        name="cand_no"
                        type="text"
                        placeholder="Type Your Number of Candidates"
                      />
                    </label>
                    <div class="clear"></div>
                  </p>
                  <div class="cand_fields">
                    <table id="studentTable" width="630" border="0">
                      <tr>
                        <td>Name</td>
                      </tr>
                      <tr>
                        <td>
                          <input
                            name="cand_name"
                            type="text"
                            placeholder="Name"
                            required="required"
                          />
                        </td>
                      </tr>
                    </table>
                  </div>
                </Grid>
              </Form>
            )}
          </Formik>
        </Box>
      </Dialog>
    </>
  );
};

export default BranchDialog;
