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
  const [fieldvalues, setFieldValues] = useState([]);
  const [counter, setCounter] = useState(0);
  const [subject, setsubject] = useState([]);
  const [branch,setbranch] = useState();
  const [currentsem, setcurrentsem] = useState();
  const [subsem,setsubsem] = useState({});
  console.log(subsem);

  const onOk = () => {
    const branchContainer = {
      [branch] : subsem
    }
    console.log(branchContainer);
    console.log(branchContainer); 
    if (branchContainer){
      createNewInvoice(branchContainer).then(() =>{
        toast.success("Branch created successfully");
        handleClickClose();
      })
    }
    // formikRef.current.submitForm().then((values) => {
    //   if (values) {
    //     const modifiedValues = {
    //       ...values,
    //       tsem: totalSem,
    //     };
    //     if (currentRow.firebaseId) {
    //       updateExistingInvioce(modifiedValues).then(() => {
    //         toast.success("Branch updated successfully");
    //         handleClickClose();
    //       });
    //     } else {
    //       createNewInvoice(modifiedValues).then(() => {
    //         toast.success("Branch created successfully");
    //         handleClickClose();
    //       });
    //     }
    //   }
    // });
  };

  const handleClick = () => {
    // container[0].setTotalSem = setTotalSem.map(({subject})=>{
    //   let obj = {subject};
    //   return obj;
    // })
    // console.log(container);
    setCounter(counter + 1);
  };

  const handleOnChange = (e) => {
    let arr = [];
    for (let i = 1; i <= e.target.value; i++) {
      arr.push(i);
      setsubsem(prev =>{
        return {...prev,[i] : "null"}});
    }
    setFieldValues(arr);
  };
  
  // console.log(bsubsem);
  // for (const[key,value] of Object.entries(subsem)){
  //   console.log(key,value);
  // }
  // console.log(subsem);
  const semhandler = (e) =>{
    console.log(e.target.value);
    setcurrentsem(e.target.value);
    if (currentsem >= 1){
      setsubsem(prev =>{
        return {
          ...prev,
          [currentsem] : subject
        }
      })
    }  
    setsubject([]);
  }

  const addSubject = (e) => {
    console.log(e.target.value);
    setsubject(...subject,e.target.value);
  }

  const branchHandler = (e) => {
    const currentb = e.target.value;
    setbranch(currentb);
  }

  // const addmap = (e) =>{
  //   setbsubsem(prev =>{
  //     return {...prev,[branch]: subsem}
  //   })
  // }
  
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
                        value={branch}
                        onChange={branchHandler}
                        // error={
                        //   formik.touched.bname && Boolean(formik.errors.bname)
                        // }
                        // helperText={formik.touched.bname && formik.errors.bname}
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
                        onChange={semhandler}
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
                          {/* <Button variant="contained" onClick={addmap}>
                            + Add Subject
                          </Button> */}
                        </Grid>
                        <Grid marginLeft="1rem" marginTop="1rem">
                          {Array.from(Array(counter)).map((c, index) => {
                            return (
                              <TextField
                                key={c}
                                className={index}
                                type="text"
                                onChange={addSubject}
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
