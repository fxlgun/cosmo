import * as React from 'react';
import Box from "@mui/joy/Box";
import CircularProgress from "@mui/joy/CircularProgress";

export default function Loader() {
  return (
    <Box
      sx={{
        backgroundColor: "black",
        width: "100dvw",
        display: "flex",
        gap: 2,
        alignItems: "center",
        justifyContent: "center",
        height: "100dvh"
      }}
    >
      <CircularProgress variant="plain" />
    </Box>
  );
}