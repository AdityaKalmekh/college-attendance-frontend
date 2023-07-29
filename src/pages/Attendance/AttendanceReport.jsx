import {
    Button,
    DialogTitle,
    Grid,
    Select,
    Typography,
    TextField,
    MenuItem
  } from "@mui/material";
import { Form, Formik } from "formik";
import { useState,useEffect } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useRef } from "react";
import useHttp from "../../hooks/useHttp";
import React from "react";
import GeneratePDF from "./GeneratePDF";
import { toast } from "react-toastify";

const AttendanceReport = () => {

    const formikRef = useRef();
    const [currentRow,setCurrentRow] = useState({
        branch: "",
        semester: "",
        dateFrom : "",
        dateTo : ""
    });

    const [branchCollection,setBranchCollection] = useState([]);
    const [semCollection,setSemCollection] = useState([]);
    const{sendRequest : sendTaskRequest} = useHttp();
    const [pdf,setPdf] = useState(null);

    useEffect(() => {
        sendTaskRequest({url:'/branch',method:"get"},(branch) => {setBranchCollection(branch)});
    }, [sendTaskRequest]);
    

    const onSubmit = () => {
      formikRef.current.submitForm().then((values) =>{
        setCurrentRow(values);
      //   sendTaskRequest({url:`/getAttendance/${values.branch}/${values.semester}/${values.subject}/${values.date}/${values.lectureNo}`,method:"get"},(students)=>{setStudents(students)})
        sendTaskRequest({url:`/report`,data:values,method:"post"},ComponentToPrint);
      })
    }

    const ComponentToPrint = ( data ) => {  
        if (!data){
            toast.error("Data Not Found");
        }else{
            console.log(data);
            setPdf(data);
        }
    };
       
    return (
        <>
        {pdf == null ?
            <Grid container md={12} xs={12}>
                <DialogTitle style={{ paddingBottom: "0px" }}>
                Fill a Details
                </DialogTitle>
                <Formik
                innerRef={formikRef}
                initialValues={currentRow}
                onSubmit={(values) => values}        
                >
                {(formik) =>(
                <Form>
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
                        fullWidth
                        name="branch"
                        value={formik.values.branch}
                        onChange={(e) => {
                        formik.setFieldValue('branch',e.target.value)
                        sendTaskRequest({url:`/semester/${e.target.value}`, method:"get"}, (semester) => {setSemCollection(semester)})
                        }}
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
                        fullWidth
                        name="semester"
                        value={formik.values.semester}
                        onChange={(e) => {
                        formik.setFieldValue('semester',e.target.value)
                        }}
                    >
                        {semCollection?.map((d, i) => {
                        return <MenuItem value={d}>{d}</MenuItem>;
                        })}
                    </Select>
                    </Grid>
                    <Grid item md={2.4}>
                        <Typography>From Date</Typography>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                                value={formik.values.dateFrom}
                                name="dateFrom"
                                onChange={(e)=> {
                                    formik.setFieldValue("dateFrom",`${e.$d.getMonth() + 1}-${e.$d.getDate()}-${e.$d.getFullYear()}`)
                                }}
                                renderInput={(params) => <TextField {...params} />}
                            />
                        </LocalizationProvider>
                    </Grid>
                    <Grid item md={2.4}>
                    <Typography>To Date</Typography>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                        value={formik.values.dateTo}
                        name="dateTo"
                        onChange={(e)=> {
                            formik.setFieldValue("dateTo",`${e.$d.getMonth() + 1}-${e.$d.getDate()}-${e.$d.getFullYear()}`)
                        }}
                        renderInput={(params) => <TextField {...params} />}
                        />
                        </LocalizationProvider>
                    </Grid>
                    <Button
                        onClick={onSubmit}
                        variant="contained"
                        sx={{ margin: "10px" }}
                    >
                    Download
                    </Button>
                    </Grid>
                </Form>
                )} 
                </Formik>
            </Grid>
            :<GeneratePDF data={pdf.data} subjects={pdf.subjects} students= {pdf.students} Allocationid={pdf.Allocationid}/>
            }
        </>
    )
}
export default AttendanceReport;