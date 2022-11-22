import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  setDoc,
} from "firebase/firestore";
import { firestore, fireAuth } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

export const getUserSignup = async () => {
  const data = [];
  const querySnapshot = await getDocs(collection(firestore, "user"));
  querySnapshot.forEach((document) => {
    data.push({ ...document.data(), firebaseId: document.id });
  });
  return data;
};

export const createUserSignup = async (values) => {
  try {
    console.log({ values });
    const response = await addDoc(collection(firestore, "user"), values);
    console.log({ signUPresponse: response });

    // const signup = document.querySelector(".signup");
    // signup.addEventListener("submit", (e) => {
    //   e.preventDefault();

    createUserWithEmailAndPassword(fireAuth, values.email, values.password)
      .then((res) => {
        console.log(res);
        // signup.reset();
      })
      .catch((err) => {
        console.log(err);
      });
    // });
  } catch (err) {
    console.log({ err });
  }
};

export const updateUserSignup = async (values) => {
  try {
    await setDoc(doc(firestore, "signup", values.firebaseId), values);
  } catch (err) {
    console.log({ err });
  }
};

export const deleteUserSignupData = async (values) => {
  try {
    await deleteDoc(doc(firestore, "signup", values.firebaseId));
  } catch (err) {
    console.log({ err });
  }
};
