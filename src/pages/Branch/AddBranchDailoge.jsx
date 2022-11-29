import { Grid, Button, Typography } from "@mui/material";
import { toast } from "react-toastify";
import Modal from "../../common/Modal";
import * as React from "react";
import { useRef, useState, useEffect } from "react";
import useProgress from "../../hooks/useProgress";
import { Form, Formik } from "formik";
import Loading from "../../common/Loader";
import FormikController from "../../formik/FormikController";
import { createBranch, updateBranch } from "../../api/Branch";
// import AddMultipalSubjet from "./AddMultipalSubject";
import { getSubject } from "../../api/Subject";

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
  const [fieldvalues, setFieldValues] = useState([]);
  const [branch, setbranch] = useState();
  const [currentsem, setcurrentsem] = useState();
  const [openForSub, setOpenForSub] = useState(false);
  const [showSubject, setshowSubject] = useState();
  const names = showSubject?.map((item) => item.container);
  console.log(names);
  const loadDataForSubject = () => {
    getSubject().then(setshowSubject);
  };

  useEffect(() => {
    loadDataForSubject();
  }, []);

  const handleClickOpenForSub = () => {
    // setCurrentRow(initialValues);
    setOpenForSub(true);
  };

  const onOk = () => {
    const branchContainer = {
      branch_name: branch,
      // semesters: semesters,
    };
    if (branchContainer) {
      createNewInvoice(branchContainer).then(() => {
        toast.success("Branch created successfully");
        handleClickClose();
      });
    }
  };

  const handleOnChange = (e) => {
    let arr = [];
    for (let i = 1; i <= e.target.value; i++) {
      arr.push(i);
    }
    setFieldValues(arr);
  };

  const semhandler = (e) => {
    setcurrentsem(e.target.value);
  };

  const branchHandler = (e) => {
    const currentb = e.target.value;
    setbranch(currentb);
  };

  return (
    <Modal
      title={currentRow._id ? "Update Branch" : "Create Branch"}
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
                  padding=".5rem"
                  margin="1rem"
                >
                  <Grid item container xs={12} md={6}>
                    <Grid item xs={12} md={12} textAlign="left">
                      <FormikController
                        control="input"
                        type="text"
                        label="Branch Name"
                        name="bname"
                        fullWidth
                        value={branch}
                        onChange={branchHandler}
                      />
                    </Grid>
                    <Grid item xs={12} textAlign="left" paddingTop="1rem">
                      <FormikController
                        control="input"
                        type="number"
                        label="Total Sem"
                        name="tsem"
                        fullWidth
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
                        onChange={semhandler}
                      />
                    </Grid>
                    <br />
                    <Grid paddingTop="1rem">
                      <Button
                        onClick={handleClickOpenForSub}
                        variant="contained"
                        sx={{ margin: "10px" }}
                      >
                        + Add Subject
                      </Button>
                    </Grid>
                  </Grid>
                  <Grid
                    borderLeft="3px solid black"
                    marginLeft="1rem"
                    marginRight="1rem"
                  ></Grid>
                  <Grid>
                    <Typography>Data</Typography>
                    {/* {names?.map((data, index) => {
                      return <Typography>{(...data, index)}</Typography>;
                    })} */}
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
