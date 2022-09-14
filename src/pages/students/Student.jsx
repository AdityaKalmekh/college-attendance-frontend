import { Button } from "@mui/material";
import { getStudent } from "../../api/student";
import { DataGrid } from "@mui/x-data-grid";
import { css } from "@emotion/react";
import StudentDialog from "./AddStudentDailoge";
import { useState, useEffect } from "react";
import { GridActionsCellItem } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import { deletestuentData } from "../../api/student";
import AddMultipleStudents from "./AddMultipalStudent";
import Checkbox from "@mui/material/Checkbox";
import { updateStudent } from "../../api/student";

const StudentCollection = () => {
  const [open, setOpen] = useState(false);
  const [openAddFileDialog, setOpenAddFileDialog] = useState(false);
  const [studentCollection, setStudentCollection] = useState([]);
  const [currentRow, setCurrentRow] = useState();

  const initialValues = {
    fname: "",
    mname: "",
    sname: "",
    address: "",
    enroll: "",
    addmitiondate: "",
    course: "",
    sem: "",
    div: "",
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

  const handleOpenAddFileDialog = () => {
    setOpenAddFileDialog(true);
  };

  const handleCloseAddFileDialog = () => {
    setOpenAddFileDialog(false);
  };

  const handleDeleteClick = (row) => (event) => {
    event.stopPropagation();
    if (window.confirm("Are you sure to delete?") === true) {
      deletestuentData(row);
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

  const handleSharedClick = (row) => async (event) => {
    await updateStudent({ ...row, shared: event.target.checked });
    loadData();
  };
  const columns = [
    { field: "id", headerName: "SR.", width: 50 },
    { field: "firebaseId", headerName: "ID", width: 200 },
    { field: "fname", headerName: "First Name", width: 150 },
    { field: "mname", headerName: "Middle Name", width: 150 },
    { field: "sname", headerName: "SureName", width: 150 },
    { field: "address", headerName: "Address", width: 150 },
    { field: "enroll", headerName: "Enrollment No", width: 150 },
    { field: "addmitiondate", headerName: "Addmition Date", width: 150 },
    { field: "course", headerName: "Course", width: 150 },
    { field: "sem", headerName: "Sem", width: 150 },
    { field: "div", headerName: "Div", width: 150 },
    { field: "pcontact", headerName: "Parents Contact ", width: 150 },
    { field: "scontact", headerName: "Student Contact ", width: 150 },
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
    // {
    //   field: "more",
    //   headerName: "More",
    //   width: 80,
    //   renderCell: ({ row }) => (
    //     <strong>
    //       <GridActionsCellItem
    //       // icon={<MoreIcon />}
    //       // label="More"
    //       // onClick={() => {
    //       //   ReactGA.event({
    //       //     category: row.name,
    //       //     action: "test action",
    //       //     label: "test label",
    //       //     value: row.price,
    //       //   });
    //       //   navigate(`/${row.city}/${row.area}/${row.firebaseId}`);
    //       // }}
    //       // color="inherit"
    //       />
    //     </strong>
    //   ),
    // },
    {
      field: "Shared",
      headerName: "Shared",
      width: 80,
      renderCell: ({ row }) => (
        <strong>
          <GridActionsCellItem
            icon={<Checkbox checked={row?.shared} />}
            label="Check"
            onClick={handleSharedClick(row)}
            color="inherit"
          />
        </strong>
      ),
    },
  ];

  return (
    <>
      {open && (
        <StudentDialog
          open={open}
          onCancel={handleClickClose}
          loadData={loadData}
          currentRow={currentRow}
        />
      )}
      {openAddFileDialog && (
        <AddMultipleStudents
          openAddFileDialog={openAddFileDialog}
          closeAddFileDialog={handleCloseAddFileDialog}
        />
      )}
      <Button
        onClick={handleClickOpen}
        variant="contained"
        sx={{ margin: "10px" }}
      >
        Add
      </Button>
      <Button onClick={handleOpenAddFileDialog} variant="contained">
        Add From Excel File
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

export default StudentCollection;
