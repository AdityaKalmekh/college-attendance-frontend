import { Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { css } from "@emotion/react";
import { getFaculty, deletefacultyData } from "../../api/faculty";
import FacultyDialog from "./AddFacultyDailoge";
import { useState, useEffect } from "react";
import { GridActionsCellItem } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import { toast } from "react-toastify";

const FacultyCollection = () => {
  const [open, setOpen] = useState(false);
  const [facultyCollection, setFacultyCollection] = useState([]);
  const [currentRow, setCurrentRow] = useState();

  const initialValues = {
    fname: "",
    qulification: "",
    experience: "",
    expertise: "",
  };

  const loadData = () => {
    getFaculty().then(setFacultyCollection);
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
      deletefacultyData(row);
      loadData();
    }
    toast.warning("Faculty Delete Sucessfully");
  };
  const handleEditClick = (row) => (event) => {
    console.log(row);
    event.stopPropagation();
    setCurrentRow({
      fname: row.fname ? row.fname : "",
      qulification: row.qulification ? row.qulification : "",
      experience: row.experience ? row.experience : "",
      expertise: row.expertise ? row.expertise : "",
      id: row._id ? row._id : "",
    });
    setOpen(true);
  };
  console.log(facultyCollection);
  const columns = [
    { field: "id", headerName: "SR.", width: 50 },
    { field: "fname", headerName: "Facuty Name", width: 200 },
    { field: "qulification", headerName: "Qulification ", width: 200 },
    { field: "experience", headerName: "Expirience ", width: 200 },
    { field: "expertise", headerName: "Expertise ", width: 200 },
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
        Add Faculty
      </Button>
      <div style={{ height: 475, width: "100%" }}>
        <DataGrid
          editMode="row"
          rows={facultyCollection?.map((student, index) => ({
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
