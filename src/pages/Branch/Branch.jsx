import { Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { css } from "@emotion/react";
import BranchDailog from "./AddBranchDailoge";
import { useState, useEffect } from "react";
import { GridActionsCellItem } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import useHttp from "../../hooks/useHttp";
import { toast } from "react-toastify";

const BranchCollection = () => {
  const [open, setOpen] = useState(false);
  const [branchCollection, setBranchCollection] = useState([]);
  const [currentRow, setCurrentRow] = useState();
  const {error,sendRequest: fetchTasks} = useHttp();

  if (error){
    toast.error(error);
  }

  const initialValues = {
    _id: "",
    branchname: "",
    semesters: [],
  };

  useEffect(() => {
    fetchTasks({url:'/getBranch',method:'get'},loadData);
  }, [fetchTasks]);

  const loadData = (data) => {
    setBranchCollection(data);
  };

  const addNewBranch = (newBranch) => {
    setBranchCollection(prev => prev.concat(newBranch))
  }
  
  const handleClickOpen = () => {
    setCurrentRow(initialValues);
    setOpen(true);
  };

  const handleClickClose = () => {
    setOpen(false);
  };

  const afterDelection = (id,taskData) => {
    if (taskData){
      const indexdelete = branchCollection.findIndex(branch => branch._id === id);
      setBranchCollection(prev => prev.filter((_,index)=>index !== indexdelete))
      toast.success("Record Deleted Successfully");
    }
  }

  const handleDeleteClick = (row) => (event) => {
    event.stopPropagation();
    if (window.confirm("Are you sure to delete?") === true) {
      fetchTasks({url : '/deleteBranch',method:'delete',id:row._id},afterDelection.bind(null,row._id))
    }
  };

  const handleEditClick = (row) => (event) => {
    event.stopPropagation();
    setCurrentRow({
      _id : row._id ? row._id : "",
      branchname: row.branchname ? row.branchname : "",
      totalsem: row.totalsem ? row.totalsem : "",
      semesters: row.semesters ? row.semesters : "",
    });
    setOpen(true);
  };

  const columns = [
    { field: "id", headerName: "SR.", width: 50 },
    { field: "branchname", headerName: "Branch Name", width: 150 },
    { field: "totalsem", headerName: "Total Sem", width: 150 },
    { field: "tsubname", headerName: "Total Subject", width: 150 },
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
  
  const countSubjects = (semesters) => {
    let totalSubject = 0;
    semesters.forEach(subject => {
      totalSubject += subject.subject.length;
    });
    return totalSubject;
  }

  return (
    <>
      {open && (
        <BranchDailog
          open={open}
          handleClickClose={handleClickClose}
          loadData={loadData}
          currentRow={currentRow}
          addNewBranch={addNewBranch}
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
          rows={branchCollection?.map((branch, index) => ({
            ...branch,
            totalsem : branch.semesters.length,
            tsubname : countSubjects(branch.semesters),
            id : index+1
          })            
        )}
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
export default BranchCollection;