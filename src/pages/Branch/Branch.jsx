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
// import { async } from "@firebase/util";

const BranchCollection = () => {
  const [open, setOpen] = useState(false);
  const [branchCollection, setBranchCollection] = useState([]);
  const [currentRow, setCurrentRow] = useState();
  const [branchArray, setBranchArray] = useState([]);
  let branchContainer = [];

  const initialValues = {
    _id: "",
    branchname: "",
    semesters: [],
  };
  // let dt = [];

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
      branchContainer.push({branch: item.branchname,sem: item.semesters.length}); 
    }) 
  }
  console.log({branchContainer});

  const loadData = () => {
    getBranch().then(setBranchCollection);
  };

  const addNewBranch = (newBranch) => {
    console.log({newBranch});
    setBranchCollection(prev => prev.concat(newBranch))
  }
  console.log({branchCollection});
  
  useEffect(() => {
    loadData();
    // displayData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  useEffect(() => {
    displayData()
  },[]);

  const handleClickOpen = () => {
    setCurrentRow(initialValues);
    setOpen(true);
  };

  const handleClickClose = () => {
    setOpen(false);
  };

  const handleDeleteClick = (row) => (event) => {
    console.log(row);
    // event.stopPropagation();
    // if (window.confirm("Are you sure to delete?") === true) {
    //   deletebranchData(row);
    //   loadData();
    // }
  };
  const handleEditClick = (row) => (event) => {
    console.log(row);
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
            id : index+1
            // return ({
            //   branchname : branch.branchname,
            //   totalsem : branch.semesters.length,
            //   semester : branch.semesters,
            //   id : index + 1
            // })
          })
            
          //   ({
          //   ...branch,
          //   semesters: branch.semesters.length,
          //   id: index + 1,
          // }))}
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
