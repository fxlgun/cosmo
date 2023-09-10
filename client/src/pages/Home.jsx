import { onAuthStateChanged } from "firebase/auth";
import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import Loader from "../components/Loader";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { CssVarsProvider } from "@mui/joy";

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
  return loading ? <Loader/> : <CssVarsProvider>
    <Header/>
    <Sidebar/>
    THE HOME PAGE WILL BE SHOWN HERE , WORK IN PROGRESS
  </CssVarsProvider>;
};

export default Home;
