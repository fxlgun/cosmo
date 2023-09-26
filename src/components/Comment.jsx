import * as React from 'react';
import Avatar from '@mui/joy/Avatar';
import AvatarGroup from '@mui/joy/AvatarGroup';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CardActions from '@mui/joy/CardActions';
import IconButton from '@mui/joy/IconButton';
import Typography from '@mui/joy/Typography';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';

export default function Comment({record}) {
  return (
    <Card
      variant="outlined"
      sx={{
        width: "100%",
        // to make the card resizable
        overflow: 'auto',
        padding: 1.4
      }}
    >
      <Box
        sx={{  
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
        }}
      >
        <Avatar src={record?.photoURL || "/static/images/avatar/1.jpg"} size="sm" /><Typography level="title-md">{record?.displayName}</Typography>
        
      </Box>
      <CardContent>
        
        <Typography level="body-sm">
          {record?.comment}
        </Typography>
      </CardContent>
      
    </Card>
  );
}