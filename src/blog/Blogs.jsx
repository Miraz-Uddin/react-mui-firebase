import AddIcon from "@mui/icons-material/Add";
import {
  Box,
  Card,
  CardContent,
  Container,
  CssBaseline,
  Fab,
  Grid,
  Typography,
} from "@mui/material";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/Auth.context";
import { db } from "../utils/firebase.config";
import Blog from "./Blog";
import BlogForm from "./BlogForm";

export default function Blogs() {
  const [blogList, setBlogList] = useState([]);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [open, setOpen] = useState(false);
  const [isBlogListChanged, setIsBlogListChanged] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setSelectedBlog(null);
  };

  const loadBlogs = async () => {
    const colRef = query(collection(db, "blogs"), orderBy("createdAt", "desc"));
    try {
      const allBlogs = [];
      // Normal Data Fetching
      const querySnapshot = await getDocs(colRef);
      querySnapshot.forEach((doc) => {
        const blog = doc.data();
        allBlogs.push({ ...blog, id: doc.id });
      });
      // Real Time Data Fetching
      // const newBlogList = [];
      // onSnapshot(colRef, (ss) => {
      //   ss.forEach((doc) => {
      //     newBlogList.push({ ...doc.data(), id: doc.id });
      //   });
      // });
      setBlogList(allBlogs);
    } catch (e) {}
  };

  const AuthRequired = ({ children }) => {
    const { currentUser, loading } = useContext(AuthContext);
    if (loading && currentUser) {
      return children;
    } else {
      return;
    }
  };

  useEffect(() => {
    loadBlogs();
  }, [isBlogListChanged]);

  // what to render
  let blogContent = "";
  if (!blogList) {
    blogContent = (
      <Grid item xs={12} style={{ position: "relative" }}>
        <Card variant="outlined">
          <CardContent>
            <Typography
              sx={{ fontSize: 16 }}
              color="text.danger"
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%,-50%)",
              }}
            >
              Blogs Loading ...
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    );
  } else if (blogList && blogList.length === 0) {
    blogContent = (
      <Grid item xs={12} style={{ position: "relative" }}>
        <Card variant="outlined">
          <CardContent>
            <Typography
              sx={{ fontSize: 16 }}
              color="text.danger"
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%,-50%)",
              }}
            >
              No Blog Created Yet !!!
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    );
  } else if (blogList && blogList.length > 0) {
    blogContent = blogList.map((blogData, i) => {
      return (
        <Blog
          blog={blogData}
          key={i}
          handleOpen={handleOpen}
          setSelectedBlog={setSelectedBlog}
          isBlogListChanged={isBlogListChanged}
          setIsBlogListChanged={setIsBlogListChanged}
        />
      );
    });
  }

  return (
    <>
      <Container component="main">
        <CssBaseline />
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2} style={{ marginTop: 20 }}>
            {blogContent}
          </Grid>
        </Box>
        <AuthRequired>
          <Fab
            color="primary"
            sx={{ position: "fixed", right: 25, bottom: 25 }}
            onClick={() => {
              setSelectedBlog(null);
              handleOpen();
            }}
          >
            <AddIcon />
          </Fab>
        </AuthRequired>
      </Container>
      <BlogForm
        open={open}
        handleClose={handleClose}
        selectedBlog={selectedBlog}
        isBlogListChanged={isBlogListChanged}
        setIsBlogListChanged={setIsBlogListChanged}
      />
    </>
  );
}
