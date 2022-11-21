import { Button, TextField } from "@mui/material";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import {
  addDoc,
  collection,
  doc,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { useSnackbar } from "notistack";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/Auth.context";
import { db } from "../utils/firebase.config";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function BlogForm({
  open,
  handleClose,
  setBlogList,
  blogList,
  blog,
}) {
  // console.log(blog);
  const { currentUser, loading } = useContext(AuthContext);
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const [title, setTitle] = useState(blog?.title);
  const [description, setDescription] = useState(blog?.description);
  const [userId, setUserId] = useState(blog?.userId);
  const [createdAt, setCreatedAt] = useState(blog?.createdAt);

  const addBlog = async (data) => {
    const colRef = collection(db, "blogs");
    enqueueSnackbar("Blog Data Submitted", { variant: "info" });
    handleClose();
    await addDoc(colRef, {
      ...data,
    })
      .then(() => {
        enqueueSnackbar("New Blog Created Successfully", {
          variant: "success",
        });
        setBlogList([...blogList, data]);
      })
      .catch((e) => {
        enqueueSnackbar("New Blog Creation Failed", { variant: "error" });
      });
  };
  const editBlog = async (data, blogId) => {
    const docRef = doc(db, "blogs", blogId);
    //   await updateDoc(docRef, {
    //     title: "Blog Updated",
    //     "user.name": "Luke HObbs",
    //   });
    enqueueSnackbar("Blog Data Submitted", { variant: "info" });
    handleClose();
    await updateDoc(docRef, {
      ...data,
    })
      .then(() => {
        enqueueSnackbar("Blog Updated", {
          variant: "success",
        });

        const updatedList = blogList.map((el) => {
          if (el.id === blogId) {
            return {
              ...data,
            };
          } else {
            return el;
          }
        });
        setBlogList([...updatedList]);
      })
      .catch((e) => {
        enqueueSnackbar("Blog Update Failed", { variant: "error" });
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      title === "" ||
      title === null ||
      title === undefined ||
      description === "" ||
      description === null ||
      description === undefined
    ) {
      enqueueSnackbar("Please Fill all field", {
        variant: "warning",
      });
    } else {
      if (blog?.id) {
        const data = {
          title,
          description,
          userId,
          createdAt,
        };
        editBlog(data, blog?.id);
      } else {
        const timeNow = Timestamp.fromDate(new Date());
        let author = "";
        if (loading && currentUser) {
          author = currentUser.uid;
        }
        const data = {
          title,
          description,
          userId: author,
          createdAt: timeNow,
        };
        addBlog(data);
      }
    }
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form onSubmit={handleSubmit}>
            <Typography sx={{ mb: 3 }} variant="h6" component="h2">
              Create New Blog
            </Typography>

            <TextField
              fullWidth
              label="Title"
              sx={{ mb: 2 }}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <TextField
              placeholder="Description"
              multiline
              rows={6}
              style={{ width: "100%" }}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            <Button
              variant="contained"
              color="success"
              sx={{ mt: 2 }}
              type="submit"
            >
              Submit
            </Button>
          </form>
        </Box>
      </Modal>
    </div>
  );
}
