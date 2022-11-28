import { Button } from "@mui/material";
import { getBranch } from "../../api/Branch";
import { DataGrid } from "@mui/x-data-grid";
import { css } from "@emotion/react";
import BranchDailog from "./AddBranchDailoge";
import { useState, useEffect } from "react";
import { GridActionsCellItem } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
// import { deletestuentData } from "../../api/student";
import { deletebranchData } from "../../api/Branch";

const BranchCollection = () => {
  const [open, setOpen] = useState(false);
  const [branchCollection, setBranchCollection] = useState([]);
  const [currentRow, setCurrentRow] = useState();
  const [branchArray, setBranchArray] = useState([]);

  const initialValues = {
    bname: "",
    tsem: "",
    tsubname: "",
  };
  console.log({ branchArray });

  const displayData = (item) => {
    const bname = item?.branch_name;
    const totalsem = item?.semesters.length;
    let totalsub = 0;
    item?.semesters.forEach(function (item2) {
      totalsub += item2?.subject.length;
    });
    setBranchArray((prev) => {
      return [
        ...prev,
        { branch_name: bname, semesters: totalsem, subject: totalsub },
      ];
    });
  };

  const loadData = () => {
    getBranch().then(setBranchCollection);
  };

  useEffect(() => {
    loadData();
    displayData();
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
    console.log(row);
    event.stopPropagation();
    setCurrentRow({
      branch_name: row.branch_name ? row.branch_name : "",
      semesters: row.semesters ? row.semesters : "",
      subject: row.subject ? row.subject : "",
    });
    setOpen(true);
  };

  const columns = [
    { field: "id", headerName: "SR.", width: 50 },
    { field: "branch_name", headerName: "Branch Name", width: 150 },
    { field: "semesters", headerName: "Total Sem", width: 150 },
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

  return (
    <>
      {open && (
        <BranchDailog
          open={open}
          handleClickClose={handleClickClose}
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
          rows={branchCollection?.map((branch, index) => ({
            ...branch,
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
