import { Button, Dialog, Box } from "@mui/material";
import React, { useState } from "react";
import * as XLSX from "xlsx";
import { addStudentCollection } from "../../../api/student";
// import { addPropertyCollection } from "../../../api/property-collection";

const AddMultipleStudents = ({ openAddFileDialog, closeAddFileDialog }) => {
  const [data, setData] = useState();

  const handleDataAddition = async () => {
    if (data) {
      for (let d of data) {
        await addStudentCollection({
          address: d.Address ? d.Address : "",
          fname: d.fname ? d.fname : "",
          mname: d.mname ? d.mname : "",
          sname: d.sname ? d.sname : "",
          enroll: d.enroll ? d.enroll : "",
          addmitiondate: d.addmitiondate ? d.addmitiondate : "-",
          course: d.course ? d.course : "",
          sem: d.sem ? d.sem : "",
          div: d.div ? d.div : "",
          pcontact: d.pcontact ? d.pcontact : "",
          scontact: d.scontact ? d.scontact : "",
        });
      }
    }
    closeAddFileDialog();
  };

  const onChange = (e) => {
    const [file] = e.target.files;
    const reader = new FileReader();

    reader.onload = (evt) => {
      const bstr = evt.target.result;
      const wb = XLSX.read(bstr, { type: "binary" });
      const data = [];
      const sheets = wb.SheetNames;

      for (let i = 0; i < sheets.length; i++) {
        const temp = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[i]]);
        temp.forEach((res) => {
          data.push(res);
        });
      }
      setData(data);
    };
    reader.readAsBinaryString(file);
  };

  return (
    <Dialog fullWidth open={openAddFileDialog} onClose={closeAddFileDialog}>
      <Box sx={{ margin: "20px", padding: "20px" }}>
        <input type="file" onChange={onChange} />
        <Button onClick={handleDataAddition} variant="contained">
          Add all data
        </Button>
      </Box>
    </Dialog>
  );
};

export default AddMultipleStudents;
