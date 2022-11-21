import { Grid } from "@mui/material";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { deleteDoc, doc } from "firebase/firestore";
import moment from "moment";
import { useSnackbar } from "notistack";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/Auth.context";
import { db } from "../utils/firebase.config";

export default function Blog({ blog, index, setBlog, handleOpen }) {
  const [isOwner, setIsOwner] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const { currentUser, loading } = useContext(AuthContext);
  const AuthRequired = ({ children }) => {
    if (loading && currentUser) {
      return children;
    } else {
      return;
    }
  };
  const { id, title, description, createdAt, userId } = blog;
  // console.log(blog);

  useEffect(() => {
    if (currentUser?.uid === userId) {
      setIsOwner(true);
    }
  }, []);

  const handleDelete = async () => {
    const docRef = doc(db, "blogs", id);
    try {
      if (isOwner) {
        await deleteDoc(docRef);
        enqueueSnackbar("Blog Deleted", { variant: "success" });
      } else {
        enqueueSnackbar("You are not authorized to delete the Blog", {
          variant: "danger",
        });
      }
    } catch (error) {
      // console.log("error");
    }
  };
  const handleEdit = () => {
    handleOpen();
    setBlog(blog);
  };

  return (
    <>
      <Grid item xs={6} sm={4} md={4} lg={3}>
        <Card variant="outlined" style={{ minHeight: "150px" }}>
          <CardContent>
            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
              align="right"
            >
              {moment(createdAt.toDate()).fromNow()}
            </Typography>
            <Typography variant="h5" component="div">
              {title}
            </Typography>
            <Typography variant="body2">{description}</Typography>
          </CardContent>
          <AuthRequired>
            <ButtonGroup variant="text" size="small">
              {isOwner && (
                <>
                  {/* Will work later */}
                  {/* <Button onClick={handleEdit}>Edit</Button> */}
                  <Button color="error" onClick={handleDelete}>
                    Delete
                  </Button>
                </>
              )}
            </ButtonGroup>
          </AuthRequired>
        </Card>
      </Grid>
    </>
  );
}
