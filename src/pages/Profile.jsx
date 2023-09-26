import * as React from "react";
import { CssVarsProvider } from "@mui/joy/styles";
import GlobalStyles from "@mui/joy/GlobalStyles";
import CssBaseline from "@mui/joy/CssBaseline";
import Box from "@mui/joy/Box";

import Header from "../components/Header";
import MyProfile from "../components/MyProfile";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../firebase";
import Loader from "../components/Loader";
import { useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import {
  Button,
  Divider,
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
  const [deets, setDeets] = useState({})
  let navigate = useNavigate();
  useEffect(() => {
    onAuthStateChanged(auth,async (res) => {
      if (!res?.accessToken) {
        navigate("/login");
      } else {
        const userDeets = await getDoc(doc(db, "users", res.email))
      setDeets(userDeets.data());
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

            <IconButton
              size="sm"
              variant="soft"
              color="neutral"
              component="a"
              href="/blog/first-look-at-joy/"
            >
              <BookRoundedIcon />
            </IconButton>
          </Box>
        </Layout.Header>
        <Layout.SideNav>
          <Navigation />
        </Layout.SideNav>
        <Layout.Main>
          
          <MyProfile deets={deets}/>
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
