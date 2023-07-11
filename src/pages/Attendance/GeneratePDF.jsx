// import {Table} from 'reactstrap'
// import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { useReactToPrint } from 'react-to-print';
import { useEffect, useRef } from 'react';


const GeneratePDF = ({ data,subjects,students,Allocationid }) => {
 
    // const allocationIds = [...new Set(data.map((allocation)=>allocation._id))]; use retrive unique value from 
  // let totalLecture = 0;
  let subjectLectures = [];
  const pdfRef = useRef();
  
  const totalLecture = data.reduce((sum,allocation) => 
    sum + allocation.data[0].present + allocation.data[0].absent,0
  );

  const presentCounts = {};

  Allocationid.forEach((id) => (
    data.forEach((subject) => {
      if (subject._id === id){
        subjectLectures.push(subject.data[0].present + subject.data[0].absent)
      }
    })
  ))

  data.forEach((allocation) => {
    allocation.data.forEach((student) => {
      const { studentId, present } = student;
      if (!presentCounts[studentId]){
        presentCounts[studentId] = {};
      }
      presentCounts[studentId][allocation._id] = present;
    });
  });
  const studentIds = Object.keys(presentCounts);

  const calculatePercentage = (present) => {
    const percentage = (present / totalLecture) * 100;
    const result = Number.isInteger(percentage) ? percentage : parseFloat(percentage.toFixed(2));
    return result;
  }

  // const PrintContent = ({ pdfRef }) => {
    const handlePrint = useReactToPrint({
      content: () => pdfRef.current,
      documentTitle: "Attendance",
      onAfterPrint: () => alert("Data saved in PDF")
    });

  useEffect(()=> {
    handlePrint();
  },[handlePrint])

  return (
  <div ref={pdfRef} style={{width:'100%'}}>
    <table>
      <thead>
        <tr>
          <tbody>
            <tr>
              <th>Allocation ID</th>
              {subjects.map((subject) => (
                <th>{subject}</th>
              ))}
              <th>Total No.Lec</th>
            </tr>
            <tr>
              <th></th>
              { subjectLectures.map((lecture) => (
                <th>{lecture}</th>
              ))}
              <th>{totalLecture}</th>
            </tr>
            <tr>
              <th>Sr.No</th>
              <th>Name</th>
              {subjectLectures.map(lecture =>(
                <th>Avg</th>
              ))}
              <th>Avg(%)</th>
            </tr>
            {studentIds.map((studentId,index) => {
              let totalPresents = 0;
              return <><tr key={studentId}>
                <td>{index+1}</td>
                <td>{students[index]}</td>
                {Allocationid.map((allocationId) => {
                  totalPresents += presentCounts[studentId][allocationId];
                  return <><td key={allocationId}>{presentCounts[studentId][allocationId]}</td></>
                })}
                <td>{calculatePercentage(totalPresents)}</td>
              </tr>
              </>
            })}
          </tbody>
        </tr>
      </thead>
    </table>
    {/* <button onClick={generatePdf}>pdf</button> */}
  </div>
  );
};
export default GeneratePDF;