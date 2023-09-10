import { createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { auth, db } from "../firebase";
import { toast } from "react-hot-toast";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";

export const LoginAPI = async (email, password) => {
    try {
      let response = await signInWithEmailAndPassword(auth, email, password);
      toast.success("Successfully logged in.")
      return response;
    } catch (err) {
      toast.error("Check your credentials please")
    }
  };

  export const RegisterAPI = async (credentials) => {
    try {
      let response = await createUserWithEmailAndPassword(auth, credentials.email, credentials.password);

      toast.success("Account Created");
      const {password, ...creds} = credentials
      const docRef = await setDoc(doc(collection(db, "users"), credentials.email), creds);
      console.log(docRef);
      let response2 = await signInWithEmailAndPassword(auth, credentials.email, credentials.password);
      return response;
    } catch (err) {
      toast.error("Trouble Creating Account")
      console.log(err);
    }
  };  

export const GoogleApi = async () => {
  try {
    const googleProvider = new GoogleAuthProvider()
    const response = await signInWithPopup(auth, googleProvider)
    console.log(response);
    return response 
  } catch (err) {
    
  }
}

export const LogOutAPI = async()  => {
  signOut(auth).then(() => {
    toast.success('Signed Out Successfully')
  }).catch((error) => {
    console.log(error);
    toast.error("Something went wrong :/")
  });

}

const newUser = () => {

}