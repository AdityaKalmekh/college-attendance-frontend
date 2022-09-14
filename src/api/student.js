import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  setDoc,
} from "firebase/firestore";
import { firestore } from "../firebase";

export const getStudent = async () => {
  const data = [];
  const querySnapshot = await getDocs(collection(firestore, "student"));
  querySnapshot.forEach((document) => {
    data.push({ ...document.data(), firebaseId: document.id });
  });
  return data;
};

export const createStudent = async (values) => {
  try {
    await addDoc(collection(firestore, "student"), values);
  } catch (err) {
    console.log({ err });
  }
};

export const updateStudent = async (values) => {
  try {
    await setDoc(doc(firestore, "student", values.firebaseId), values);
  } catch (err) {
    console.log({ err });
  }
};

export const deletestuentData = async (values) => {
  try {
    await deleteDoc(doc(firestore, "student", values.firebaseId));
  } catch (err) {
    console.log({ err });
  }
};
