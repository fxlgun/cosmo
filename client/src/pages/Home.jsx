import { onAuthStateChanged } from "firebase/auth";
import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import Loader from "../components/Loader";

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
  return loading? <Loader/> : <div>Home</div>;
};

export default Home;
