import * as React from "react";
import Box from "@mui/joy/Box";
import IconButton from "@mui/joy/IconButton";
import List from "@mui/joy/List";
import ListSubheader from "@mui/joy/ListSubheader";
import ListItem from "@mui/joy/ListItem";
import ListItemButton from "@mui/joy/ListItemButton";
import ListItemDecorator from "@mui/joy/ListItemDecorator";
import ListItemContent from "@mui/joy/ListItemContent";

// Icons import
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import { LogOutAPI } from "../api/auth";

export default function Navigation({ page }) {
  return (
    <List size="md" sx={{ "--ListItem-radius": "8px", "--List-gap": "4px" }}>
      <ListItem nested>
        <ListSubheader>
          Browse
          <IconButton
            size="md"
            variant="plain"
            color="primary"
            sx={{ "--IconButton-size": "24px", ml: "auto" }}
          >
            <KeyboardArrowDownRoundedIcon color="primary" />
          </IconButton>
        </ListSubheader>
        <List
          aria-labelledby="nav-list-browse"
          sx={{
            "& .JoyListItemButton-root": { p: "8px" },
          }}
        >
          <ListItem>
            <ListItemButton selected>
              <ListItemDecorator>
                <HomeOutlinedIcon />
              </ListItemDecorator>
              <ListItemContent>Home</ListItemContent>
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton>
              <ListItemDecorator sx={{ color: "neutral.500" }}>
                <AccountCircleRoundedIcon />
              </ListItemDecorator>
              <ListItemContent>Profile</ListItemContent>
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton onClick={() => LogOutAPI()}>
              <ListItemDecorator sx={{ color: "neutral.500" }}>
                <LogoutRoundedIcon />
              </ListItemDecorator>
              <ListItemContent>Log out</ListItemContent>
            </ListItemButton>
          </ListItem>
        </List>
      </ListItem>
      <ListItem nested sx={{ mt: 2 }}>
        <ListSubheader>
          Tags
          <IconButton
            size="md"
            variant="plain"
            color="primary"
            sx={{ "--IconButton-size": "24px", ml: "auto" }}
          >
            <KeyboardArrowDownRoundedIcon color="primary" />
          </IconButton>
        </ListSubheader>
        <List
          aria-labelledby="nav-list-tags"
          size="md"
          sx={{
            "--ListItemDecorator-size": "32px",
          }}
        >
          <ListItem>
            <ListItemButton>
              <ListItemDecorator>
                <Box
                  sx={{
                    width: "10px",
                    height: "10px",
                    borderRadius: "99px",
                    bgcolor: "primary.300",
                  }}
                />
              </ListItemDecorator>
              <ListItemContent>Personal</ListItemContent>
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton>
              <ListItemDecorator>
                <Box
                  sx={{
                    width: "10px",
                    height: "10px",
                    borderRadius: "99px",
                    bgcolor: "danger.400",
                  }}
                />
              </ListItemDecorator>
              <ListItemContent>Work</ListItemContent>
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton>
              <ListItemDecorator>
                <Box
                  sx={{
                    width: "10px",
                    height: "10px",
                    borderRadius: "99px",
                    bgcolor: "warning.500",
                  }}
                />
              </ListItemDecorator>
              <ListItemContent>Travels</ListItemContent>
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton>
              <ListItemDecorator>
                <Box
                  sx={{
                    width: "10px",
                    height: "10px",
                    borderRadius: "99px",
                    bgcolor: "success.400",
                  }}
                />
              </ListItemDecorator>
              <ListItemContent>Concert tickets</ListItemContent>
            </ListItemButton>
          </ListItem>
        </List>
      </ListItem>
    </List>
  );
}
