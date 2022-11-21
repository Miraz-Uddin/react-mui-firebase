import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/Auth.context";
// import { collection, query, where, getDocs } from "firebase/firestore";
import { Box, Button, Grid, Paper } from "@mui/material";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../utils/firebase.config";
import Blog from "./Blog";

import { styled } from "@mui/material/styles";
import BlogForm from "./BlogForm";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function Blogs() {
  const AuthRequired = ({ children }) => {
    const { currentUser, loading } = useContext(AuthContext);
    if (loading && currentUser) {
      return children;
    } else {
      return;
    }
  };
  const [blogList, setBlogList] = useState([]);
  const [blog, setBlog] = useState(null);

  const loadBlogs = async () => {
    const colRef = collection(db, "blogs");
    try {
      const allBlogs = [];
      // Normal Data Fetching
      const querySnapshot = await getDocs(colRef);
      querySnapshot.forEach((doc) => {
        const blog = doc.data();
        allBlogs.push({ ...blog, id: doc.id });
      });
      // Real Time Data Fetching
      // await onSnapshot(colRef,(ss) => {
      //     ss.forEach((doc) => {
      //     allBlogs.push({...doc.data(),id:doc.id});
      //   });
      // })
      setBlogList(allBlogs);
    } catch (e) {
      // console.log(e);
      // console.log("Error Occured while Blog loading from firestore");
    }
  };

  useEffect(() => {
    loadBlogs();
  }, []);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Container component="main">
        <CssBaseline />
        <Box sx={{ flexGrow: 1 }}>
          <AuthRequired>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Item>
                  <Button variant="outlined" onClick={handleOpen}>
                    Add New Blog
                  </Button>
                </Item>
              </Grid>
            </Grid>
          </AuthRequired>
          <Grid container spacing={0.5} style={{ marginTop: "30px" }}>
            {blogList.length != 0 &&
              blogList.map((blog, i) => {
                return (
                  <Blog
                    blog={blog}
                    key={i}
                    index={i}
                    setBlog={setBlog}
                    handleOpen={handleOpen}
                  />
                );
              })}
          </Grid>
        </Box>
      </Container>
      <BlogForm
        open={open}
        handleClose={handleClose}
        blogList={blogList}
        setBlogList={setBlogList}
        blog={blog}
      />
    </>
  );
}
