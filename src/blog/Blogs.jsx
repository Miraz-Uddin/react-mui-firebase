import React, { useContext, useEffect, useState } from "react";
// import { collection, query, where, getDocs } from "firebase/firestore";
import { Grid } from "@mui/material";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import { collection, getDocs } from "firebase/firestore";
import { AuthContext } from "../context/Auth.context";
import { db } from "../utils/firebase.config";
import Blog from "./Blog";

export default function Blogs() {
  const [blogList, setBlogList] = useState([]);

  const loadBlogs = async () => {
    try {
      let allBlogs = [];
      const querySnapshot = await getDocs(collection(db, "blogs"));
      querySnapshot.forEach((doc) => {
        const blog = doc.data();
        allBlogs.push(blog);
      });
      setBlogList(allBlogs);
    } catch (e) {
      console.log("Error Occured while Blog loading from firestore");
    }
  };

  useEffect(() => {
    loadBlogs();
  }, []);
  console.log(blogList);

  const { loading, currentUser } = useContext(AuthContext);
  //   console.log(loading, currentUser);
  if (loading && currentUser) {
    // Total Blogs When logged in Scope
    return (
      <>
        <Container component="main">
          <CssBaseline />
          <Grid container spacing={0.5} style={{ marginTop: "30px" }}>
            {blogList.length != 0 &&
              blogList.map((blog, i) => {
                return <Blog blog={blog} key={i} />;
              })}
          </Grid>
        </Container>
      </>
    );
  } else {
    // Total Blogs When logged Out Scope
    return (
      <>
        <Container component="main">
          <CssBaseline />
          <Grid container spacing={0.5} style={{ marginTop: "30px" }}>
            {blogList.length != 0 &&
              blogList.map((blog, i) => {
                return <Blog blog={blog} key={i} index={i} />;
              })}
          </Grid>
        </Container>
      </>
    );
  }
}
