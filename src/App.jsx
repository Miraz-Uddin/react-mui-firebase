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

const AuthRequired = ({ children }) => {
  const location = useLocation();
  const currentUser = useContext(AuthContext);
  if (currentUser) return children;
  return <Navigate to="/login" state={{ from: location.pathname }} />;
};

export default function App() {
  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          <Nav />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/password/forgot" element={<ForgotPassword />} />
            <Route path="/password/reset" element={<ResetPassword />} />
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
