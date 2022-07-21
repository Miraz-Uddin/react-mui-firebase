import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { confirmPasswordReset } from "firebase/auth";
import { useSnackbar } from "notistack";
import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";

import { useNavigate } from "react-router-dom";
import { auth } from "../utils/firebase.config";

export default function ResetPassword() {
  const [searchParams] = useSearchParams();
  const { enqueueSnackbar } = useSnackbar();
  const [userInfo, setUserInfo] = useState({
    password: "",
  });
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await confirmPasswordReset(
        auth,
        searchParams.get("oobCode"),
        userInfo.password
      );
      navigate("/login");
      enqueueSnackbar("Password Updated Successfully", { variant: "success" });
    } catch (error) {
      enqueueSnackbar(error.code ? error.code.split("/")[1] : error.message, {
        variant: "error",
      });
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
            New Password
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  onChange={handleChange}
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Set New Password
            </Button>
          </Box>
        </Box>
      </Container>
    </>
  );
}
