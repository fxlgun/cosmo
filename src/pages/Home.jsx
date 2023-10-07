import { onAuthStateChanged } from "firebase/auth";
import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import Loader from "../components/Loader";
import Header from "../components/Header";
import { CssBaseline, CssVarsProvider, Sheet } from "@mui/joy";
import Post from "../components/Post";
import Layout from "../components/Layout";
import Navigation from "../components/Navigation";
import AddPost from "../components/AddPost";
import { getPost } from "../api/posts";

const Home = () => {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  let navigate = useNavigate();
  useEffect(() => {
    onAuthStateChanged(auth, async (res) => {
      if (!res?.accessToken) {
        navigate("/login");
      } else {
        setUser(res);
        setLoading(false);
        fetchPosts()
      }
    });
  }, []);

  const fetchPosts = async () => {
    const newPosts = await getPost();
    setPosts(newPosts);
  };

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
        <Header user={user} setDrawerOpen={setDrawerOpen} />
        <Layout.SideNav>
          <Navigation />
        </Layout.SideNav>
        <Layout.Main>
          <AddPost fetchPosts={fetchPosts} user={user} />
          {posts?.map((post) => <Post post={post} user={user} posts={posts} />)}
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
