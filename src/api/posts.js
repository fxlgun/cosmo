import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase";

export const addPost = (post) => {
  const finalPost = {
    ...post,
    id: `${post.email}_${Math.floor(parseInt(new Date().getTime()) / 1000)}`,
    time: Math.floor(parseInt(new Date().getTime()) / 1000),
  };
  setDoc(doc(db, "posts", finalPost?.id), finalPost);
};

export const getSinglePost = async (id) => {
  const docSnap = await getDoc(doc(db, "posts", id));

  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    // docSnap.data() will be undefined in this case
    console.log("No such document!");
  }
};

export const getPost = async () => {
  let docs = [];
  const querySnapshot = await getDocs(collection(db, "posts"));
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    docs.push(doc.data());
  });
  docs.reverse();
  return docs;
};

export const likePost = async (email, post, setData) => {
  const likesArray = post?.likes;
  likesArray?.includes(email)
    ? likesArray?.splice(likesArray?.indexOf(email))
    : likesArray?.push(email);
  setData({ ...post, likes: likesArray });
  await updateDoc(doc(db, "posts", post.id), {
    likes: likesArray,
  });
};

export const commentPost = (newData) => {
  console.log(newData);
  updateDoc(doc(db, "posts", newData.id), newData);
};
