import { Grid, Button, Typography, TextField } from "@mui/material";
import { toast } from "react-toastify";
import Modal from "../../common/Modal";
import * as React from "react";
import { useRef, useState} from "react";
import { Form, Formik,FieldArray } from "formik";
import FormikController from "../../formik/FormikController";
import useHttp from "../../hooks/useHttp";

const BranchDailog = ({
  handleClickClose,
  open,
  onCancel,
  loadData,
  currentRow,
  addNewBranch  
}) => {
  const formikRef = useRef();
  const input = useRef();
  const [currentsem, setcurrentsem] = useState();
  const [counter, setCounter] = useState([]);
  const {error, sendRequest : sendTaskRequest} = useHttp();

  let sub = [];

  const reloadCreateData = (values,id) => {
    if (id){
      addNewBranch({...values,_id:id});
      toast.success("Record Added Successfully");
    }
  }

  if (error){
    toast.error({error:error})
  }
  
  const onSubmit = () => {
    formikRef.current.submitForm().then((values) => {
      if (values){
        if (currentRow._id){

        }else{
          sendTaskRequest({
            url : "/addBranch",
            method : "post",
            data : values
          },reloadCreateData.bind(null,values))
          handleClickClose();
        }
      }
    })
  }

  const addSubject = (index) => (e) => {
    let subject = e.target.value;
    if (sub.length === 0){
      sub.push(subject)
    }else if (subject.charAt(0) === sub[0].charAt(0)){
      sub.pop();
      sub.push(subject);
    }
  };
  
  const handleSelectedSem = (e) => {
    setcurrentsem(e.target.value);
  };

  const deletedInput2 = (index) => {
    const d = [...counter];
    d[index] = -111;
    console.log({ deleted: d });
    setCounter(d);
  };

  return (
    <Modal
      title={currentRow._id ? "Update Branch" : "Create Branch"}
      onOk={onSubmit}
      fullScreen
      onCancel={handleClickClose}
    >
       (
        <Grid item xs={10} border="solid" borderRadius="1rem">
          <Formik
            innerRef={formikRef}
            initialValues={currentRow}
            onSubmit={(values) => values}
          >
            {(formik) => (
              <Form>
                <FieldArray
                name="semesters"
                render={arrayHelpers => (
                <Grid
                  container
                  display="flex"
                  flex-direction="row"
                  padding=".5rem"
                  margin="1rem"
                >
                  <Grid item container xs={12} md={5}>
                    <Typography>
                      <b>Fill Branch Details</b>
                    </Typography>
                    <Grid item xs={12} md={12} textAlign="left">
                      <FormikController
                        control="input"
                        type="text"
                        label="Branch Name"
                        name="branchname"
                        fullWidth
                        value={formik.values.branchname}
                        onChange={formik.handleChange}
                      />
                    </Grid>
                    <Grid item xs={12} textAlign="left" paddingTop="1rem">
                      <FormikController
                        control="input"
                        type="number"
                        label="Total Sem"
                        // name="tsem"
                        value={formik.values.semesters.length > 0 ? formik.values.semesters.length: null}
                        fullWidth
                        onChange={(e) => {
                          for (let i = 1; i <= e.target.value; i++) {
                            arrayHelpers.push({"sem":i,"subject":[]})
                          }
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} textAlign="left" paddingTop="1rem">
                      <FormikController
                        control="select"
                        type="nember"
                        label="Select Sem For Subject"
                        fullWidth
                        options={formik.values.semesters.map((option) => ({
                          value: option.sem,
                          label: option.sem,
                        }))}
                        onChange={handleSelectedSem}
                      />
                    </Grid>
                  </Grid>
                  <Grid
                    item
                    md={0.5}
                    borderRight="3px solid black"
                    marginRight="1.5rem"
                  ></Grid>
                  <Grid
                    item
                    container
                    xs={12}
                    md={6}
                    display="flex"
                    flexDirection="column"
                  >
                    <Typography>
                      <b>Add Subject For Semester:</b> {currentsem}
                    </Typography>
                    <form ref={input}>
                      <Grid item md={6}>
                        {counter.length > 0
                          ? counter?.map((c, index) => {
                              if (c === -111) {
                                return null;
                              }
                              return (
                                <div>
                                  <TextField
                                    // id={`id${index}`}
                                    // ref={input}
                                    fullWidth
                                    sx={{
                                      marginTop: "1rem",
                                      marginLeft: ".5rem",
                                    }}
                                    key={c}
                                    className={index}
                                    type="text"
                                    onChange={addSubject(index)}
                                  />
                                  <Button
                                    sx={{ margin: "1rem" }}
                                    size="small"
                                    variant="contained"
                                    onClick={() => {
                                      deletedInput2(index);
                                    }}
                                  >
                                    delete
                                  </Button>
                                </div>
                              );
                            })
                          : null}
                      </Grid>
                    </form>

                    <Grid item sx={{ paddingTop: ".5rem" }}>
                      <Button variant="contained" onClick={() => {
                        if (sub.length !== 0){
                          formik.values.semesters[currentsem-1].subject.push(sub[0])
                        }
                        sub = [];
                        if (counter.length === 0) {
                          const d = [];
                          d.push(0);
                          setCounter(d);
                        } else {
                          const d = counter.length + 1;
                          setCounter([...counter, d]);
                        }
                      }}>
                        +
                      </Button>
                      <Button
                        sx={{ marginLeft: "1rem" }}
                        variant="contained"
                        onClick={() =>{
                          if (sub.length !== 0){
                            formik.values.semesters[currentsem-1].subject.push(sub[0])
                            sub = []
                          }
                          let clr = [...counter];
                          input.current.reset();
                          clr.forEach((d, i) => {
                            // eslint-disable-next-line eqeqeq
                            if (d == -111) {
                            } else {
                              clr[i] = -111;
                            }
                          });
                          setCounter(clr);
                        }}
                      >
                      Save Subject for sem {currentsem}
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
                )}
              />
            </Form>
            )}
          </Formik>
          <Grid margin="1rem" borderTop="3px solid black"></Grid>
          <Grid
            container
            display="flex"
            padding=".5rem"
            margin="1rem"
            flexDirection="column"
          >
            <Typography>
              <h3>Field Semester {currentsem} subjects:</h3>
            </Typography>
          </Grid>
        </Grid>
      )
    </Modal>
  );
};
export default BranchDailog;