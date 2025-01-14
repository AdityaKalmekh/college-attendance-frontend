import { Route, Routes } from "react-router-dom";
import Users from "../components/users";
import StudentCollection from "../pages/students/Student";
import BranchCollection from "../pages/Branch/Branch";
import AttendenceCollection from "../pages/Attendance/AttendenceIndex";
import FacultyCollection from "../pages/Faculty/Faculty";
import AllocationCollection from "../pages/Allocation/Allocation";
import AttendanceReport from "../pages/Attendance/AttendanceReport";
import { useAuthContext } from "../context";
// import GraphDilog from "../pages/Graph/graph";
const Content = () => {
  const { user } = useAuthContext();
  console.log(user);
  return (
    <Routes>
      {/* <Route exact path="/tasks/:saleId" element={<TaskBoard />} /> */}
      
      {user !== "faculty"? 
      <>
      <Route exact path="/" element={<Users />} />
      <Route exact path="/users" element={<Users />} />
      <Route exact path="/student" element={<StudentCollection />} />
      <Route exact path="/branch" element={<BranchCollection />} />
      <Route exact path="/faculty" element={<FacultyCollection />} />
      <Route exact path="/allocation" element={<AllocationCollection />} />
      <Route exact path="/report" element={<AttendanceReport/>} />

      </>
      :<Route exact path="/attendance" element={<AttendenceCollection />}/>}
      {/* <Route exact path="/graph" element={<GraphDilog />} /> */}
    </Routes>
  );
};

export default Content;
