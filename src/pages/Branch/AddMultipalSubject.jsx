import { Grid, Button, TextField, Typography } from "@mui/material";
import Modal from "../../common/Modal";
import * as React from "react";
import { useRef, useState } from "react";
import { Form, Formik } from "formik";
import Loading from "../../common/Loader";
import useProgress from "../../hooks/useProgress";
import { toast } from "react-toastify";
import { createSubject } from "../../api/Subject";

const DialogForSubjects = ({ handleClickClose, currentRow, currentsem }) => {
  const formikRef = useRef();
  const [createNewSubject, createLoading] = useProgress(createSubject);
  // const [updateExistingSubject, updateLoading] = useProgress(updateSubject);
  const [counter, setCounter] = useState(0);
  const [container, setcontainer] = useState([]);
  console.log(container);
  const onOk = () => {
    if (container) {
      createNewSubject(container).then(() => {
        toast.success("Subject Added successfully");
        handleClickClose();
      });
    }
  };

  const handleClick = () => {
    setCounter(counter + 1);
  };

  const addSubject = (index) => (e) => {
    const containerCopy = [...container];
    containerCopy[index] = e.target.value;
    setcontainer(containerCopy);
  };
  return (
    <Modal
      title={currentRow._id ? "Update Subject" : "Create Subject"}
      onOk={onOk}
      onCancel={handleClickClose}
      sx={{ minHeight: createLoading && "200px" }}
    >
      {createLoading ? (
        <Loading title={"Please wait creating your details..."} top="65%" />
      ) : (
        <Grid item xs={10}>
          <Formik innerRef={formikRef} initialValues={currentRow}>
            {(formik) => (
              <Form>
                <Grid container display="flex" flexDirection="column">
                  <Typography>
                    <b>Add Subject For Semester:</b> {currentsem}
                  </Typography>
                  <Grid item>
                    {Array.from(Array(counter)).map((c, index) => {
                      return (
                        <TextField
                          fullWidth
                          sx={{ marginTop: "1rem", marginLeft: ".5rem" }}
                          key={c}
                          className={index}
                          type="text"
                          onChange={addSubject(index)}
                        />
                      );
                    })}
                  </Grid>
                  <Grid item sx={{ paddingTop: ".5rem" }}>
                    <Button variant="outlined" onClick={handleClick}>
                      +
                    </Button>
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

export default DialogForSubjects;
