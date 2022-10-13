import { Box, Typography, Link } from "@mui/material";
import { useGlobalContext } from "../context/GlobalContext";

function Copyright({ textSx }) {
  const { company } = useGlobalContext();

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
