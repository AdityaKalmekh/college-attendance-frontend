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
import {Table} from 'reactstrap'
import ReactToPdf from 'react-to-pdf'
import { createRef } from "react";
import TableForm from "./TableForm";
import React from "react";
import { useReactToPrint } from "react-to-print";
import GeneratePDF from "./GeneratePDF";

const AttendanceReport = () => {

    const formikRef = useRef();
    const ref = createRef();
    const [currentRow,setCurrentRow] = useState({
        branch: "",
        semester: "",
        dateFrom : "",
        dateTo : ""
    })
    const [pdfcont,setPdfCont] = useState();
    const [branchCollection,setBranchCollection] = useState([])
    const [semCollection,setSemCollection] = useState([])
    const{sendRequest : sendTaskRequest} = useHttp()
    const [pdf,setPdf] = useState(null);

    useEffect(() => {
        sendTaskRequest({url:'/branch',method:"get"},(branch) => {setBranchCollection(branch)})
    }, [sendTaskRequest])
    

    const onSubmit = () => {
      formikRef.current.submitForm().then((values) =>{
          setCurrentRow(values)
      //   sendTaskRequest({url:`/getAttendance/${values.branch}/${values.semester}/${values.subject}/${values.date}/${values.lectureNo}`,method:"get"},(students)=>{setStudents(students)})
          sendTaskRequest({url:`/report`,data:values,method:"post"},ComponentToPrint)
      })
    }

    const ComponentToPrint = ( data ) => {
      setPdf(data);
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


// const GeneratePDF = ({ data,subjects,students,Allocationid }) => {
//     console.log({data});
//     // const allocationIds = [...new Set(data.map((allocation)=>allocation._id))]; use retrive unique value from 
//   // let totalLecture = 0;
//   let subjectLectures = [];
//   const pdfRef = useRef();
  
//   const totalLecture = data.reduce((sum,allocation) => 
//     sum + allocation.data[0].present + allocation.data[0].absent,0
//   );

//   const presentCounts = {};

//   Allocationid.forEach((id) => (
//     data.forEach((subject) => {
//       if (subject._id === id){
//         subjectLectures.push(subject.data[0].present + subject.data[0].absent)
//       }
//     })
//   ))

//   data.forEach((allocation) => {
//     allocation.data.forEach((student) => {
//       const { studentId, present } = student;
//       if (!presentCounts[studentId]){
//         presentCounts[studentId] = {};
//       }
//       presentCounts[studentId][allocation._id] = present;
//     });
//   });
//   const studentIds = Object.keys(presentCounts);

//   const calculatePercentage = (present) => {
//     const percentage = (present / totalLecture) * 100;
//     const result = Number.isInteger(percentage) ? percentage : parseFloat(percentage.toFixed(2));
//     return result;
//   }

//     const PrintContent = ({ pdfRef }) => {
//         // console.log("hh");
//         const handlePrint = useReactToPrint({
//         content: () => pdfRef.current,
//         documentTitle: "Attendance",
//         onAfterPrint: () => alert("Data saved in PDF")
//         });
    
//         useEffect(()=> {
//             handlePrint();
//         },[handlePrint])
//         return null;
//     }

//   return (
//   <div ref={pdfRef} style={{width:'100%'}}>
//     <table>
//       <thead>
//         <tr>
//           <tbody>
//             <tr>
//               <th>Allocation ID</th>
//               {subjects.map((subject) => (
//                 <th>{subject}</th>
//               ))}
//               <th>Total No.Lec</th>
//             </tr>
//             <tr>
//               <th></th>
//               { subjectLectures.map((lecture) => (
//                 <th>{lecture}</th>
//               ))}
//               <th>{totalLecture}</th>
//             </tr>
//             <tr>
//               <th>Sr.No</th>
//               <th>Name</th>
//               {subjectLectures.map(lecture =>(
//                 <th>Avg</th>
//               ))}
//               <th>Avg(%)</th>
//             </tr>
//             {studentIds.map((studentId,index) => {
//               let totalPresents = 0;
//               return <><tr key={studentId}>
//                 <td>{index+1}</td>
//                 <td>{students[index]}</td>
//                 {Allocationid.map((allocationId) => {
//                   totalPresents += presentCounts[studentId][allocationId];
//                   return <><td key={allocationId}>{presentCounts[studentId][allocationId]}</td></>
//                 })}
//                 <td>{calculatePercentage(totalPresents)}</td>
//               </tr>
//               </>
//             })}
//           </tbody>
//         </tr>
//       </thead>
//     </table>
//     {/* <button onClick={generatePdf}>pdf</button> */}
//     <PrintContent pdfRef={pdfRef}/>
//     </div>
//   );
// };

export default AttendanceReport;