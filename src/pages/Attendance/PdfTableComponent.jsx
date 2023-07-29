import React from "react";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Typography,
} from "@mui/material";

const StyledTable = ({
  subjects,
  subjectLectures,
  totalLecture,
  studentIds,
  students,
  Allocationid,
  presentCounts,
  calculatePercentage,
}) => {
  return (
    <div>
      {/* First Table */}
      <Typography
        variant="h4"
        sx={{ display: "flex", justifyContent: "center", marginY: "2rem" }}
      >
        Student Attendance Report
      </Typography>
      <Table sx={{ border: "1px solid #ddd", marginBottom: "16px" }}>
        <TableHead>
          <TableRow>
            {subjects.map((subject) => (
              <TableCell
                key={subject}
                sx={{
                  border: "1px solid #ddd",
                  background: "#f2f2f2",
                  fontWeight: "bold",
                }}
              >
                {subject}
              </TableCell>
            ))}
            <TableCell
              sx={{
                border: "1px solid #ddd",
                background: "#f2f2f2",
                fontWeight: "bold",
              }}
            >
              Total No. Lec
            </TableCell>
          </TableRow>
          <TableRow>
            {subjectLectures.map((lecture) => (
              <TableCell
                key={lecture}
                sx={{
                  border: "1px solid #ddd",
                }}
              >
                {lecture}
              </TableCell>
            ))}
            <TableCell
              sx={{
                border: "1px solid #ddd",
              }}
            >
              {totalLecture}
            </TableCell>
          </TableRow>
        </TableHead>
      </Table>

      {/* Main Table */}
      <Table sx={{ border: "1px solid #ddd" }}>
        <TableHead>
          <TableRow>
            <TableCell
              sx={{
                border: "1px solid #ddd",
                background: "#f2f2f2",
                fontWeight: "bold",
              }}
            >
              Sr.No
            </TableCell>
            <TableCell
              sx={{
                border: "1px solid #ddd",
                background: "#f2f2f2",
                fontWeight: "bold",
              }}
            >
              Name
            </TableCell>
            {subjectLectures.map((lecture, index) => (
              <TableCell
                key={index}
                sx={{
                  border: "1px solid #ddd",
                  background: "#f2f2f2",
                  fontWeight: "bold",
                }}
              >
                Avg
              </TableCell>
            ))}
            <TableCell
              sx={{
                border: "1px solid #ddd",
                background: "#f2f2f2",
                fontWeight: "bold",
              }}
            >
              Avg(%)
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {studentIds.map((studentId, index) => {
            let totalPresents = 0;
            return (
              <TableRow key={studentId}>
                <TableCell sx={{ border: "1px solid #ddd" }}>
                  {index + 1}
                </TableCell>
                <TableCell sx={{ border: "1px solid #ddd" }}>
                  {students[index]}
                </TableCell>
                {Allocationid.map((allocationId) => {
                  totalPresents += presentCounts[studentId][allocationId];
                  return (
                    <TableCell
                      key={allocationId}
                      sx={{ border: "1px solid #ddd" }}
                    >
                      {presentCounts[studentId][allocationId]}
                    </TableCell>
                  );
                })}
                <TableCell sx={{ border: "1px solid #ddd" }}>
                  {calculatePercentage(totalPresents)}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default StyledTable;
