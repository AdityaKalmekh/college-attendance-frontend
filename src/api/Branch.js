import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  setDoc,
} from "firebase/firestore";
import { firestore } from "../firebase";

export const getBranch = async () => {
  const data = [];
  const querySnapshot = await getDocs(collection(firestore, "branch"));
  querySnapshot.forEach((document) => {
    data.push({ ...document.data(), firebaseId: document.id });
  });
  return data;
};

export const createBranch = async (values) => {
  try {
    await addDoc(collection(firestore, "branch"), values);
  } catch (err) {
    console.log({ err });
  }
};

export const updateBranch = async (values) => {
  try {
    await setDoc(doc(firestore, "branch", values.firebaseId), values);
  } catch (err) {
    console.log({ err });
  }
};

export const deletebranchData = async (values) => {
  try {
    await deleteDoc(doc(firestore, "branch", values.firebaseId));
  } catch (err) {
    console.log({ err });
  }
};
