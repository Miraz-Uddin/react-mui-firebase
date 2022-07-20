import MenuIcon from "@mui/icons-material/Menu";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { signOut } from "firebase/auth";
import React, { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "./context/Auth.context";
import { auth } from "./utils/firebase.config";

export default function Nav() {
  const navigate = useNavigate();
  const currentUser = useContext(AuthContext);
  const ActiveBackground = {
    "&.active": { bgcolor: "primary.dark", display: "block" },
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Firebase Auth
          </Typography>
          {!currentUser && (
            <>
              <Button
                component={NavLink}
                to="/register"
                color="inherit"
                sx={ActiveBackground}
              >
                Register
              </Button>
              <Button
                component={NavLink}
                to="/login"
                color="inherit"
                sx={ActiveBackground}
              >
                Login
              </Button>
            </>
          )}
          {currentUser && (
            <>
              <Button
                component={NavLink}
                to="/profile"
                color="inherit"
                sx={ActiveBackground}
              >
                Profile
              </Button>
              <Button
                component={NavLink}
                to="/private"
                color="inherit"
                sx={ActiveBackground}
              >
                Private
              </Button>
              <Button
                onClick={() => {
                  signOut(auth);
                  navigate("/login");
                }}
                color="inherit"
                sx={ActiveBackground}
              >
                Logout
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
