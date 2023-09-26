import React from "react";
import {
  Avatar,
  Box,
  Button,
  CssBaseline,
  CssVarsProvider,
  Divider,
  Dropdown,
  GlobalStyles,
  IconButton,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  Sheet,
  Table,
  Typography,
} from "@mui/joy";
import Post from "../components/Post";
import Layout from "../components/Layout";
import Navigation from "../components/Navigation";
import MenuIcon from "@mui/icons-material/Menu";
import FindInPageRoundedIcon from "@mui/icons-material/FindInPageRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import BookRoundedIcon from "@mui/icons-material/BookRounded";

const Header = ({ user, setDrawerOpen }) => {
  return (
    <Layout.Header>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: 1.5,
        }}
      >
        <IconButton
          variant="outlined"
          size="sm"
          onClick={() => setDrawerOpen(true)}
          sx={{ display: { sm: "none" } }}
        >
          <MenuIcon />
        </IconButton>

        <Typography
          sx={{
            marginLeft: "10px",
            fontSize: "30px",
            fontFamily: "League Spartan",
            paddingTop: "5px",
          }}
          fontWeight="xl"
        >
          COSMO
        </Typography>
      </Box>
      <Input
        size="sm"
        variant="outlined"
        placeholder="Search anything…"
        startDecorator={<SearchRoundedIcon color="primary" />}
        sx={{
          flexBasis: "500px",
          display: {
            xs: "none",
            sm: "flex",
          },
          boxShadow: "sm",
        }}
      />
      <Box sx={{ display: "flex", flexDirection: "row", gap: 1.5 }}>
        <IconButton
          size="sm"
          variant="outlined"
          color="neutral"
          sx={{ display: { xs: "inline-flex", sm: "none" } }}
        >
          <SearchRoundedIcon />
        </IconButton>

        <Dropdown>
          <MenuButton sx={{width:"65%", borderRadius:"50%", border:"none"}}>
            <Avatar src={user?.photoURL} alt={user.displayName} />
          </MenuButton>
          <Menu>
            <MenuItem>Profile</MenuItem>
            <MenuItem>My account</MenuItem>
            <MenuItem>Logout</MenuItem>
          </Menu>
        </Dropdown>
      </Box>
    </Layout.Header>
  );
};

export default Header;
