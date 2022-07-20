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
import { AuthContext, AuthProvider } from "./context/Auth.context";
import Nav from "./Nav";
import Home from "./public/Home";

export default function App() {
  const AuthRequired = ({ children }) => {
    const currentUser = useContext(AuthContext);
    const location = useLocation();
    if (currentUser) return children;
    return <Navigate to="/login" state={{ from: location.pathname }} />;
  };

  const RedirectedIfAuthAvailable = ({ children }) => {
    const currentUser = useContext(AuthContext);
    const location = useLocation();
    if (currentUser)
      return <Navigate to="/" state={{ from: location.pathname }} />;
    return children;
  };
  return (
    <>
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
                <AuthRequired>
                  <ForgotPassword />
                </AuthRequired>
              }
            />
            <Route
              path="/password/reset"
              element={
                <AuthRequired>
                  <ResetPassword />
                </AuthRequired>
              }
            />
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
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </>
  );
}
