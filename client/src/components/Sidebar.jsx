/* eslint-disable jsx-a11y/anchor-is-valid */
import * as React from "react";
import { styled } from "@mui/joy/styles";
import GlobalStyles from "@mui/joy/GlobalStyles";
import Avatar from "@mui/joy/Avatar";
import Box from "@mui/joy/Box";
import Card from "@mui/joy/Card";
import Divider from "@mui/joy/Divider";
import IconButton from "@mui/joy/IconButton";
import Input from "@mui/joy/Input";
import Link from "@mui/joy/Link";
import LinearProgress from "@mui/joy/LinearProgress";
import List from "@mui/joy/List";
import ListItem from "@mui/joy/ListItem";
import ListItemButton from "@mui/joy/ListItemButton";
import ListItemContent from "@mui/joy/ListItemContent";
import ListItemDecorator from "@mui/joy/ListItemDecorator";
import Typography from "@mui/joy/Typography";
import Sheet from "@mui/joy/Sheet";
import MuiLogo from "./Logo";
import ColorSchemeToggle from "./ColorSchemeToggle";
import { closeSidebar, toggleSidebar } from "../utils";
import "../App.css";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import { HiOutlineHome } from "react-icons/hi"
import { LogOutAPI } from "../api/auth";

const Dropdown = styled("i")(({ theme }) => ({
  color: theme.vars.palette.text.tertiary,
}));

export default function Sidebar() {
  const [deets, setDeets] = useState({});
  let navigate = useNavigate();
  useEffect(() => {
    onAuthStateChanged(auth, async (res) => {
      if (!res?.accessToken) {
        navigate("/login");
      } else {
        const userDeets = await getDoc(doc(db, "users", res.email));
        setDeets(userDeets.data());
      }
    });
  }, []);
  return (
    <Sheet
      className="Sidebar"
      sx={{
        position: "sticky",
        transform:
          "translateX(calc(100% * (var(--SideNavigation-slideIn, 0) - 1)))",
        transition: "transform 0.4s, width 0.4s",
        zIndex: 10000,
        height: "100dvh",
        width: "var(--Sidebar-width)",
        top: 0,
        p: 1.5,
        py: 3,
        flexShrink: 0,
        display: "flex",
        flexDirection: "column",
        gap: 2,
        borderRight: "1px solid",
        borderColor: "divider",
      }}
    >
      <GlobalStyles
        styles={(theme) => ({
          ":root": {
            "--Sidebar-width": "224px",
            [theme.breakpoints.up("lg")]: {
              "--Sidebar-width": "256px",
            },
          },
        })}
      />
      <Box
        className="Sidebar-overlay"
        sx={{
          position: "fixed",
          zIndex: 9998,
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          opacity: "calc(var(--SideNavigation-slideIn, 0) - 0.2)",
          transition: "opacity 0.4s",
          transform:
            "translateX(calc(100% * (var(--SideNavigation-slideIn, 0) - 1) + var(--SideNavigation-slideIn, 0) * var(--Sidebar-width, 0px)))",
        }}
        onClick={() => closeSidebar()}
      />
      <Box
        sx={{
          display: "flex",
          gap: 1,
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography
          sx={{
            marginLeft: "10px",
            fontSize: "30px",
            fontFamily: "League Spartan",
          }}
          fontWeight="xl"
        >
          COSMO
        </Typography>
        <IconButton
          onClick={() => toggleSidebar()}
          variant="outlined"
          color="neutral"
          size="sm"
        >
          <MenuIcon />
        </IconButton>
      </Box>
      <Box
        sx={{
          minHeight: 0,
          overflow: "hidden auto",
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <List
          sx={{
            "--ListItem-radius": "8px",
            "--List-gap": "4px",
            "--List-nestedInsetStart": "40px",
          }}
        >
          <ListItem>
            <ListItemButton>
              <ListItemDecorator>
                <HiOutlineHome />
              </ListItemDecorator>
              <ListItemContent>Home</ListItemContent>
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton>
              <ListItemDecorator>
                <NotificationsNoneOutlinedIcon />
              </ListItemDecorator>
              <ListItemContent>Notifications</ListItemContent>
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton>
              <ListItemDecorator>
                <AccountCircleOutlinedIcon />
              </ListItemDecorator>
              <ListItemContent>My Profile</ListItemContent>
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton onClick={LogOutAPI}>
              <ListItemDecorator>
                <LogoutOutlinedIcon />
              </ListItemDecorator>
              <ListItemContent>Log Out</ListItemContent>
            </ListItemButton>
          </ListItem>
        </List>

        <List
          sx={{
            mt: "auto",
            flexGrow: 0,
            "--ListItem-radius": "8px",
            "--List-gap": "8px",
          }}
        ></List>
      </Box>
      <Divider />
      <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
        <Avatar variant="outlined" src="/static/images/avatar/3.jpg" />
        <Box sx={{ minWidth: 0, flex: 1 }}>
          <Typography fontSize="sm" fontWeight="lg">
            {deets.firstName} {deets.lastName}
          </Typography>
          <Typography level="body-xs">{deets.email}</Typography>
        </Box>
        <IconButton variant="plain" color="neutral">
          <i data-feather="log-out" />
        </IconButton>
      </Box>
    </Sheet>
  );
}
