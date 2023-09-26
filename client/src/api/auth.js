import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  getAuth,
  updateProfile,
} from "firebase/auth";
import { auth, db } from "../firebase";
import { toast } from "react-hot-toast";
import { addDoc, collection, doc, getDoc, setDoc } from "firebase/firestore";

export const LoginAPI = async (email, password) => {
  try {
    let response = await signInWithEmailAndPassword(auth, email, password);
    toast.success("Successfully logged in.");
    return response;
  } catch (err) {
    toast.error("Check your credentials please");
  }
};

export const RegisterAPI = async (credentials) => {
  try {
    let response = await createUserWithEmailAndPassword(
      auth,
      credentials.email,
      credentials.password
    );
    updateProfile(auth.currentUser, {
      displayName: credentials.name,
    }).catch((error) => {
      console.log(error);
      toast.error("Trouble saving details");
    });
    newUser({ country: credentials.country, type: credentials.type, email:credentials.email });
    toast.success("Account Created");

    let response2 = await signInWithEmailAndPassword(
      auth,
      credentials.email,
      credentials.password
    );
    return response;
  } catch (err) {
    toast.error("Trouble Creating Account");
    console.log(err);
  }
};

export const GoogleApi = async () => {
  try {
    const googleProvider = new GoogleAuthProvider();
    const response = await signInWithPopup(auth, googleProvider);
    console.log(response.user.email);
    newUser({ country: "", type: "", email:response.user.email });
    return response;
  } catch (err) {}
};

export const LogOutAPI = async () => {
  signOut(auth)
    .then(() => {
      toast.success("Signed Out Successfully");
    })
    .catch((error) => {
      console.log(error);
      toast.error("Something went wrong :/");
    });
};

const newUser = async (credentials) => {
  const docRef = doc(db, "users", credentials.email);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    console.log("Document data:", docSnap.data());
  } else {
    await setDoc(doc(db, "users", credentials.email), {
      country: credentials.country,
      type: credentials.type,
    });

  }
};
