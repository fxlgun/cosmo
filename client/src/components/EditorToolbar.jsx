import * as React from "react";

import Box, { BoxProps } from "@mui/joy/Box";

export default function EditorToolbar({ sx, ...props }) {
  return (
    <Box
      {...props}
      sx={[
        {
          display: "flex",
          gap: 0.5,
          "& > button": { "--Icon-fontSize": "16px" },
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    ></Box>
  );
}
