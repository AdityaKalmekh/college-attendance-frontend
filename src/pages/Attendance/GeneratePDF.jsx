// import {Table} from 'reactstrap'
// import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { useReactToPrint } from "react-to-print";
import { useEffect, useRef } from "react";
import StyledTable from "./PdfTableComponent";

const GeneratePDF = ({ data, subjects, students, Allocationid }) => {
  // const allocationIds = [...new Set(data.map((allocation)=>allocation._id))]; use retrive unique value from
  // let totalLecture = 0;
  let subjectLectures = [];
  const pdfRef = useRef();

  const totalLecture = data.reduce(
    (sum, allocation) =>
      sum + allocation.data[0].present + allocation.data[0].absent,
    0
  );

  const presentCounts = {};

  Allocationid.forEach((id) =>
    data.forEach((subject) => {
      if (subject._id === id) {
        subjectLectures.push(subject.data[0].present + subject.data[0].absent);
      }
    })
  );

  data.forEach((allocation) => {
    allocation.data.forEach((student) => {
      const { studentId, present } = student;
      if (!presentCounts[studentId]) {
        presentCounts[studentId] = {};
      }
      presentCounts[studentId][allocation._id] = present;
    });
  });
  const studentIds = Object.keys(presentCounts);

  const calculatePercentage = (present) => {
    const percentage = (present / totalLecture) * 100;
    const result = Number.isInteger(percentage)
      ? percentage
      : parseFloat(percentage.toFixed(2));
    return result;
  };

  // const PrintContent = ({ pdfRef }) => {
  const handlePrint = useReactToPrint({
    content: () => pdfRef.current,
    documentTitle: "Attendance",
    onAfterPrint: () => alert("Data saved in PDF"),
  });

  useEffect(() => {
    handlePrint();
  }, [handlePrint]);

  return (
    <div ref={pdfRef} style={{ padding: "1rem" }}>
      <StyledTable
        subjects={subjects}
        subjectLectures={subjectLectures}
        totalLecture={totalLecture}
        studentIds={studentIds}
        students={students}
        Allocationid={Allocationid}
        presentCounts={presentCounts}
        calculatePercentage={calculatePercentage}
      />
    </div>
  );
};
export default GeneratePDF;
