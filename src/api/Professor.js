import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  setDoc,
} from "firebase/firestore";
import { firestore } from "../firebase";

export const getProfessor = async () => {
  const data = [];
  const querySnapshot = await getDocs(collection(firestore, "professor"));
  querySnapshot.forEach((document) => {
    data.push({ ...document.data(), firebaseId: document.id });
  });
  return data;
};

export const createProfessor = async (values) => {
  try {
    await addDoc(collection(firestore, "professor"), values);
  } catch (err) {
    console.log({ err });
  }
};

export const updateProfessor = async (values) => {
  try {
    await setDoc(doc(firestore, "professor", values.firebaseId), values);
  } catch (err) {
    console.log({ err });
  }
};

export const deleteProfessorData = async (values) => {
  try {
    await deleteDoc(doc(firestore, "professor", values.firebaseId));
  } catch (err) {
    console.log({ err });
  }
};
