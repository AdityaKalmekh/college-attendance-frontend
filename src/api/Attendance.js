import { async } from "@firebase/util";
import http from "../http-common";

export const getBranchData = async () => {
    const branchData = await http.get("/getData");
    console.log({attendance : branchData});
}

export const getBranch = async () => {
    const branch = await http.get("/Attendancebranch");
    console.log(branch);
}

export const getAttendance = async (branch,sem,subject,date,lectureNo) => {
    const students = await http.get(`/getAttendance/${branch}/${sem}/${subject}/${date}/${lectureNo}`)
    // console.log(students.data);
    return students.data;
    // console.log(students);
    // const dt = students.data.map((student,index) =>({...student,id:index,"status":0}));
    // return dt
}

export const addAttendance = async (data) => {
    // console.log(data);
    // console.log(data.Attendance[0]);
    const response = await http.post("/addAttendance",data)
    console.log({response});
}

export const editAttendance = async (data) => {
    const response = await http.put(`/editAttendance`,data)
    console.log({response});
}
