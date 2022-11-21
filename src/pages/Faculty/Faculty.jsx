import { Button } from "@mui/material";
import { getStudent } from "../../api/student";
import { DataGrid } from "@mui/x-data-grid";

import { css } from "@emotion/react";
import FacultyDialog from "./AddFacultyDailoge";
import { useState, useEffect } from "react";
import { GridActionsCellItem } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import { deletestuentData } from "../../api/student";

const FacultyCollection = () => {
  const [open, setOpen] = useState(false);
  const [studentCollection, setStudentCollection] = useState([]);
  const [currentRow, setCurrentRow] = useState();

  const initialValues = {
    fname: "",
    pcontact: "",
    scontact: "",
  };

  const loadData = () => {
    getStudent().then(setStudentCollection);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleClickOpen = () => {
    setCurrentRow(initialValues);
    setOpen(true);
  };

  const handleClickClose = () => {
    setOpen(false);
  };

  const handleDeleteClick = (row) => (event) => {
    event.stopPropagation();
    if (window.confirm("Are you sure to delete?") === true) {
      console.log(row);
      deletestuentData(row);
      loadData();
    }
  };
  const handleEditClick = (row) => (event) => {
    event.stopPropagation();
    setCurrentRow({
      fname: row.fname ? row.fname : "",
      sbranch: row.sbranch ? row.sbranch : "",
      ssubject: row.ssubject ? row.ssubject : "",
      ssem: row.ssem ? row.ssem : "",
    });
    setOpen(true);
  };

  const columns = [
    { field: "id", headerName: "SR.", width: 50 },
    { field: "fname", headerName: "Facuty Name", width: 200 },
    { field: "sbranch", headerName: "Branch ", width: 200 },
    { field: "ssubject", headerName: "Subject ", width: 200 },
    { field: "ssem", headerName: "Semester ", width: 200 },
    {
      field: "delete",
      headerName: "Delete",
      width: 80,
      renderCell: ({ row }) => (
        <strong>
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(row)}
            color="inherit"
          />
        </strong>
      ),
    },
    {
      field: "edit",
      headerName: "Edit",
      width: 80,
      renderCell: ({ row }) => (
        <strong>
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            onClick={handleEditClick(row)}
            color="inherit"
          />
        </strong>
      ),
    },
  ];

  return (
    <>
      {open && (
        <FacultyDialog
          open={open}
          onCancel={handleClickClose}
          loadData={loadData}
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
      <div style={{ height: 475, width: "100%" }}>
        <DataGrid
          editMode="row"
          rows={studentCollection?.map((student, index) => ({
            ...student,
            id: index + 1,
          }))}
          columns={columns}
          css={css`
            height: calc(100vh - 1500px - 30px) !important;
          `}
          experimentalFeatures={{ newEditingApi: true }}
        />
      </div>
    </>
  );
};

export default FacultyCollection;