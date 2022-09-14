import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  setDoc,
  where,
  query,
} from "firebase/firestore";
import { firestore } from "../firebase";

export const getUsers = async () => {
  const data = [];
  const querySnapshot = await getDocs(collection(firestore, "user"));
  querySnapshot.forEach((document) => {
    data.push({ ...document.data(), firebaseId: document.id });
  });
  return data;
};

export const createUser = async (values) => {
  await addDoc(collection(firestore, "user"), values);
};

export const updateUser = async (values) => {
  await setDoc(doc(firestore, "user", values.firebaseId), values);
};

export const deleteUserData = async (values) => {
  const response = await deleteDoc(doc(firestore, "user", values.firebaseId));
  return response;
};

export const getUser = async (email) => {
  const data = [];
  const querySnapshot = await getDocs(
    query(collection(firestore, "user"), where("email", "==", email))
  );
  querySnapshot.forEach((document) => {
    data.push({ ...document.data(), firebaseId: document.id });
  });
  return data[0];
};
