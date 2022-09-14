import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { fireAuth } from "../firebase";

export const login = () => {
  const provider = new GoogleAuthProvider();
  fireAuth.languageCode = "ja";
  return signInWithPopup(fireAuth, provider);
};

export const loginWithEmailAndPassword = async (values) => {
  const { email, password } = values;
  return signInWithEmailAndPassword(fireAuth, email, password);
};
export const logout = async () => fireAuth.signOut();
