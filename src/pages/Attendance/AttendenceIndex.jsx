import { Button, DialogTitle, Grid, Select, Typography } from "@mui/material";
import { useState } from "react";
import DialogForAttendance from "./DilogForAttendance";
const AttendenceCollection = () => {
  const [open, setOpen] = useState(false);
  const [currentRow, setCurrentRow] = useState();

  const initialValues = {
    bname: "",
    tsem: "",
    tsubname: "",
  };

  const handleClickOpen = () => {
    setCurrentRow(initialValues);
    setOpen(true);
  };

  const handleClickClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Grid container md={12} xs={12}>
        <DialogTitle style={{ paddingBottom: "0px" }}>
          Fill a Details
        </DialogTitle>
        <Grid
          item
          container
          display="flex"
          flexDirection="row"
          spacing={2}
          padding="1rem"
          paddingTop=""
        >
          <Grid item md={4}>
            <Typography>Select Any Branch</Typography>
            <Select
              control="select"
              type="text"
              label="Branch"
              fullWidth
              name="sbranch"
              // value={}
              // onChange={formik.handleChange}
            />
          </Grid>
          <Grid item md={4}>
            <Typography>Select Faculty</Typography>
            <Select
              control="select"
              type="text"
              label="Branch"
              fullWidth
              name="sbranch"
              // value={}
              // onChange={formik.handleChange}
            />
          </Grid>
          <Grid item md={4}>
            <Typography>Select Subject</Typography>
            <Select
              control="select"
              type="text"
              label="Branch"
              fullWidth
              name="sbranch"
              // value={}
              // onChange={formik.handleChange}
            />
          </Grid>
          <Grid item md={4}>
            <Typography>Select Samester</Typography>
            <Select
              control="select"
              type="text"
              label="Branch"
              fullWidth
              name="sbranch"
              // value={}
              // onChange={formik.handleChange}
            />
          </Grid>
        </Grid>
      </Grid>
      {open && (
        <DialogForAttendance
          open={open}
          handleClickClose={handleClickClose}
          // loadData={loadData}
          currentRow={currentRow}
        />
      )}
      <Button
        onClick={handleClickOpen}
        variant="contained"
        sx={{ margin: "10px" }}
      >
        Take a Attendance
      </Button>
    </>
  );
};

export default AttendenceCollection;
