import * as React from "react";
import { CssVarsProvider } from "@mui/joy/styles";
import GlobalStyles from "@mui/joy/GlobalStyles";
import CssBaseline from "@mui/joy/CssBaseline";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import FormControl from "@mui/joy/FormControl";
import FormLabel, { formLabelClasses } from "@mui/joy/FormLabel";
import Link from "@mui/joy/Link";
import Input from "@mui/joy/Input";
import Typography from "@mui/joy/Typography";
import Cosmo from "../image/Cosmo.png";
import { Chip, Radio, RadioGroup } from "@mui/joy";
import CheckIcon from "@mui/icons-material/Check";
import { RegisterAPI } from "../api/auth";
import { Toaster, toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
import Loader from "../components/Loader";

/**
 * This template uses [`Inter`](https://fonts.google.com/specimen/Inter?query=inter) font.
 */
export default function Register() {
  const [loading, setLoading] = React.useState(true);
  const [credentials, setCredentials] = React.useState({
    email: "",
    password: "",
    type: null,
    firstName: "",
    lastName: "",
  });
  const navigate = useNavigate();
  useEffect(() => {
    onAuthStateChanged(auth, (res) => {
      if (res?.accessToken) {
        navigate("/");
      } else {
        setLoading(false);
      }
    });
  }, []);
  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      let res = await RegisterAPI(credentials.email, credentials.password);
      toast.success("Account Created");
    } catch (err) {
      console.log(err);
      toast.error("Trouble Creating Account");
    }
  };

  return loading ? (
    <Loader />
  ) : (
    <CssVarsProvider defaultMode="dark" disableTransitionOnChange>
      <CssBaseline />
      <Toaster />
      <GlobalStyles
        styles={{
          ":root": {
            "--Collapsed-breakpoint": "769px", // form will stretch when viewport is below `769px`
            "--Cover-width": "40vw", // must be `vw` only
            "--Form-maxWidth": "700px",
            "--Transition-duration": "0.4s", // set to `none` to disable transition
          },
        }}
      />
      <Box
        sx={(theme) => ({
          width:
            "clamp(80vw - var(--Cover-width), (var(--Collapsed-breakpoint) - 100vw) * 999, 100vw)",
          transition: "width var(--Transition-duration)",
          transitionDelay: "calc(var(--Transition-duration) + 0.1s)",
          position: "relative",
          zIndex: 1,
          display: "flex",
          justifyContent: "flex-end",
          backdropFilter: "blur(15px)",
          backgroundColor: "rgba(255 255 255 / 0.6)",
          [theme.getColorSchemeSelector("dark")]: {
            backgroundColor: "rgba(19 19 24 / 0.4)",
          },
        })}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            minHeight: "100dvh",
            width:
              "clamp(var(--Form-maxWidth), (var(--Collapsed-breakpoint) - 100vw) * 999, 100%)",
            maxWidth: "100%",
            px: 2,
          }}
        >
          <Box
            component="header"
            sx={{
              py: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          ></Box>
          <Box
            component="main"
            sx={{
              my: "auto",
              pb: 7,
              display: "flex",
              flexDirection: "column",
              gap: 3,
              width: 400,
              maxWidth: "100%",
              mx: "auto",
              borderRadius: "sm",
              "& form": {
                display: "flex",
                flexDirection: "column",
                gap: 2,
              },
              [`& .${formLabelClasses.asterisk}`]: {
                visibility: "hidden",
              },
            }}
          >
            <div>
              <Typography component="h1" fontSize="xl2" fontWeight="lg">
                Sign up
              </Typography>
              <Typography level="body-sm" sx={{ mt: 1, mb: 2 }}>
                Join us and know no borders.
              </Typography>
            </div>
            <form onSubmit={handleRegister}>
              <FormControl required>
                <FormLabel>First Name</FormLabel>
                <Input
                  autoComplete="on"
                  type="text"
                  name="firstName"
                  onChange={(e) =>
                    setCredentials({
                      ...credentials,
                      firstName: e.target.value,
                    })
                  }
                />
              </FormControl>
              <FormControl required>
                <FormLabel>Last Name</FormLabel>
                <Input
                  autoComplete="on"
                  type="text"
                  name="lastName"
                  onChange={(e) =>
                    setCredentials({ ...credentials, lastName: e.target.value })
                  }
                />
              </FormControl>
              <FormControl required>
                <FormLabel>Email</FormLabel>
                <Input
                  autoComplete="on"
                  type="email"
                  name="email"
                  onChange={(e) =>
                    setCredentials({ ...credentials, email: e.target.value })
                  }
                />
              </FormControl>
              <RadioGroup
                name="best-movie"
                aria-labelledby="best-movie"
                orientation="horizontal"
                sx={{ flexWrap: "wrap", gap: 1 }}
              >
                {[
                  { name: "Aspirant", value: "aspirant" },
                  { name: "Studying Abroad", value: "studyingAbroad" },
                  { name: "Working Abroad", value: "workingAbroad" },
                ].map((item) => {
                  const checked = credentials.type === item.value;
                  return (
                    <Chip
                      key={item.value}
                      variant="plain"
                      color={checked ? "primary" : "neutral"}
                      startDecorator={
                        checked && (
                          <CheckIcon
                            sx={{ zIndex: 1, pointerEvents: "none" }}
                          />
                        )
                      }
                    >
                      <Radio
                        variant="outlined"
                        color={checked ? "primary" : "neutral"}
                        disableIcon
                        overlay
                        label={item.name}
                        value={item.value}
                        checked={checked}
                        onChange={(event) => {
                          if (event.target.checked) {
                            setCredentials({
                              ...credentials,
                              type: item.value,
                            });
                          }
                        }}
                      />
                    </Chip>
                  );
                })}
              </RadioGroup>
              <FormControl required>
                <FormLabel>Password</FormLabel>
                <Input
                  autoComplete="off"
                  type="password"
                  name="password"
                  onChange={(e) =>
                    setCredentials({ ...credentials, password: e.target.value })
                  }
                />
              </FormControl>

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Link fontSize="sm" href="login" fontWeight="lg">
                  Already have an account? Sign in
                </Link>
              </Box>
              <Button type="submit" fullWidth>
                Sign Up
              </Button>
            </form>
          </Box>
          <Box component="footer" sx={{ py: 2 }}>
            <Typography level="body-xs" textAlign="center">
              © Cosmo {new Date().getFullYear()}
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box
        sx={(theme) => ({
          height: "100%",
          position: "fixed",
          right: 0,
          top: 0,
          bottom: 0,
          left: "clamp(0px, (100vw - var(--Collapsed-breakpoint)) * 999, 80vw - var(--Cover-width))",
          transition:
            "background-image var(--Transition-duration), left var(--Transition-duration) !important",
          transitionDelay: "calc(var(--Transition-duration) + 0.1s)",
          backgroundColor: "background.level1",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundImage: `url(${Cosmo})`,
          [theme.getColorSchemeSelector("dark")]: {
            backgroundImage: `url(${Cosmo})`,
          },
        })}
      />
    </CssVarsProvider>
  );
}
