import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";
import { useState } from "react";
import { Box } from "@mui/material";
import { css } from "@emotion/react";
import { deleteUserData, getUsers } from "../../api/users";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import { DataGrid } from "@mui/x-data-grid";
import { GridActionsCellItem } from "@mui/x-data-grid-pro";
import { toast } from "react-toastify";
import Loading from "../../common/Loader";
import { useGlobalContext } from "../../context/GlobalContext";
import useProgress from "../../hooks/useProgress";
import ConfirmDialog from "../../common/ConFirmDialog";
import CreateUserForm from "./dialog";

const initialValues = {
  contact: "",
  firstName: "",
  lastName: "",
  email: "",
  firebaseId: "",
  role: "agent",
};

const Users = () => {
  const { users, setUsers } = useGlobalContext();

  const [currentRow, setCurrentRow] = useState(initialValues);
  const [open, setOpen] = useState(false);
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: "",
    subTitle: "",
  });

  const [getAllUsers, loading] = useProgress(getUsers);
  const handleClickOpen = () => {
    setCurrentRow(initialValues);
    setOpen(true);
  };

  const loadData = () => {
    getAllUsers().then(setUsers);
  };

  const handleClose = () => {
    setOpen(false);
    loadData();
  };

  const handleEditClick = (row) => (event) => {
    event.stopPropagation();
    setCurrentRow({
      firstName: row.firstName ? row.firstName : initialValues.firstName,
      lastName: row.lastName ? row.lastName : initialValues.lastName,
      contact: row.contact ? row.contact : initialValues.contact,
      email: row.email ? row.email : initialValues.email,
      role: row.role ? row.role : initialValues.role,
      firebaseId: row.firebaseId,
    });
    setOpen(true);
  };

  const onDelete = (row) => {
    setConfirmDialog({
      ...confirmDialog,
      isOpen: false,
    });
    deleteUserData(row)
      .then(() => {
        loadData();
        toast.success("User Delete successfully");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDeleteClick = (row) => (event) => {
    event.stopPropagation();
    setConfirmDialog({
      isOpen: true,
      title: "Are you sure to delete this record?",
      subTitle: "You can't undo this operation",
      onConfirm: () => {
        onDelete(row);
      },
    });
  };

  const columns = [
    { field: "id", headerName: "ID", width: 80 },
    {
      field: "email",
      headerName: "Email",
      width: 250,
    },
    {
      field: "firstName",
      headerName: "First name",
      width: 150,
    },
    {
      field: "lastName",
      headerName: "Last name",
      width: 150,
    },
    {
      field: "contact",
      headerName: "Contact No",
      headerAlign: "left",
      type: "number",
      width: 150,
      align: "left",
    },
    {
      field: "role",
      headerName: "Role",
      width: 130,
    },
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
    <Box>
      {loading ? (
        <Loading title="Loading Users..." />
      ) : (
        <>
          <Button
            color="primary"
            startIcon={<AddIcon />}
            onClick={handleClickOpen}
          >
            Add User
          </Button>
          {open && (
            <CreateUserForm handleClose={handleClose} currentRow={currentRow} />
          )}
          <div style={{ height: 475, width: "100%" }}>
            <DataGrid
              editMode="row"
              rows={users.map((item, index) => ({ ...item, id: index + 1 }))}
              columns={columns}
              css={css`
                height: calc(100vh - 1500px - 30px) !important;
              `}
              experimentalFeatures={{ newEditingApi: true }}
            />
          </div>
          {confirmDialog && (
            <ConfirmDialog
              confirmDialog={confirmDialog}
              setConfirmDialog={setConfirmDialog}
            />
          )}
        </>
      )}
    </Box>
  );
};

export default Users;
