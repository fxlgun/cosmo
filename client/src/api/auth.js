import { createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../firebase";
import { toast } from "react-hot-toast";

export const LoginAPI = async (email, password) => {
    try {
      let response = await signInWithEmailAndPassword(auth, email, password);
      toast.success("Successfully logged in.")
      return response;
    } catch (err) {
      toast.error("Check your credentials please")
    }
  };

  export const RegisterAPI = async (email, password) => {
    try {
      let response = await createUserWithEmailAndPassword(auth, email, password);
      toast.success("Account Created");
      let response2 = signInWithEmailAndPassword(auth, email, password);
      return response;
    } catch (err) {
      toast.error("Trouble Creating Account")
    }
  };  

export const GoogleApi = () => {
  try {
    const googleProvider = new GoogleAuthProvider()
    const response = signInWithPopup(auth, googleProvider)
    toast.success("Successfully logged in.")
    return response 
  } catch (err) {
    
  }
}