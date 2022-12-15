import {
  Button,
  DialogTitle,
  Grid,
  Select,
  Typography,
  TextField,
  Checkbox,
} from "@mui/material";
import { useState, useRef } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import DialogForAttendance from "./DilogForAttendance";
import { css } from "@emotion/react";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import { Form, Formik } from "formik";
const AttendenceCollection = () => {
  const [open, setOpen] = useState(false);
  const [currentRow, setCurrentRow] = useState();
  const [value, setValue] = useState(null);
  const formikRef = useRef();

  const initialValues = {
    bname: "",
    tsem: "",
    tsubname: "",
  };

  const columns = [
    { field: "id", headerName: "ID", width: 20 },
    {
      field: "lastName",
      headerName: "Student Name",
      width: 250,
      editable: true,
    },
    {
      field: "1",
      headerName: "1",
      width: 60,
      renderCell: ({ row }) => (
        <strong>
          <GridActionsCellItem icon={<Checkbox />} label="1" />
        </strong>
      ),
    },
  ];

  const rows = [
    { id: 1, lastName: "Snow", firstName: "Jon" },
    { id: 2, lastName: "Joy", firstName: "Don" },
  ];

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
          <Grid item md={3}>
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
          <Grid item md={3}>
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
          <Grid item md={3}>
            <Typography>Select Sem</Typography>
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
          <Grid item md={3}>
            <Typography>Select Any Subject</Typography>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Age"
              fullWidth
              name="sbranch"
              // value={}
              // onChange={formik.handleChange}
            />
          </Grid>
          <Grid item md={3}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Select Date"
                value={value}
                onChange={(newValue) => {
                  setValue(newValue);
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
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
      <Grid item xs={12}>
        <Formik
          innerRef={formikRef}
          initialValues={currentRow}
          onSubmit={(values) => values}
        >
          {(formik) => (
            <Form>
              <Grid item xs={12} sx={{ borderTop: "1px solid black" }}>
                <Grid>
                  <DialogTitle style={{ paddingBottom: "0px" }}>
                    Attendance Sheet
                  </DialogTitle>
                  <div style={{ height: 500, width: "100%" }}>
                    <DataGrid
                      editMode="row"
                      const
                      rows={rows}
                      columns={columns}
                      css={css`
                        height: calc(100vh - 1500px - 30px) !important;
                      `}
                      experimentalFeatures={{ newEditingApi: true }}
                      hideFooter
                    />
                  </div>
                </Grid>
                <br />
              </Grid>
            </Form>
          )}
        </Formik>
      </Grid>
    </>
  );
};

export default AttendenceCollection;
