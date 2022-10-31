import { Button } from "@mui/material";
// import { getBranch } from "../../api/Branch";
// import { DataGrid } from "@mui/x-data-grid";
// import { css } from "@emotion/react";
// import BranchDailog from "./AddBranchDailoge";
import { useState } from "react";
// import { GridActionsCellItem } from "@mui/x-data-grid";
// import EditIcon from "@mui/icons-material/Edit";
// import DeleteIcon from "@mui/icons-material/DeleteOutlined";
// import { deletestuentData } from "../../api/student";
// import { deletebranchData } from "../../api/Branch";
import AttendenceDailog from "./AddAttendanceDailoge";
const AttendenceCollection = () => {
  const [open, setOpen] = useState(false);
  // const [branchCollection, setBranchCollection] = useState([]);
  const [currentRow, setCurrentRow] = useState();

  const initialValues = {
    bname: "",
    tsem: "",
    tsubname: "",
  };

  // const loadData = () => {
  //   getBranch().then(setBranchCollection);
  // };

  // useEffect(() => {
  //   loadData();
  // }, []);

  const handleClickOpen = () => {
    setCurrentRow(initialValues);
    setOpen(true);
  };

  const handleClickClose = () => {
    setOpen(false);
  };

  // const handleDeleteClick = (row) => (event) => {
  //   event.stopPropagation();
  //   if (window.confirm("Are you sure to delete?") === true) {
  //     deletebranchData(row);
  //     loadData();
  //   }
  // };
  // const handleEditClick = (row) => (event) => {
  //   event.stopPropagation();
  //   setCurrentRow({
  //     bname: row.bname ? row.bname : "",
  //     tsem: row.tsem ? row.tsem : "",
  //     tsubname: row.tsubname ? row.t.sub : [""],
  //   });
  //   setOpen(true);
  // };

  return (
    <>
      {open && (
        <AttendenceDailog
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
        Add
      </Button>
    </>
  );
};

export default AttendenceCollection;
