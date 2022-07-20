import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import React, { useContext } from "react";
import { AuthContext } from "../context/Auth.context";
export default function Private() {
  const user = useContext(AuthContext);
  return (
    <>
      {user && (
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
            <h3>Private Page</h3>
            <p>{user.email}</p>
          </Box>
        </Container>
      )}
    </>
  );
}
