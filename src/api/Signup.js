import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  setDoc,
} from "firebase/firestore";
import { firestore } from "../firebase";

export const getUserSignup = async () => {
  const data = [];
  const querySnapshot = await getDocs(collection(firestore, "signup"));
  querySnapshot.forEach((document) => {
    data.push({ ...document.data(), firebaseId: document.id });
  });
  return data;
};

export const createUserSignup = async (values) => {
  try {
    await addDoc(collection(firestore, "signup"), values);
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
