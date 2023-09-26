import * as React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Logo from "../image/Logo.png"

export default function MuiLogo({ sx, ...props }) {
  return (
    <AspectRatio
      ratio="1"
      variant="plain"
      {...props}
      sx={[
        {
          width: 36,
          borderRadius: 'sm',
          marginLeft:"100px"
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      <div>
        <img  src={Logo} alt="" />
      </div>
    </AspectRatio>
  );
}
