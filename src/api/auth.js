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

export const LoginWithEmailAndPassword = async (values) => {
  // const{sendRequest : sendTaskRequest} = useHttp();
  const { email, password } = values;
  console.log({ email, password });
  // sendTaskRequest({url : "/checkEmail",data: {email} ,method : "post"})
  // const signUpRes = signInWithEmailAndPassword(fireAuth, email, password);
  // console.log({ signUpRes });
  // return signUpRes;
};
export const logout = async () => fireAuth.signOut();
