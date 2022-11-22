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
  console.log({ email, password });
  const signUpRes = signInWithEmailAndPassword(fireAuth, email, password);
  console.log({ signUpRes });
  return signUpRes;
};
export const logout = async () => fireAuth.signOut();
