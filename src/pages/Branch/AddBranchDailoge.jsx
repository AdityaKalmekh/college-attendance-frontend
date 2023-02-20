import { Grid, Button, Typography, TextField } from "@mui/material";
import { toast } from "react-toastify";
import Modal from "../../common/Modal";
import * as React from "react";
import { useRef, useState } from "react";
import useProgress from "../../hooks/useProgress";
import { Form, Formik } from "formik";
import Loading from "../../common/Loader";
import FormikController from "../../formik/FormikController";
import { createBranch, updateBranch } from "../../api/Branch";
// import { Subject } from "@mui/icons-material";

const BranchDailog = ({
  handleClickClose,
  open,
  onCancel,
  loadData,
  currentRow,
}) => {
  const formikRef = useRef();
  const input = useRef();
  const [createNewBranch, createLoading] = useProgress(createBranch);
  const [updateExistingBranch, updateLoading] = useProgress(updateBranch);
  const [totalSemvalues, setTotalSemValues] = useState([]);
  const [branch, setbranch] = useState();
  const [currentsem, setcurrentsem] = useState();
  // const [semesters, setSemesters] = useState([]);
  const [counter, setCounter] = useState([]);
  const [container, setcontainer] = useState([]);
  // const [totalsem, setTotalsem] = useState();
  
  //aditya's branch code 

  let sub = [];
  const [subject,setSubject] = useState([]);
  const [subSem,setSubsem] = useState([]);

  const onOk = () => {
    subSem.forEach((item) => {
      let subjects = []
      subject.forEach((item2) => {
        if (item.sem === item2.sem){
          subjects.push(item2.subject)
        }
      })
      item.subject = subjects
    })
    const branchContainer = {
      branchname : branch,
      semesters : subSem
    }
    console.log(branchContainer);
    // const branchContainer = {
    //   branchname: branch,
    //   totalsem: totalsem,
    //   semesters: semesters,
    //   totalSemvalues: totalSemvalues,
    // };
    // console.log({ branchContainer });
    if (branchContainer) {
      if (currentRow.firebaseId) {
        updateExistingBranch(branchContainer).then(() => {
          toast.success("Branch updated successfully");
          handleClickClose();
        });
      } else {
        createNewBranch(branchContainer).then(() => {
          toast.success("Branch created successfully");
          handleClickClose();
        });
      }
    }
  };
  console.log({
    addBranchOption: totalSemvalues?.map((option) => ({
      value: option,
      label: option,
    })),
  });

  const handleFinalSubmit = () => {
    if (sub.length !== 0){
      setSubject(prev => {
        return [...prev,{"sem":currentsem,"subject":sub[0]}]
      })
    }
    
    // console.log({ finalContainer: container });
    // const filterContainer = container.filter((d) => {
    //   if (!d == undefined) {
    //     return d;
    //   }
    // });
    // console.log({ filterContainer });
    // setSemesters((prev) => {
    //   return [
    //     ...prev,
    //     {
    //       branchname: branch,
    //       sem_name: currentsem,
    //       subject: filterContainer,
    //     },
    //   ];
    // });
    // setcontainer([]);
  };
  // console.log({ semesters });
  console.log(subject);

  const handleClick = () => {
    // subtemp.push({"subject":sub[0],"sem":currentsem});
    if (sub.length !== 0){
      setSubject(prev => {
        return [...prev,{"sem":currentsem,"subject":sub[0]}]
      })
    }
    sub = [];
    if (counter.length === 0) {
      console.log("s2");
      const d = [];
      d.push(0);
      setCounter(d);
    } else {
      const d = counter.length + 1;
      setCounter([...counter, d]);
    }
  };

  const addSubject = (index) => (e) => {
    let subject = e.target.value;
    if (sub.length === 0){
      sub.push(subject)
    }else if (subject.charAt(0) === sub[0].charAt(0)){
      sub.pop();
      sub.push(subject);
    }
    // const containerCopy = [...container];
    // containerCopy[index] = e.target.value;
    // setcontainer(containerCopy);
    // containerCopy?.filter(item => item !== undefined && item !== null)
    // console.log({containerCopy});
  };

  const handleTotalSem = (e) => {
    // setTotalsem(e.target.value);
    let arr = [];
    for (let i = 1; i <= e.target.value; i++) {
      arr.push(i);
      setSubsem(prev => {
        return ([...prev,{"sem":i,"subject":[]}])
      })
    }
    setTotalSemValues(arr);
  };
  // console.log(subSem);

  const handleSelectedSem = (e) => {
    setcurrentsem(e.target.value);
  };

  const branchHandler = (e) => {
    const currentb = e.target.value;
    setbranch(currentb);
  };

  const handleShowandClear = () => {
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
      onOk={onOk}
      fullScreen
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
                  <Grid item container xs={12} md={5}>
                    <Typography>
                      <b>Fill Branch Details</b>
                    </Typography>
                    <Grid item xs={12} md={12} textAlign="left">
                      <FormikController
                        control="input"
                        type="text"
                        label="Branch Name"
                        // name="bname"
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
                        // name="tsem"
                        fullWidth
                        onChange={handleTotalSem}
                      />
                    </Grid>
                    <Grid item xs={12} textAlign="left" paddingTop="1rem">
                      <FormikController
                        control="select"
                        type="nember"
                        label="Select Sem For Subject"
                        fullWidth
                        options={totalSemvalues?.map((option) => ({
                          value: option,
                          label: option,
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
                        {/* {Array.from(Array(counter)).map((c, index) => { */}
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
                      <Button variant="contained" onClick={handleClick}>
                        +
                      </Button>
                      <Button
                        sx={{ marginLeft: "1rem" }}
                        variant="contained"
                        onClick={handleShowandClear}
                      >
                        Reset Subject Field
                      </Button>
                      <Button
                        sx={{ marginLeft: "1rem" }}
                        variant="contained"
                        onClick={handleFinalSubmit}
                      >
                        Add Subject
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
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
            {container?.map((d) => {
              return <Typography>{d}</Typography>;
            })}
          </Grid>
        </Grid>
      )}
    </Modal>
  );
};

export default BranchDailog;