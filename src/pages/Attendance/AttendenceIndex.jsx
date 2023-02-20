import {
  Button,
  DialogTitle,
  Grid,
  Select,
  Typography,
  TextField,
  Checkbox,
  MenuItem
} from "@mui/material";
import { useState, useRef } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import DialogForAttendance from "./DilogForAttendance";
import { css } from "@emotion/react";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import { Form, Formik } from "formik";
import { isPageKeys } from "@mui/x-data-grid/utils/keyboardUtils";
import { getbranchName, getSem, getSubject } from "../../api/Branch";
import { useEffect } from "react";
import { getAttendance, addAttendance, editAttendance } from "../../api/Attendance";
import FormikController from "../../formik/FormikController";

const AttendenceCollection = () => {
  const [branchCollection, setBranchCollection] = useState([]);
  const [semCollection, setSemCollection] = useState([]);
  const [subjectCollection, setSubjectCollection] = useState([]);
  const [selectedBranch, setSelectedBranch] = useState();
  const [selectedSemester, setSelectedSemester] = useState();
  const [selectedSubject, setSelectedSubject] = useState();
  const [selectedLectureNo, setSelectedLectureNo] = useState();
  let [students, setStudents] = useState([])
  const [open, setOpen] = useState(false);
  const [currentRow, setCurrentRow] = useState();
  // var mongoose = require('mongoose')
  // const currentDate= new Date()
  const [date, setDate] = useState(`${new Date().getMonth()+1}-${new Date().getDate()}-${new Date().getFullYear()}`);
  const formikRef = useRef();

  const initialValues = {
    bname: "",
    tsem: "",
    tsubname: "",
  };

  const columns = [
    { field: "id", headerName: "ID", width: 20 },
    {
      field: "fname",
      headerName: "Student Name",
      width: 150,
      editable: true,
    },
    {
      headerName: "Surname",
      field: "sname",
      editable: true,
    },
    {
      field: "1",
      headerName: "Status",
      width: 60,
      renderCell: ({ row }) => (
        <strong>
          <GridActionsCellItem icon={<Checkbox value={row.id} checked={row.AttendanceStatus === 1} onChange={changeAttendanceStatus} />} label="1" />
        </strong>
      ),
    },
  ];

  console.log({date});
  const changeAttendanceStatus = (e) => {
    // console.log(e.target.value);
    const index = e.target.value - 1;
    students[index].AttendanceStatus === 1 ? students[index].AttendanceStatus = 0 : students[index].AttendanceStatus = 1
    setStudents([...students])
  }

  console.log({ students });
  useEffect(() => {
    loadBranch()
  }, [])

  const loadBranch = () => {
    getbranchName().then(setBranchCollection)
  }

  const handleClickOpen = () => {
    setCurrentRow(initialValues);
    setOpen(true);
  };

  const handleClickClose = () => {
    setOpen(false);
  };

  const getStudents = () => {
    getAttendance(selectedBranch, selectedSemester, selectedSubject, date, selectedLectureNo).then(setStudents)
    // setStudents(it);
  }

  // console.log(students.objectId);
  const saveData = () => {
    if (students[0].objectId) {
      const objectId = students[0].objectId
      students = students.map(student => ({ "studentId": student._id, "AttendanceStatus": student.AttendanceStatus }))
      const data = {
        "objectId" : objectId,
        "lectureNo" : selectedLectureNo,
        "students" : students
      }
      editAttendance(data);
    } else {
      // let a = students.map(myfunction)
      // function myfunction(std){
      //   var id = mongoose.Types.ObjectId(std._id)
      //   console.log({id});
      //   console.log(typeof(id));
      // }
      let presentAbsent = students.map(student => ({ "studentId": student._id, "AttendanceStatus": student.AttendanceStatus }))
      let Attendance = [{ "Lecture_NO": selectedLectureNo, "PresentAbsent": presentAbsent }]
      // console.log({ Attendance });
      let data = {
        "Allocation_id": "",
        "Date": date,
        Attendance
      }
      // console.log({data});
      // console.log({data});
      addAttendance(data);
    }
  }
  //console.log({ date });

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
          <Grid item md={2.4}>
            <Typography>Select Any Branch</Typography>
            <Select
              control="select"
              type="text"
              label="Branch"
              fullWidth
              name="sbranch"
              value={selectedBranch}
              onChange={(e) => {
                setSelectedBranch(e.target.value)
                getSem(e.target.value).then(setSemCollection)
              }}
            // value={}
            // onChange={formik.handleChange}
            >
              {branchCollection?.map((d) => {
                return <MenuItem value={d}>{d}</MenuItem>;
              })}
            </Select>
          </Grid>
          <Grid item md={2.4}>
            <Typography>Select Sem</Typography>
            <Select
              control="select"
              type="text"
              label="Branch"
              fullWidth
              name="sbranch"
              value={selectedSemester}
              onChange={(e) => {
                setSelectedSemester(e.target.value)
                getSubject(selectedBranch, e.target.value).then(setSubjectCollection)
              }}
            >
              {semCollection?.map((d, i) => {
                return <MenuItem value={d}>{d}</MenuItem>;
              })}
            </Select>
          </Grid>
          <Grid item md={2.4}>
            <Typography>Select Any Subject</Typography>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Age"
              fullWidth
              name="sbranch"
              value={selectedSubject}
              // value={}
              onChange={(e) => { setSelectedSubject(e.target.value) }}
            >
              {subjectCollection?.map((d) => {
                return <MenuItem value={d}>{d}</MenuItem>;
              })}
            </Select>
          </Grid>
          <Grid item md={2.4} textAlign="left">
            <Typography>Select Lecture No</Typography>
            <FormikController
              control="input"
              type="number"
              value={selectedLectureNo}
              // label = "Lecture No"
              fullWidth
              onChange={(e) => { setSelectedLectureNo(e.target.value) }}
            />
          </Grid>
          <Grid item md={2.4}>
            <Typography>Select Date</Typography>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                // label="Select Date"
                // inputFormat="DD/MM/YYYY"
                value={date}
                onChange={(e) => {
                  // console.log(e.toLocaleDateString());
                  // setDate(e);
                  // console.log(e.$d.getDate());
                  // var dd = e.$d.getDate()
                  // var mm = e.$d.getMonth()+1
                  // var yyyy = e.$d.getFullYear()
                  // if (dd < 10){
                  //   dd = '0' + dd
                  // }if (mm < 10){
                  //   mm = '0' + mm
                  // }
                  setDate(`${e.$d.getMonth() + 1}-${e.$d.getDate()}-${e.$d.getFullYear()}`);
                  // setDate(dd+'/'+mm+'/'+yyyy)
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </Grid>
        </Grid>
      </Grid>

      {/* {open && (
        <DialogForAttendance
          open={open}
          handleClickClose={handleClickClose}
          // loadData={loadData}
          currentRow={currentRow}
        />
      )} */}
      <Button
        onClick={getStudents}
        variant="contained"
        sx={{ margin: "10px" }}
      >
        Take a Attendance
      </Button>
      <Grid item xs={12}>
        <Formik
          innerRef={formikRef}
          initialValues={currentRow}
        // onSubmit={(values) => values}
        >
          {(formik) => (
            <Form>
              <Grid item xs={12} sx={{ borderTop: "1px solid black" }}>
                <Grid>
                  <DialogTitle style={{ paddingBottom: "0px" }}>
                    Attendance Sheet
                  </DialogTitle>
                  <div style={{ height: 300, width: "100%" }}>
                    <DataGrid
                      editMode="row"
                      const
                      rows={students.map((student, index) => ({ ...student, id: index + 1 }))}
                      // rows={rows}
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
              <Button onClick={saveData} variant="contained">
                Submit
              </Button>
            </Form>
          )}
        </Formik>
      </Grid>
    </>
  );
};

export default AttendenceCollection;