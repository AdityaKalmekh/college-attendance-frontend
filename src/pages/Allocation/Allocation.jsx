import { Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { css } from "@emotion/react";
// import { getFaculty, deletefacultyData } from "../../api/faculty";
import { getAllocation, deleteallocationData } from "../../api/allocation";
import AllocationDialog from "./AddAllocationDialog";
import { useState, useEffect } from "react";
import { GridActionsCellItem } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import { toast } from "react-toastify";

const AllocationCollection = () => {
  const [open, setOpen] = useState(false);
  const [facultyCollection, setFacultyCollection] = useState([]);
  const [currentRow, setCurrentRow] = useState();

  const initialValues = {
    id : "",
    facultyName: "",
    branch: "",
    semester: "",
    subject: "",

  };

  const loadData = () => {
    getAllocation().then(setFacultyCollection);
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
      deleteallocationData(row);
      loadData();
    }
    toast.warning("Allocated Faculty Delete Sucessfully");
  };
  const handleEditClick = (row) => (event) => {
    event.stopPropagation();
    setCurrentRow({
      id: row._id ? row._id : "",
      facultyName: row.facultyName ? row.facultyName : "",
      branch : row.branch ? row.branch : "",
      semester : row.semester ? row.semester : "",
      subject : row.subject ? row.subject : "",  
    });
    setOpen(true);
  };

  const columns = [
    { field: "id", headerName: "SR.", width: 50 },
    { field: "facultyName", headerName: "Facuty Name", width: 200 },
    { field: "branch", headerName: "Qulification ", width: 200 },
    { field: "semester", headerName: "Expirience ", width: 200 },
    { field: "subject", headerName: "Expertise ", width: 200 },
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
        <AllocationDialog
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
        Faculty Allocate
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

export default AllocationCollection;
