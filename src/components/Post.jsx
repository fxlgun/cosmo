/* eslint-disable jsx-a11y/anchor-is-valid */
import * as React from "react";
import Avatar from "@mui/joy/Avatar";
import Box from "@mui/joy/Box";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import CardOverflow from "@mui/joy/CardOverflow";
import Link from "@mui/joy/Link";
import IconButton from "@mui/joy/IconButton";
import Input from "@mui/joy/Input";
import Typography from "@mui/joy/Typography";
import MoreHoriz from "@mui/icons-material/MoreHoriz";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ModeCommentOutlined from "@mui/icons-material/ModeCommentOutlined";
import SendOutlined from "@mui/icons-material/SendOutlined";
import BookmarkBorderRoundedIcon from "@mui/icons-material/BookmarkBorderRounded";
import ImgCarousel from "./ImgCarousel";
import { Button, Divider } from "@mui/joy";
import { commentPost, getSinglePost, likePost } from "../api/posts";
import { useState } from "react";
import { useEffect } from "react";
import Comment from "./Comment";

export default function Post({ post, user, posts }) {
  const [data, setData] = useState(post);
  const [comment, setComment] = useState("");

  const handleLike = async () => {
    await likePost(user.email, data, setData);
  };

  const handleComment = (e) => {
    e.preventDefault();
    const commentArray = data.comments
    commentArray.push({email:user.email, displayName:user.displayName, photoURL:user.photoURL, comment:comment})
    setData({...data, comments: commentArray})
    commentPost(data);  
    setComment("")
  };

  const fetchPost = async () => {
    const updatedPost = await getSinglePost(post.id);
    if (updatedPost !== data) setData(updatedPost);
  };

  useEffect(() => {
    fetchPost();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [posts]);

  return (
    <Card
      variant="outlined"
      sx={{
        minWidth: 300,
        my: 2,
      }}
    >
      <CardContent
        orientation="horizontal"
        sx={{ alignItems: "center", gap: 1.3 }}
      >
        <Avatar size="md" src={data?.photoURL || "/static/logo.png"} />
        <Typography fontWeight="lg">{data?.displayName}</Typography>
        <IconButton
          variant="plain"
          color="neutral"
          size="sm"
          sx={{ ml: "auto" }}
        >
          <MoreHoriz />
        </IconButton>
      </CardContent>
      <Divider />
      <CardOverflow>
        <Box sx={{ width: "100%", overflowY: "auto" }}>
          <ImgCarousel images={data?.img} />
        </Box>
      </CardOverflow>
      <CardContent>
        <Typography fontSize="170%" fontWeight="lg">
          {data?.title}
        </Typography>
        <Typography fontSize="lg">{data?.text}</Typography>

        <Link
          component="button"
          underline="none"
          fontSize="10px"
          sx={{ color: "text.tertiary", my: 0.5 }}
        >
          {new Date(data?.time * 1000).toLocaleString("en-GB", {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          })}
        </Link>
        <Divider />
      </CardContent>
      <CardContent
        orientation="horizontal"
        sx={{ alignItems: "center", mx: -1 }}
      >
        <Box sx={{ width: 0, display: "flex" }}>
          <IconButton
            onClick={() => handleLike()}
            sx={{
              width: "max-content",
              display: "flex",
              gap: "3px",
              alignItems: "center",
              justifyContent: "space-evenly",
              padding: "0px 25px",
            }}
            variant="plain"
            color="neutral"
            size="md"
          >
            <p style={{ margin: "0", marginBottom: "3px" }}>
              {data?.likes?.length}
            </p>
            {data?.likes?.includes(user.email) ? (
              <FavoriteIcon sx={{ color: "red" }} />
            ) : (
              <FavoriteBorder />
            )}
          </IconButton>
          <IconButton
            sx={{
              width: "max-content",
              display: "flex",
              gap: "3px",
              alignItems: "center",
              justifyContent: "space-evenly",
              padding: "0px 25px",
            }}
            variant="plain"
            color="neutral"
            size="md"
          >
            <p style={{ margin: "0", marginBottom: "4px" }}>
              {data?.comments?.length}
            </p>
            <ModeCommentOutlined />
          </IconButton>
          <IconButton
            sx={{ padding: "0 25px" }}
            variant="plain"
            color="neutral"
            size="md"
          >
            <SendOutlined />
          </IconButton>
        </Box>
        <Box
          sx={{ display: "flex", alignItems: "center", gap: 0.5, mx: "auto" }}
        ></Box>
        <Box sx={{ width: 0, display: "flex", flexDirection: "row-reverse" }}>
          <IconButton variant="plain" color="neutral" size="sm">
            <BookmarkBorderRoundedIcon />
          </IconButton>
        </Box>
      </CardContent>
      <form onSubmit={handleComment} style={{ display: "flex" }} action="">
        <CardContent orientation="horizontal" sx={{ gap: 1 }}>
          <IconButton size="sm" variant="plain" color="neutral" sx={{ ml: -1 }}>
            <Avatar size="sm" src={user.photoURL} alt={user.displayName} />
          </IconButton>

          <Input
            variant="plain"
            size="sm"
            placeholder="Add a comment…"
            value={comment}
            sx={{ flex: 1, px: 0.5, "--Input-focusedThickness": "0px" }}
            onChange={(e) => setComment(e.target.value)}
          />
          <Button underline="none" role="button" type="submit">
            Post
          </Button>
        </CardContent>
      </form>
      <CardContent orientation="vertical" sx={{ gap: 1 }}>
        {data?.comments?.slice().reverse().map((record)=> <Comment record={record} />)}
      </CardContent>
    </Card>
  );
}
