/* eslint-disable no-unused-vars */
import {
  DialogTitle,
  TextField,
  Button,
  Box,
  Dialog,
  Grid,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  ListItem,
  Typography,
} from "@material-ui/core";
import LinearProgress from "@mui/material/LinearProgress";
import * as React from "react";
import { useRef, useState } from "react";
import { Form, Formik } from "formik";
import dayjs from "dayjs";
import { fireStorage } from "../../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import CardMedia from "@mui/material/CardMedia";
import { createProfessor, updateProfessor } from "../../api/Professor";

const ProfessorDialog = ({ open, onCancel, loadData, currentRow }) => {
  const formikRef = useRef();

  const [imageurl, setImageurl] = useState([]);
  const [imagename, setImageName] = useState([]);
  const [file, setFile] = useState([]);
  const [loadUpload, setLoadUpload] = useState(false);
  const [percent, setPercent] = useState([0]);
  function handleChange(event) {
    setFile([...file, event.target.files[0]]);
  }
  const handleUpload = () => {
    setLoadUpload(true);
    if (file.length > 0) {
      file.map((f) => {
        const storageRef = ref(fireStorage, `/Images/${f.name}`);
        const uploadTask = uploadBytesResumable(storageRef, f);
        return uploadTask.on(
          "state_changed",
          (snapshot) => {
            const percent = Math.round(
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            );
            setPercent(percent);
          },
          (err) => console.log(err),
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((url) => {
              setImageurl([...imageurl, url]);
              setImageName([...imagename, { name: f.name }]);
            });
            setLoadUpload(false);
            setFile([]);
          }
        );
      });
    } else {
      alert("Please upload an image first!");
    }
  };
  const onSubmit = () => {
    formikRef.current.submitForm().then((values) => {
      if (values) {
        if (currentRow.firebaseId) {
          updateProfessor({
            ...values,
            image: [...values.image, ...imageurl],
          });
        } else {
          createProfessor({
            ...values,
            date: dayjs().format(),
            image: imageurl.map((d) => d),
          });
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
          <DialogTitle style={{ paddingBottom: "0px" }}>Add Data</DialogTitle>
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
                    label="First Name"
                    name="fname"
                    fullWidth
                    value={formik.values.fname}
                    onChange={formik.handleChange}
                    error={formik.touched.fname && Boolean(formik.errors.fname)}
                    helperText={formik.touched.fname && formik.errors.fname}
                  />
                </Grid>
                <br />
                <Grid item container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <TextField
                      control="input"
                      type="text"
                      label="Middle Name"
                      name="mname"
                      fullWidth
                      value={formik.values.mname}
                      onChange={formik.handleChange}
                      error={
                        formik.touched.mname && Boolean(formik.errors.mname)
                      }
                      helperText={formik.touched.mname && formik.errors.mname}
                    />
                  </Grid>
                  <br />
                  <Grid item xs={12} md={6}>
                    <TextField
                      control="input"
                      type="text"
                      label="SureName"
                      name="sname"
                      fullWidth
                      value={formik.values.sname}
                      onChange={formik.handleChange}
                      error={
                        formik.touched.sname && Boolean(formik.errors.sname)
                      }
                      helperText={formik.touched.sname && formik.errors.sname}
                    />
                  </Grid>
                </Grid>
                <br />
                <Grid item xs={12}>
                  <TextField
                    control="input"
                    type="text"
                    label="Address"
                    name="address"
                    fullWidth
                    value={formik.values.address}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.address && Boolean(formik.errors.address)
                    }
                    helperText={formik.touched.address && formik.errors.address}
                  />
                </Grid>
                <br />
                <Grid item xs={12}>
                  <TextField
                    control="input"
                    type="text"
                    label="Enrollement No"
                    name="enroll"
                    fullWidth
                    value={formik.values.enroll}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.enroll && Boolean(formik.errors.enroll)
                    }
                    helperText={formik.touched.enroll && formik.errors.enroll}
                  />
                </Grid>
                <br />
                <Grid item xs={12}>
                  <TextField
                    control="input"
                    type="Date"
                    label="Addmition Date"
                    name="addmitiondate"
                    fullWidth
                    value={formik.values.addmitiondate}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.addmitiondate &&
                      Boolean(formik.errors.addmitiondate)
                    }
                    helperText={
                      formik.touched.addmitiondate &&
                      formik.errors.addmitiondate
                    }
                  />
                </Grid>
                <br />
                <Grid item container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <TextField
                      control="input"
                      type="text"
                      label="Course"
                      name="course"
                      fullWidth
                      value={formik.values.course}
                      onChange={formik.handleChange}
                      error={
                        formik.touched.course && Boolean(formik.errors.course)
                      }
                      helperText={formik.touched.course && formik.errors.course}
                    />
                  </Grid>
                  <br />
                  <Grid item xs={12} md={6}>
                    <TextField
                      control="input"
                      type="number"
                      label="Semester"
                      name="sem"
                      fullWidth
                      value={formik.values.sem}
                      onChange={formik.handleChange}
                      error={formik.touched.sem && Boolean(formik.errors.sem)}
                      helperText={formik.touched.sem && formik.errors.sem}
                    />
                  </Grid>
                </Grid>
                <br />
                <Grid item xs={12} md={6}>
                  <TextField
                    control="input"
                    type="text"
                    label="Division"
                    name="div"
                    fullWidth
                    value={formik.values.div}
                    onChange={formik.handleChange}
                    error={formik.touched.div && Boolean(formik.errors.div)}
                    helperText={formik.touched.div && formik.errors.div}
                  />
                </Grid>
                <br />
                <Grid item container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <TextField
                      control="input"
                      type="text"
                      label="Parents Contact"
                      name="pcontact"
                      fullWidth
                      value={formik.values.pcontact}
                      onChange={formik.handleChange}
                      error={
                        formik.touched.pcontact &&
                        Boolean(formik.errors.pcontact)
                      }
                      helperText={
                        formik.touched.pcontact && formik.errors.pcontact
                      }
                    />
                  </Grid>
                  <br />
                  <Grid item xs={12} md={6}>
                    <TextField
                      control="input"
                      type="text"
                      label="Student Contact"
                      name="scontact"
                      fullWidth
                      value={formik.values.scontact}
                      onChange={formik.handleChange}
                      error={
                        formik.touched.scontact &&
                        Boolean(formik.errors.scontact)
                      }
                      helperText={
                        formik.touched.scontact && formik.errors.scontact
                      }
                    />
                  </Grid>
                </Grid>
                <br />
                <Grid item xs={12}>
                  <input
                    width="20%"
                    type="file"
                    label="image"
                    filename="image"
                    onChange={handleChange}
                    accept="/image/*"
                  />
                  <Button
                    variant="contained"
                    type="submit"
                    onClick={handleUpload}
                  >
                    Upload
                  </Button>
                  <Typography
                    fontSize="12px !important"
                    fontFamily="Verdana, Arial, Helvetica, sans-serif !important"
                  >
                    *You can upload multiple images, Upload selected image
                    before new selection.{" "}
                  </Typography>
                  {loadUpload && <LinearProgress value={imageurl} />}
                </Grid>
                <br />
                {(imageurl?.length > 0 || currentRow.image?.length > 0) && (
                  <Grid container>
                    <Grid item xs={12} md={12}>
                      <Box
                        style={{
                          display: "flex",
                          flexWrap: "wrap",
                          padding: "5px",
                          marginTop: "10px",
                        }}
                      >
                        {imageurl?.map((i) => (
                          <CardMedia
                            component="img"
                            image={i}
                            sx={{
                              objectFit: "cover",
                              height: "100px !important",
                              margin: "13px",
                              width: "100px !important",
                              marginBottom: "10px",
                            }}
                          />
                        ))}
                      </Box>
                    </Grid>
                    <br />
                    <Grid item xs={12} md={12}>
                      <Box
                        style={{
                          width: "100%",
                          marginTop: "10px",
                        }}
                      >
                        <InputLabel>Uploaded Images:</InputLabel>
                        {imagename.map((i) => (
                          <ListItem>{i.name}</ListItem>
                        ))}
                      </Box>
                    </Grid>
                  </Grid>
                )}
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

export default ProfessorDialog;
