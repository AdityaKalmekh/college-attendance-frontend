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
