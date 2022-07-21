import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { sendPasswordResetEmail } from "firebase/auth";
import React, { useState } from "react";
import { Link as Navigator, useNavigate } from "react-router-dom";
import { auth } from "../utils/firebase.config";

export default function ForgotPassword() {
  const [success, setSuccess] = useState(false);
  const [userInfo, setUserInfo] = useState({
    email: "",
  });
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(userInfo);
    try {
      await sendPasswordResetEmail(auth, userInfo.email);
      navigate("/login");
      console.log("Password Reset Email Sent Successfully");
      setSuccess(true);
    } catch (error) {
      console.log(error.code);
      console.log(error.message);
    }
  };
  const handleChange = (e) => {
    setUserInfo({
      ...userInfo,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <>
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
            Password Reset
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              onChange={handleChange}
              autoComplete="email"
              autoFocus
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Send Password Reset Link
            </Button>
            <Grid container>
              {/* <Grid item xs>
                <Link
                  component={Navigator}
                  to="/password/forgot"
                  variant="body2"
                >
                  Forgot password?
                </Link>
              </Grid> */}
              <Grid item>
                <Link component={Navigator} to="/register" variant="body2">
                  Don't have an account? Sign Up Instead
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </>
  );
}
