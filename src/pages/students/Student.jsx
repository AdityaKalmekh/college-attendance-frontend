import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";
import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { css } from "@emotion/react";
import { deletestuentData, getStudent } from "../../api/student";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import { DataGrid } from "@mui/x-data-grid";
import { GridActionsCellItem } from "@mui/x-data-grid-pro";
import { toast } from "react-toastify";
import Loading from "../../common/Loader";
import useProgress from "../../hooks/useProgress";
import ConfirmDialog from "../../common/ConFirmDialog";
// import CreateProductForm from "./dialogForproduct";
import StudentDialog from "./AddStudentDailoge";

const initialValues = {
  hsn: "",
  product: "",
  igst: "",
  cgst: "",
  firebaseId: "",
};

const Product = () => {
  const [product, setProduct] = useState([]);
  console.log(product);
  const [currentRow, setCurrentRow] = useState(initialValues);
  const [open, setOpen] = useState(false);
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: "",
    subTitle: "",
  });

  const [getAllProduct, loading] = useProgress(getStudent);
  const handleClickOpen = () => {
    setCurrentRow(initialValues);
    setOpen(true);
  };

  const loadData = () => {
    getAllProduct().then((res) => {
      setProduct(res);
      // console.log(res);
    });
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleClose = () => {
    loadData();
    setOpen(false);
  };

  const handleEditClick = (row) => (event) => {
    event.stopPropagation();
    setCurrentRow({
      hsn: row.hsn ? row.hsn : initialValues.hsn,
      product: row.product ? row.product : initialValues.product,
      igst: row.igst ? row.igst : initialValues.igst,
      cgst: row.cgst ? row.cgst : initialValues.cgst,
      firebaseId: row.firebaseId,
    });
    setOpen(true);
  };

  const onDelete = (row) => {
    setConfirmDialog({
      ...confirmDialog,
      isOpen: false,
    });
    deletestuentData(row)
      .then(() => {
        loadData();
        toast.success("Product Delete successfully");
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
    // { field: "id", headerName: "SR.", width: 50 },
    // { field: "firebaseId", headerName: "ID", width: 200 },
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
            Add Product
          </Button>
          {open && (
            <StudentDialog handleClose={handleClose} currentRow={currentRow} />
          )}
          <div style={{ height: 475, width: "100%" }}>
            <DataGrid
              editMode="row"
              rows={product?.map((item, index) => {
                // console.log(product);
                return {
                  ...item,
                  id: index + 1,
                };
              })}
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

export default Product;
