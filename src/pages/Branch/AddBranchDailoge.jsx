import { Grid, Button, TextField } from "@mui/material";
import { toast } from "react-toastify";
import Modal from "../../common/Modal";
import * as React from "react";
import { useRef, useState } from "react";
import useProgress from "../../hooks/useProgress";
import { Form, Formik } from "formik";
import Loading from "../../common/Loader";
import FormikController from "../../formik/FormikController";
import { createBranch, updateBranch } from "../../api/Branch";

const BranchDailog = ({
  handleClickClose,
  open,
  onCancel,
  loadData,
  currentRow,
}) => {
  const formikRef = useRef();
  const [createNewInvoice, createLoading] = useProgress(createBranch);
  const [updateExistingInvioce, updateLoading] = useProgress(updateBranch);
  const [fieldvalues, setFieldValues] = useState();
  const [totalSem, setTotalSem] = useState();
  console.log({ totalSem });
  console.log(fieldvalues);
  const [counter, setCounter] = useState(0);
  // const [inputValues, setInputValues] = useState();
  // console.log(inputValues);
  const onOk = () => {
    formikRef.current.submitForm().then((values) => {
      if (values) {
        const modifiedValues = {
          ...values,
          tsem: totalSem,
        };
        if (currentRow.firebaseId) {
          updateExistingInvioce(modifiedValues).then(() => {
            toast.success("Branch updated successfully");
            handleClickClose();
          });
        } else {
          createNewInvoice(modifiedValues).then(() => {
            toast.success("Branch created successfully");
            handleClickClose();
          });
        }
      }
    });
  };

  const handleClick = () => {
    setCounter(counter + 1);
  };

  const handleOnChange = (e) => {
    const N = e.target.value;
    setTotalSem(N);
    let arr = [];
    for (let i = 1; i <= e.target.value; i++) {
      arr.push(i);
    }
    setFieldValues(arr);
  };

  return (
    <Modal
      title={currentRow.firebaseId ? "Update Branch" : "Create Branch"}
      fullScreen
      onOk={onOk}
      onCancel={handleClickClose}
      sx={{ minHeight: (createLoading || updateLoading) && "200px" }}
    >
      {createLoading || updateLoading ? (
        <Loading
          title={
            currentRow.firebaseId
              ? "Please wait updating your details..."
              : "Please wait creating your details..."
          }
          top="65%"
        />
      ) : (
        <Grid item xs={10} border="solid" borderRadius="1rem">
          <Formik
            innerRef={formikRef}
            initialValues={currentRow}
            onSubmit={(values) => values}
          >
            {(formik) => (
              <Form>
                <Grid
                  container
                  display="flex"
                  flex-direction="row"
                  padding="1rem"
                >
                  <Grid item container xs={3} align="center" marginRight="1rem">
                    <Grid item>
                      <FormikController
                        control="input"
                        type="text"
                        label="Branch Name"
                        name="bname"
                        value={formik.values.bname}
                        onChange={formik.handleChange}
                        error={
                          formik.touched.bname && Boolean(formik.errors.bname)
                        }
                        helperText={formik.touched.bname && formik.errors.bname}
                      />
                    </Grid>
                    <Grid item xs={12} textAlign="left" paddingTop="1rem">
                      <FormikController
                        control="input"
                        type="number"
                        label="Total Sem"
                        name="tsem"
                        onChange={handleOnChange}
                      />
                    </Grid>
                    <Grid item xs={12} textAlign="left" paddingTop="1rem">
                      <FormikController
                        control="select"
                        type="nember"
                        label="Select Sem For Subject"
                        name="semfsub"
                        fullWidth
                        options={fieldvalues?.map((option) => ({
                          value: option,
                          label: option,
                        }))}
                        value={formik.values.semfsub}
                        onChange={formik.handleChange}
                        error={
                          formik.touched.semfsub &&
                          Boolean(formik.errors.semfsub)
                        }
                        helperText={
                          formik.touched.semfsub && formik.errors.semfsub
                        }
                      />
                    </Grid>
                  </Grid>
                  <Grid item xs={6} borderLeft="4px solid">
                    {typeof fieldvalues === "undefined" ? (
                      <Grid></Grid>
                    ) : (
                      <>
                        <Grid marginLeft="1rem">
                          <Button variant="contained" onClick={handleClick}>
                            + Add Subject
                          </Button>
                        </Grid>
                        <Grid marginLeft="1rem" marginTop="1rem">
                          {Array.from(Array(counter)).map((c, index) => {
                            return (
                              <TextField
                                key={c}
                                className={index}
                                type="text"
                                value={formik.values.tsubname}
                                onChange={formik.handleChange}
                                error={
                                  formik.touched.tsubname &&
                                  Boolean(formik.errors.tsubname)
                                }
                                helperText={
                                  formik.touched.tsubname &&
                                  formik.errors.tsubname
                                }
                              />
                            );
                          })}
                        </Grid>
                      </>
                    )}
                  </Grid>
                </Grid>
              </Form>
            )}
          </Formik>
        </Grid>
      )}
    </Modal>
  );
};

export default BranchDailog;
