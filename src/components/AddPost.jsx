import * as React from "react";
import Button from "@mui/joy/Button";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import Stack from "@mui/joy/Stack";
import Add from "@mui/icons-material/Add";
import DialogTitle from "@mui/joy/DialogTitle";
import DialogContent from "@mui/joy/DialogContent";
import { IconButton, Modal, ModalDialog, Textarea } from "@mui/joy";
import CloseIcon from "@mui/icons-material/Close";
import { addPost } from "../api/posts";
import toast, { Toaster } from "react-hot-toast";
import { useEffect } from "react";

export default function AddPost({ user, fetchPosts }) {
  const [post, setPost] = React.useState({
    email: user.email,
    displayName: user.displayName,
    photoURL: user.photoURL,
    title: "",
    text: "",
    likes: [],
    img: [],
    tags: [],
    comments: [],
  });
  
  const [open, setOpen] = React.useState(false);
  const handleSubmit = async () => {
    addPost(post);
    toast.success("Posted!");
    setOpen(false);
  };

  useEffect(()=>{
    fetchPosts()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[open])

  return (
    <React.Fragment>
      <Toaster
        toastOptions={{
          style: {
            backgroundColor: "black",
            color: "white",
            duration: 2000,
          },
        }}
      />
      <Button
        size="lg"
        variant="soft"
        color="primary"
        startDecorator={<Add />}
        onClick={() => setOpen(true)}
      >
        New Post
      </Button>
      <Modal open={open} onClose={() => setOpen(false)}>
        <ModalDialog layout="fullscreen" size="lg">
          <DialogTitle>Create new post</DialogTitle>
          <DialogContent sx={{ display: "contents" }}>
            Express your doubts and thoughts.
          </DialogContent>
          <IconButton
            onClick={() => setOpen(false)}
            sx={{ position: "absolute", right: "30px" }}
          >
            <CloseIcon />
          </IconButton>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              handleSubmit();
            }}
          >
            <Stack spacing={2}>
              <FormControl>
                <FormLabel></FormLabel>
                <Input
                  autoFocus
                  required
                  placeholder="Title"
                  onChange={(e) => setPost({ ...post, title: e.target.value })}
                />
              </FormControl>
              <FormControl>
                <Textarea
                  required
                  placeholder="Text"
                  minRows={4}
                  maxRows={15}
                  size="md"
                  onChange={(e) => setPost({ ...post, text: e.target.value })}
                />
              </FormControl>
              <Button type="submit">Post</Button>
            </Stack>
          </form>
        </ModalDialog>
      </Modal>
    </React.Fragment>
  );
}
