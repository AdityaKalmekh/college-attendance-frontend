import { Box, Typography } from "@mui/material";

function Copyright({ textSx }) {
  return (
    <Box
      sx={{
        position: "fixed",
        left: 0,
        bottom: 0,
        width: "100%",
        marginBottom: "5px",
        textAlign: "center",
      }}
    >
      <Typography
        variant="body2"
        color="text.secondary"
        align="center"
        sx={textSx}
      >
        {"Copyright © "}
        {new Date().getFullYear()} all rights reserved.
      </Typography>
    </Box>
  );
}

export default Copyright;
