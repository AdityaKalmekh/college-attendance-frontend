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

export const getBranch = async () => {
  const data = [];
  // const branchData = await http.get("/getBranch");
  // branchData.data.branches.map((branch) => {
  //   return data.push(branch);
  // });
  const querySnapshot = await getDocs(collection(firestore, "branch"));
  querySnapshot.forEach((document) => {
    data.push({ ...document.data(), firebaseId: document.id });
  });
  return data;
};

export const createBranch = async (values) => {
  // return http.post("/addBranch", values);
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
