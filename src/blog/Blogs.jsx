import React, { useContext, useEffect, useState } from "react";
// import { collection, query, where, getDocs } from "firebase/firestore";
import { Grid } from "@mui/material";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import { collection, getDocs, onSnapshot } from "firebase/firestore";
import { AuthContext } from "../context/Auth.context";
import { db } from "../utils/firebase.config";
import Blog from "./Blog";

export default function Blogs() {
  const [blogList, setBlogList] = useState([]);
  
  const loadBlogs = async () => {
    const colRef = collection(db, "blogs")
    try {
      const allBlogs = [];
      // Normal Data Fetching
      const querySnapshot = await getDocs(colRef);
      querySnapshot.forEach((doc) => {
        const blog = doc.data();
        allBlogs.push({...blog,id:doc.id});
      });
      // Real Time Data Fetching
      // await onSnapshot(colRef,(ss) => {
      //     ss.forEach((doc) => {
      //     allBlogs.push({...doc.data(),id:doc.id});
      //   });
      // })
      setBlogList(allBlogs);
    } catch (e) {
      console.log(e)
      console.log("Error Occured while Blog loading from firestore");
    }
  };

  useEffect(() => {
    loadBlogs();
  }, [])
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
