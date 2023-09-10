import { onAuthStateChanged } from "firebase/auth";
import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import Loader from "../components/Loader";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import {
  Box,
  Button,
  CssBaseline,
  CssVarsProvider,
  Divider,
  GlobalStyles,
  IconButton,
  Input,
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

const Home = () => {
  const [loading, setLoading] = useState(true);
  let navigate = useNavigate();
  useEffect(() => {
    onAuthStateChanged(auth, (res) => {
      if (!res?.accessToken) {
        navigate("/login");
      } else {
        setLoading(false);
      }
    });
  }, []);
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  return loading ? (
    <Loader />
  ) : (
    <CssVarsProvider disableTransitionOnChange>
      <CssBaseline />
      {drawerOpen && (
        <Layout.SideDrawer onClose={() => setDrawerOpen(false)}>
          <Navigation />
        </Layout.SideDrawer>
      )}
      <Layout.Root
        sx={{
          gridTemplateColumns: {
            xs: "1fr",
            sm: "minmax(64px, 200px) minmax(450px, 1fr)",
            md: "minmax(160px, 300px) minmax(600px, 1fr) minmax(300px, 420px)",
          },
          ...(drawerOpen && {
            height: "100vh",
            overflow: "hidden",
          }),
        }}
      >
        <Header setDrawerOpen={setDrawerOpen}/>
        <Layout.SideNav>
          <Navigation />
        </Layout.SideNav>
        <Layout.Main>
          <Post/>
          <Post/>
          <Post/>
          <Post/>
          <Post/>
          <Post/>
          <Post/>
          
        </Layout.Main>
        <Sheet
          sx={{
            display: { xs: "none", sm: "initial" },
            borderLeft: "1px solid",
            borderColor: "neutral.outlinedBorder",
          }}
        ></Sheet>
      </Layout.Root>
    </CssVarsProvider>
  );
};

export default Home;
