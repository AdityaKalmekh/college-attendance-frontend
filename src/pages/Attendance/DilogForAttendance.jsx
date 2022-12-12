import { DialogTitle, Button, Box, Dialog, Grid } from "@material-ui/core";
import Checkbox from "@mui/material/Checkbox";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import { css } from "@emotion/react";
import { useRef } from "react";
import Modal from "../../common/Modal";
import { Form, Formik } from "formik";
import { Card, Typography } from "@mui/material";
import { display } from "@mui/system";

const DialogForAttendance = ({
  handleClickClose,
  open,
  onCancel,
  loadData,
  currentRow,
}) => {
  const formikRef = useRef();

  const onOk = () => {
    formikRef.current.submitForm().then((values) => {});
  };

  const columns = [
    { field: "id", headerName: "ID", width: 20 },
    {
      field: "lastName",
      headerName: "Student Name",
      width: 250,
      editable: true,
    },
    {
      field: "1",
      headerName: "1",
      width: 60,
      renderCell: ({ row }) => (
        <strong>
          <GridActionsCellItem icon={<Checkbox />} label="1" />
        </strong>
      ),
    },
    {
      field: "2",
      headerName: "2",
      width: 60,
      renderCell: ({ row }) => (
        <strong>
          <GridActionsCellItem icon={<Checkbox />} label="2" />
        </strong>
      ),
    },
    {
      field: "3",
      headerName: "3",
      width: 60,
      renderCell: ({ row }) => (
        <strong>
          <GridActionsCellItem icon={<Checkbox />} label="3" />
        </strong>
      ),
    },
    {
      field: "4",
      headerName: "4",
      width: 60,
      renderCell: ({ row }) => (
        <strong>
          <GridActionsCellItem icon={<Checkbox />} label="Test" />
        </strong>
      ),
    },
    {
      field: "5",
      headerName: "5",
      width: 60,
      renderCell: ({ row }) => (
        <strong>
          <GridActionsCellItem icon={<Checkbox />} label="Test" />
        </strong>
      ),
    },
    {
      field: "6",
      headerName: "6",
      width: 60,
      renderCell: ({ row }) => (
        <strong>
          <GridActionsCellItem icon={<Checkbox />} label="Test" />
        </strong>
      ),
    },
    {
      field: "7",
      headerName: "7",
      width: 60,
      renderCell: ({ row }) => (
        <strong>
          <GridActionsCellItem icon={<Checkbox />} label="Test" />
        </strong>
      ),
    },
    {
      field: "8",
      headerName: "8",
      width: 60,
      renderCell: ({ row }) => (
        <strong>
          <GridActionsCellItem icon={<Checkbox />} label="Test" />
        </strong>
      ),
    },
    {
      field: "9",
      headerName: "9",
      width: 60,
      renderCell: ({ row }) => (
        <strong>
          <GridActionsCellItem icon={<Checkbox />} label="Test" />
        </strong>
      ),
    },
    {
      field: "10",
      headerName: "10",
      width: 60,
      renderCell: ({ row }) => (
        <strong>
          <GridActionsCellItem icon={<Checkbox />} label="Test" />
        </strong>
      ),
    },
    {
      field: "11",
      headerName: "11",
      width: 60,
      renderCell: ({ row }) => (
        <strong>
          <GridActionsCellItem icon={<Checkbox />} label="Test" />
        </strong>
      ),
    },
    {
      field: "12",
      headerName: "12",
      width: 60,
      renderCell: ({ row }) => (
        <strong>
          <GridActionsCellItem icon={<Checkbox />} label="Test" />
        </strong>
      ),
    },
    {
      field: "13",
      headerName: "13",
      width: 60,
      renderCell: ({ row }) => (
        <strong>
          <GridActionsCellItem icon={<Checkbox />} label="Test" />
        </strong>
      ),
    },
    {
      field: "14",
      headerName: "14",
      width: 60,
      renderCell: ({ row }) => (
        <strong>
          <GridActionsCellItem icon={<Checkbox />} label="Test" />
        </strong>
      ),
    },
    {
      field: "15",
      headerName: "15",
      width: 60,
      renderCell: ({ row }) => (
        <strong>
          <GridActionsCellItem icon={<Checkbox />} label="Test" />
        </strong>
      ),
    },
  ];

  const rows = [
    { id: 1, lastName: "Snow", firstName: "Jon" },
    { id: 2, lastName: "Joy", firstName: "Don" },
  ];

  return (
    <>
      <Modal onOk={onOk} fullScreen onCancel={handleClickClose}>
        <Grid item xs={12}>
          <Formik
            innerRef={formikRef}
            initialValues={currentRow}
            onSubmit={(values) => values}
          >
            {(formik) => (
              <Form>
                <Grid>
                  <Card sx={{ padding: "1rem" }}>
                    <Grid container>
                      <Grid item md={4}>
                        <Typography>
                          <b>Branch:</b>
                        </Typography>
                        <br />
                        <Typography>
                          <b>Faculty:</b>
                        </Typography>
                      </Grid>
                      <Grid item md={4}>
                        <Typography>
                          <b>Subject:</b>
                        </Typography>
                        <br />
                        <Typography>
                          <b>Semester:</b>
                        </Typography>
                      </Grid>
                      <Grid item md={4}>
                        <Typography>
                          <b>Date:</b>{" "}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Card>
                </Grid>
                <br />
                <Grid item xs={12}>
                  <Grid>
                    <div style={{ height: 500, width: "100%" }}>
                      <DataGrid
                        editMode="row"
                        const
                        rows={rows}
                        columns={columns}
                        css={css`
                          height: calc(100vh - 1500px - 30px) !important;
                        `}
                        experimentalFeatures={{ newEditingApi: true }}
                        hideFooter
                      />
                    </div>
                  </Grid>
                  <br />
                </Grid>
              </Form>
            )}
          </Formik>
        </Grid>
      </Modal>
    </>
  );
};

export default DialogForAttendance;
