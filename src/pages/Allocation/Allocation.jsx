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
import useHttp from "../../hooks/useHttp";

const AllocationCollection = () => {
  const [open, setOpen] = useState(false);
  const [facultyCollection, setFacultyCollection] = useState([]);
  const [currentRow, setCurrentRow] = useState();
  const {sendRequest : sendTaskRequest} = useHttp();

  const initialValues = {
    _id : "",
    facultyName: "",
    branch: "",
    semester: "",
    subject: "",
  };

  const addNewAllocation = (newAllocation) => {
    setFacultyCollection((prev) => prev.concat(newAllocation))
  }

  const reloadAfterDeletion = (id,acknowledgment) => {
    console.log(acknowledgment);
    if (acknowledgment){
      toast.success("Allocated Faculty Delete Sucessfully");
      const indexDelete = facultyCollection.findIndex(faculty => faculty._id === id)
      setFacultyCollection(prev => prev.filter((_,index) => index !== indexDelete))
    }
  }

  const reloadAfterUpdation = (data) => {
      const indexEdit = facultyCollection.findIndex(faculty => faculty._id === data._id)
      facultyCollection[indexEdit] = data
      setFacultyCollection([...facultyCollection])
  }

  console.log(facultyCollection);
  const loadData = (data) => {
    setFacultyCollection(data);
  };

  useEffect(() => {
    sendTaskRequest({url:"/getAllocation",method:"get"},loadData)
  }, [sendTaskRequest]);

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
      sendTaskRequest({url:"/deleteAllocation",method:"delete",id:row._id},reloadAfterDeletion.bind(null,row._id))
      // deleteallocationData(row).then(loadData);
    }
  };
  
  const handleEditClick = (row) => (event) => {
    event.stopPropagation();
    setCurrentRow({
      facultyId : row.facultyId ? row.facultyId : "",
      _id: row._id ? row._id : "",
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
    { field: "branch", headerName: "Branch", width: 200 },
    { field: "semester", headerName: "Semester ", width: 200 },
    { field: "subject", headerName: "Subject ", width: 200 },
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
          addNewAllocation={addNewAllocation}
          reloadAfterUpdation={reloadAfterUpdation}
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