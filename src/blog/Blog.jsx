import {
  Button,
  ButtonGroup,
  Card,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";
import { deleteDoc, doc } from "firebase/firestore";
import moment from "moment";
import { useSnackbar } from "notistack";
import React, { useContext } from "react";
import { AuthContext } from "../context/Auth.context";
import { auth, db } from "../utils/firebase.config";

export default function Blog({
  blog,
  setSelectedBlog,
  handleOpen,
  isBlogListChanged,
  setIsBlogListChanged,
}) {
  const { id, title, description, createdAt, updatedAt, userId } = blog;
  const { enqueueSnackbar } = useSnackbar();
  const { currentUser, loading } = useContext(AuthContext);

  const handleDelete = async () => {
    const docRef = doc(db, "blogs", id);
    try {
      if (currentUser?.uid === userId) {
        await deleteDoc(docRef);
        enqueueSnackbar("Blog Deleted Successfully", { variant: "success" });
        setIsBlogListChanged(!isBlogListChanged);
      } else {
        enqueueSnackbar("You are not authorized to delete the Blog", {
          variant: "warning",
        });
      }
    } catch (error) {}
  };
  return (
    <Grid item xs={6} sm={4} md={4} lg={3}>
      <Card
        variant="outlined"
        style={{ minHeight: "170px", maxHeight: "170px" }}
      >
        <CardContent>
          <Typography
            sx={{ fontSize: 14 }}
            color="text.secondary"
            gutterBottom
            align="right"
          >
            {`${
              updatedAt?.nanoseconds === createdAt?.nanoseconds
                ? "Added"
                : "Modified"
            } ${moment(updatedAt.toDate()).fromNow()}`}
            {}
          </Typography>
          <Typography variant="h5" component="div">
            {title}
          </Typography>
          <Typography
            variant="body2"
            style={{
              width: "100%",
              height: "38px",
              lineHeight: "18px",
              display: "-webkit-box",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: "2",
              overflow: "hidden",
              marginBottom: "4px",
              fontSize: "14px",
              cursor: "pointer",
            }}
          >
            {description}
          </Typography>
        </CardContent>
        {currentUser && (
          <div style={{ position: "relative" }}>
            <Typography
              sx={{
                fontSize: 14,
                position: "absolute",
                bottom: 0,
                right: 4,
              }}
              color="text.secondary"
              gutterBottom
            >
              {currentUser?.uid === userId
                ? "You are the Author"
                : `Author: ${auth?.currentUser?.displayName}`}
            </Typography>
            <ButtonGroup variant="text" size="small">
              <Button
                onClick={() => {
                  handleOpen();
                  setSelectedBlog(blog);
                }}
              >
                Edit
              </Button>
              <Button color="error" onClick={handleDelete}>
                Delete
              </Button>
            </ButtonGroup>
          </div>
        )}
      </Card>
    </Grid>
  );
}
