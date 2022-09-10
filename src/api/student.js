import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  getDoc,
  setDoc,
  query,
} from "firebase/firestore";
import { firestore } from "../firebase";

export const getStudentCollections = async () => {
  const data = [];
  const querySnapshot = await getDocs(
    query(collection(firestore, "student-collection"))
  );
  querySnapshot.forEach((document) => {
    data.push({ ...document.data(), firebaseId: document.id });
  });
  return data;
};

export const getSingleStudent = async (id) => {
  const data = await getDoc(
    doc(collection(firestore, "student-collection"), id)
  );
  return data.data();
};

export const addStudentCollection = async (values) => {
  await addDoc(collection(firestore, "student-collection"), values);
};

export const updateStudentCollection = async (values) => {
  await setDoc(doc(firestore, "student-collection", values.firebaseId), values);
};

export const deleteStudentCollection = async (values) => {
  const response = await deleteDoc(
    doc(firestore, "student-collection", values.firebaseId)
  );
  return response;
};
