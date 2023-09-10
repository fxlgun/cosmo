import React from 'react';
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

const Header = ({setDrawerOpen}) => {
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
  )
}

export default Header