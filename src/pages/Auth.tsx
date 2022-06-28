import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Tooltip from "@mui/material/Tooltip";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
  useLoginUserMutation,
  useRegisterUserMutation,
} from "../services/authApi";
import { toast } from "react-toastify";
import { useAppDispatch } from "../app/hooks";
import { setUser } from "../features/authSlice";

function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();
const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmpassword: "",
};

export const Auth = () => {
  const navigate = useNavigate();
  const [formValue, setFormValue] = useState(initialState);
  const [showRegister, setShowRegister] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const [
    loginUser,
    {
      data: loginData,
      isSuccess: isLoginSuccess,
      isError: isLoginError,
      error: loginError,
    },
  ] = useLoginUserMutation();
  const [
    registerUser,
    {
      data: registerData,
      isSuccess: isRegisterSuccess,
      isError: isRegisterError,
      error: registerError,
    },
  ] = useRegisterUserMutation();
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
  };
  const handleRegister = async () => {
    if (password != confirmpassword) {
      toast.error("Please fill all password");
    }
    if (firstName && lastName && email && password) {
      await registerUser({ firstName, lastName, email, password });
    } else {
      toast.error("Please fill all Input field");
    }
  };
  const handleLogin = async () => {
    if (email && password) {
      await loginUser({ email, password });
    } else {
      toast.error("Please fill all Input field");
    }
  };
  useEffect(() => {
    if (isLoginSuccess) {
      toast.success(" User login Successfully");
      dispatch(
        setUser({ name: loginData.result.name, token: loginData.token })
      );

      // console.log(      {name:loginData.name,token:loginData.token})
      navigate("/dashboard");
    }
    if (isRegisterSuccess) {
      toast.success(" User register Successfully");
      dispatch(
        setUser({
          name: registerData.result.name,
          token: registerData.token,
        })
      );

      // console.log(      {name:loginData.name,token:loginData.token})
      navigate("/dashboard");
    }
  }, [isLoginSuccess, isRegisterSuccess]);
  useEffect(()=>{
    
    if(isRegisterError){
      toast.error((registerError as any).data.message)
    }
  },[isLoginError,isRegisterError])
  const handleChange = (e: any) => {
    setFormValue({ ...formValue, [e.target.name]: e.target.value });
    console.log({ ...formValue, [e.target.name]: e.target.value });
  };
  const { firstName, lastName, email, password, confirmpassword } = formValue;
  return (
    <div>
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              {!showRegister ? " Sign in" : "Sign up"}
            </Typography>
            <Typography component="p">
              {!showRegister
                ? " Please enter your Email & passsword"
                : "Please enter your User detail"}
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
              {showRegister && (
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      autoComplete="given-name"
                      name="firstName"
                      required
                      fullWidth
                      id="firstName"
                      value={firstName}
                      onChange={handleChange}
                      label="First Name"
                      autoFocus
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      id="lastName"
                      label="Last Name"
                      value={lastName}
                      onChange={handleChange}
                      name="lastName"
                      autoComplete="family-name"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id="email"
                      label="Email Address"
                      value={email}
                      onChange={handleChange}
                      name="email"
                      autoComplete="email"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      name="password"
                      label="Password"
                      value={password}
                      onChange={handleChange}
                      type="password"
                      id="password"
                      autoComplete="new-password"
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      name="confirmpassword"
                      label="Confirm Password"
                      type="password"
                      value={confirmpassword}
                      onChange={handleChange}
                      id="confirmpassword"
                      autoComplete="current-password"
                    />
                  </Grid>
                </Grid>
              )}
              {!showRegister && (
                <div>
                  {" "}
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    value={email}
                    onChange={handleChange}
                    autoComplete="email"
                    autoFocus
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    value={password}
                    onChange={handleChange}
                    id="password"
                    autoComplete="current-password"
                  />
                </div>
              )}
              {!showRegister ? (
                <Button
                  onClick={() => handleLogin()}
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign In
                </Button>
              ) : (
                <Button
                  onClick={() => handleRegister()}
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign up
                </Button>
              )}

              <Grid container>
                <Grid item>
                  <Typography component="p">
                    {!showRegister ? (
                      <Typography sx={{ ml: 15 }}>
                        Don't have an account?
                        <Button
                          variant="text"
                          sx={{ ml: 8 }}
                          onClick={() => setShowRegister(true)}
                          component="p"
                        >
                          Sign Up
                        </Button>
                      </Typography>
                    ) : (
                      <Typography sx={{ ml: 15 }}>
                        Already have an account?
                        <Button
                          variant="text"
                          sx={{
                            ml: 8,
                          }}
                          onClick={() => setShowRegister(false)}
                          component="p"
                        >
                          Sign In
                        </Button>
                      </Typography>
                    )}
                  </Typography>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Copyright sx={{ ml: 8, mb: 4 }} />
        </Container>
      </ThemeProvider>
    </div>
  );
};
