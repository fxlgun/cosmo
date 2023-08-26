import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase";

export const LoginAPI = async (email, password) => {
    try {
      let response = await signInWithEmailAndPassword(auth, email, password);
      return response;
    } catch (err) {
      return err;
    }
  };

  export const RegisterAPI = async (credentials) => {
    try {
      const response = await createUserWithEmailAndPassword(auth, credentials.email, credentials.password);
      const userData = {
        type: credentials.type,
        firstName: credentials.firstName,
        lastName: credentials.lastName,
      }
    //   await updateProfile(response?.user, userData)
      return response;
    } catch (err) {
      return err;
    }
  };  