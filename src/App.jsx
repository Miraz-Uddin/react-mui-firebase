import { Fade } from "@mui/material";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import { SnackbarProvider } from "notistack";
import React, { useContext } from "react";
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import ForgotPassword from "./auth/ForgotPassword";
import Login from "./auth/Login";
import Private from "./auth/Private";
import Profile from "./auth/Profile";
import Register from "./auth/Register";
import ResetPassword from "./auth/ResetPassword";
import Blogs from "./blog/Blogs";
import NotFound from "./components/NotFound";
import { AuthContext, AuthProvider } from "./context/Auth.context";
import Nav from "./Nav";
import Home from "./public/Home";

export default function App() {
  const AuthRequired = ({ children }) => {
    const { currentUser, loading } = useContext(AuthContext);
    const location = useLocation();
    if (loading) {
      if (currentUser) return children;
      return <Navigate to="/login" state={{ from: location.pathname }} />;
    } else {
      return (
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
            <h3>... Loading</h3>
          </Box>
        </Container>
      );
    }
  };

  const RedirectedIfAuthAvailable = ({ children }) => {
    const { currentUser, loading } = useContext(AuthContext);
    const location = useLocation();
    if (loading) {
      if (currentUser)
        return <Navigate to="/" state={{ from: location.pathname }} />;
      return children;
    } else {
      return (
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
            <h3>... Loading</h3>
          </Box>
        </Container>
      );
    }
  };
  return (
    <>
      <SnackbarProvider
        maxSnack={1}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        TransitionComponent={Fade}
      >
        <AuthProvider>
          <BrowserRouter>
            <Nav />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route
                path="/register"
                element={
                  <RedirectedIfAuthAvailable>
                    {" "}
                    <Register />
                  </RedirectedIfAuthAvailable>
                }
              />
              <Route
                path="/login"
                element={
                  <RedirectedIfAuthAvailable>
                    {" "}
                    <Login />
                  </RedirectedIfAuthAvailable>
                }
              />
              <Route
                path="/password/forgot"
                element={
                  <RedirectedIfAuthAvailable>
                    <ForgotPassword />
                  </RedirectedIfAuthAvailable>
                }
              />
              {/* <Route
                path="/password/reset"
                element={
                  <RedirectedIfAuthAvailable>
                    <ResetPassword />
                  </RedirectedIfAuthAvailable>
                }
              /> */}
              <Route path="/reset-password" element={<ResetPassword />} />
              <Route
                path="/profile"
                element={
                  <AuthRequired>
                    <Profile />
                  </AuthRequired>
                }
              />
              <Route
                path="/private"
                element={
                  <AuthRequired>
                    <Private />
                  </AuthRequired>
                }
              />
              <Route path="/blogs" element={<Blogs />} />
              <Route
                path="*"
                exact={true}
                element={
                  <RedirectedIfAuthAvailable>
                    <NotFound />
                  </RedirectedIfAuthAvailable>
                }
              />
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </SnackbarProvider>
    </>
  );
}
