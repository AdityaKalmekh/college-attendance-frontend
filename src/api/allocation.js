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

export const getAllocation = async () => {
  const data = [];
  // const branchData = await http.get("/getBranch");
  // branchData.data.branches.map((branch) => {
  //   return data.push(branch);
  // });
  const querySnapshot = await getDocs(collection(firestore, "allocation"));
  querySnapshot.forEach((document) => {
    data.push({ ...document.data(), firebaseId: document.id });
  });
  return data;
};

export const createAllocation = async (values) => {
  // return http.post("/addBranch", values);
  try {
    await addDoc(collection(firestore, "allocation"), values);
  } catch (err) {
    console.log({ err });
  }
};

export const updateAllocation = async (values) => {
  try {
    await setDoc(doc(firestore, "allocation", values.firebaseId), values);
  } catch (err) {
    console.log({ err });
  }
};

export const deleteallocationData = async (values) => {
  try {
    await deleteDoc(doc(firestore, "allocation", values.firebaseId));
  } catch (err) {
    console.log({ err });
  }
};
