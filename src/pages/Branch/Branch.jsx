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
import { async } from "@firebase/util";

const BranchCollection = () => {
  const [open, setOpen] = useState(false);
  const [branchCollection, setBranchCollection] = useState([]);
  const [currentRow, setCurrentRow] = useState();
  const [branchArray, setBranchArray] = useState([]);

  const initialValues = {
    branchname: "",
    totalsem: "",
    semesters: "",
  };
  // let dt = [];
  console.log({ branchArray });

  // const displayData = (item) => {
  //   const bname = item?.branch_name;
  //   const totalsem = item?.semesters.length;
  //   let totalsub = 0;
  //   item?.semesters.forEach(function (item2) {
  //     totalsub += item2?.subject.length;
  //   });
  //   setBranchArray((prev) => {
  //     return [
  //       ...prev,
  //       { branch_name: bname, semesters: totalsem, subject: totalsub },
  //     ];
  //   });
  // };
  const displayData = () => {
    branchCollection.forEach(item => {
      const branch = item.branchname;
      const sem = item.sem.length;

      console.log(branch);
      console.log(sem);

      setBranchArray(prev => {
        return [...prev,{branchname:branch,totalsem:sem}]
      })
    }) 
  }

  console.log(branchArray);
  const loadData = () => {
    getBranch().then(setBranchCollection);
    // displayData();
  };

  useEffect(() => {
    loadData();
    // displayData();
  }, []);

  useEffect(() => {
    displayData()
  })

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
      branchname: row.branchname ? row.branchname : "",
      totalsem: row.totalsem ? row.totalsem : "",
      subject: row.subject ? row.subject : "",
      firebaseId: row.firebaseId,
    });
    setOpen(true);
  };

  const columns = [
    { field: "id", headerName: "SR.", width: 50 },
    { field: "branchname", headerName: "Branch Name", width: 150 },
    { field: "totalsem", headerName: "Total Sem", width: 150 },
    // { field: "tsubname", headerName: "Total Subject", width: 150 },
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
  console.log({ branchCollection });
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
          rows={branchArray?.map((branch, index) => ({
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
