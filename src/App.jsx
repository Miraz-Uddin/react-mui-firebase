import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ForgotPassword from "./auth/ForgotPassword";
import Login from "./auth/Login";
import Private from "./auth/Private";
import Profile from "./auth/Profile";
import Register from "./auth/Register";
import ResetPassword from "./auth/ResetPassword";
import { AuthProvider } from "./context/Auth.context";
import Nav from "./Nav";
export default function App() {
  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          <Nav />
          <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/password/forgot" element={<ForgotPassword />} />
            <Route path="/password/reset" element={<ResetPassword />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/private" element={<Private />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </>
  );
}
