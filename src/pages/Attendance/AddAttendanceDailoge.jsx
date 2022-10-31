import { Grid, Button, TextField } from "@mui/material";
import { toast } from "react-toastify";
import Modal from "../../common/Modal";
import * as React from "react";
import { useRef, useState } from "react";
import useProgress from "../../hooks/useProgress";
import { Form, Formik } from "formik";
import Loading from "../../common/Loader";
import FormikController from "../../formik/FormikController";
import { createBranch, updateBranch } from "../../api/Branch";
import { GridActionsCellItem } from "@mui/x-data-grid";
import Checkbox from "@mui/material/Checkbox";
import { DataGrid } from "@mui/x-data-grid";

const AttendenceDailog = ({
  handleClickClose,
  open,
  onCancel,
  loadData,
  currentRow,
}) => {
  const formikRef = useRef();
  const [createNewInvoice, createLoading] = useProgress(createBranch);
  const [updateExistingInvioce, updateLoading] = useProgress(updateBranch);
  const [fieldvalues, setFieldValues] = useState();
  const [totalSem, setTotalSem] = useState();
  console.log({ totalSem });
  console.log(fieldvalues);
  const [counter, setCounter] = useState(0);
  // const [inputValues, setInputValues] = useState();
  // console.log(inputValues);
  const onOk = () => {
    formikRef.current.submitForm().then((values) => {
      if (values) {
        const modifiedValues = {
          ...values,
          tsem: totalSem,
        };
        if (currentRow.firebaseId) {
          updateExistingInvioce(modifiedValues).then(() => {
            toast.success("Branch updated successfully");
            handleClickClose();
          });
        } else {
          createNewInvoice(modifiedValues).then(() => {
            toast.success("Branch created successfully");
            handleClickClose();
          });
        }
      }
    });
  };

  const handleClick = () => {
    setCounter(counter + 1);
  };

  const handleOnChange = (e) => {
    const N = e.target.value;
    setTotalSem(N);
    let arr = [];
    for (let i = 1; i <= e.target.value; i++) {
      arr.push(i);
    }
    setFieldValues(arr);
  };

  const handleSharedClick = (row) => async (event) => {
    // await updatePropertyCollection({ ...row, shared: event.target.checked });
    if (event.target.checked === true) {
      toast.success("Property Unshare successful");
    } else {
      toast.success("Property share successful");
    }
    loadData();
  };

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "lastName",
      headerName: "Last name",
      width: 150,
      editable: true,
    },
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
  const rows = [
    { id: 1, lastName: "Snow" },
    { id: 2, lastName: "Lannister" },
    { id: 3, lastName: "Lannister" },
    { id: 4, lastName: "Stark" },
    { id: 5, lastName: "Targaryen" },
    { id: 6, lastName: "Melisandre" },
    { id: 7, lastName: "Clifford" },
    { id: 8, lastName: "Frances" },
    { id: 9, lastName: "Roxie" },
  ];

  return (
    <Modal
      title={currentRow.firebaseId ? "Update Branch" : "Create Branch"}
      fullScreen
      onOk={onOk}
      onCancel={handleClickClose}
      sx={{ minHeight: (createLoading || updateLoading) && "200px" }}
    >
      {createLoading || updateLoading ? (
        <Loading
          title={
            currentRow.firebaseId
              ? "Please wait updating your details..."
              : "Please wait creating your details..."
          }
          top="65%"
        />
      ) : (
        <Grid item xs={10} border="solid" borderRadius="1rem">
          <Formik
            innerRef={formikRef}
            initialValues={currentRow}
            onSubmit={(values) => values}
          >
            {(formik) => (
              <Form>
                <Grid
                  container
                  display="flex"
                  flex-direction="row"
                  padding="1rem"
                >
                  <div style={{ height: 475, width: "100%" }}>
                    <DataGrid
                      editMode="row"
                      rows={rows}
                      columns={columns}
                      // css={css`
                      //   height: calc(100vh - 1500px - 30px) !important;
                      // `}
                      experimentalFeatures={{ newEditingApi: true }}
                    />
                  </div>
                </Grid>
              </Form>
            )}
          </Formik>
        </Grid>
      )}
    </Modal>
  );
};

export default AttendenceDailog;
