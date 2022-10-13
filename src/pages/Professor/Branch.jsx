import { Button } from "@mui/material";
import { getBranch, deletebranchData } from "../../api/Branch";
import { DataGrid } from "@mui/x-data-grid";
import { css } from "@emotion/react";
import BranchDialog from "./AddBranchDailoge";
import { useState, useEffect } from "react";
import { GridActionsCellItem } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";

const BranchCollection = () => {
  const [open, setOpen] = useState(false);
  const [branchDetails, setbranchDetails] = useState([]);
  const [currentRow, setCurrentRow] = useState();

  const initialValues = {
    bname: "",
    tsem: "",
  };

  const loadData = () => {
    getBranch().then(setbranchDetails);
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
      deletebranchData(row);
      loadData();
    }
  };
  const handleEditClick = (row) => (event) => {
    event.stopPropagation();
    setCurrentRow({
      fname: row.fname ? row.fname : "",
      mname: row.mname ? row.mname : "",
      sname: row.sname ? row.sname : "",
      address: row.address ? row.address : "",
      enroll: row.enroll ? row.enroll : "",
      priaddmitiondatece: row.addmitiondate ? row.addmitiondate : "",
      course: row.course ? row.course : "",
      sem: row.sem ? row.sem : "",
      div: row.div ? row.div : "",
      pcontact: row.pcontact ? row.pcontact : "",
      scontact: row.scontact ? row.scontact : "",
      image: row.image ? row.image : "",
      shared: row.shared ? row.shared : "",
      firebaseId: row.firebaseId,
    });
    setOpen(true);
  };
  const columns = [
    { field: "id", headerName: "SR.", width: 50 },
    { field: "firebaseId", headerName: "ID", width: 200 },
    { field: "bname", headerName: "Branch", width: 150 },
    { field: "tsem", headerName: "Total Sem", width: 150 },
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
        <BranchDialog
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
          rows={branchDetails?.map((student, index) => ({
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

export default BranchCollection;
