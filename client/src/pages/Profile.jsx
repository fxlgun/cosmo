import * as React from 'react';
import { CssVarsProvider } from '@mui/joy/styles';
import GlobalStyles from '@mui/joy/GlobalStyles';
import CssBaseline from '@mui/joy/CssBaseline';
import Box from '@mui/joy/Box';


import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import MyProfile from '../components/MyProfile';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from '../firebase';
import Loader from '../components/Loader';
import { useState } from 'react';
import { collection, getDoc, query, where } from 'firebase/firestore';




export default function Profile() {
  const [user, setUser] = useState({})
  const [deets, setDeets] = useState({})
  const [loading, setLoading] = React.useState(true);
  let navigate = useNavigate();
  useEffect(() => {
    onAuthStateChanged(auth, async (res) => {
      if (!res?.accessToken) {
        navigate("/login");
      } else {
        const userDeets = await getDoc(query(collection(db,"users"), where("email", "==", res.email)))
        setDeets(userDeets)
        console.log(userDeets);
        setLoading(false);
        console.log(res);
        setUser(res);

      }
    });
  }, []);

  return ( loading ? <Loader /> :
    <CssVarsProvider disableTransitionOnChange>
      <GlobalStyles
        styles={(theme) => ({
          '[data-feather], .feather': {
            color: `var(--Icon-color, ${theme.vars.palette.text.icon})`,
            margin: 'var(--Icon-margin)',
            fontSize: `var(--Icon-fontSize, ${theme.vars.fontSize.xl})`,
            width: '1em',
            height: '1em',
          },
        })}
      />
      <CssBaseline />
      <Box sx={{ display: 'flex', minHeight: '100dvh' }}>
        <Header />
        <Sidebar />
        <Box
          component="main"
          className="MainContent"
          sx={(theme) => ({
            '--main-paddingTop': {
              xs: `calc(${theme.spacing(2)} + var(--Header-height, 0px))`,
              md: '32px',
            },
            px: {
              xs: 2,
              md: 3,
            },
            pt: 'var(--main-paddingTop)',
            pb: {
              xs: 2,
              sm: 2,
              md: 3,
            },
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            minWidth: 0,
            height: '100dvh',
            gap: 1,
            overflow: 'auto',
          })}
        >
          <MyProfile />
        </Box>
      </Box>
    </CssVarsProvider>
  );
}
