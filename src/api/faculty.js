import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  setDoc,
} from "firebase/firestore";
import { firestore } from "../firebase";
// import http from "../http-common";

export const getFaculty = async () => {
  const data = [];
  // const branchData = await http.get("/getBranch");
  // branchData.data.branches.map((branch) => {
  //   return data.push(branch);
  // });
  const querySnapshot = await getDocs(collection(firestore, "faculty"));
  querySnapshot.forEach((document) => {
    data.push({ ...document.data(), firebaseId: document.id });
  });
  return data;
};

export const createFaculty = async (values) => {
  // return http.post("/addBranch", values);
  try {
    await addDoc(collection(firestore, "faculty"), values);
  } catch (err) {
    console.log({ err });
  }
};

export const updateFaculty = async (values) => {
  try {
    await setDoc(doc(firestore, "faculty", values.firebaseId), values);
  } catch (err) {
    console.log({ err });
  }
};

export const deletefacultyData = async (values) => {
  try {
    await deleteDoc(doc(firestore, "faculty", values.firebaseId));
  } catch (err) {
    console.log({ err });
  }
};
