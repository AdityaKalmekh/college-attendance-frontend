/* eslint-disable no-unused-vars */
import { Box, Grid } from "@material-ui/core";
import * as React from "react";
import { useRef } from "react";
import Modal from "../../common/Modal";
import { DataGrid } from "@mui/x-data-grid";

const DialogForAttendance = ({
  open,
  handleClickClose,
  loadData,
  currentRow,
}) => {
  const onOk = () => {};
  return (
    <>
      <Modal
        title={"Attendance Sheet"}
        onOk={onOk}
        fullScreen
        onCancel={handleClickClose}
      >
        <Box border="2px solid black"></Box>
        <Box>
          <Grid>
            <h1> data grid will be shown</h1>
          </Grid>
        </Box>
      </Modal>
    </>
  );
};

export default DialogForAttendance;
