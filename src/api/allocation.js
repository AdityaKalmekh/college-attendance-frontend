import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  setDoc,
} from "firebase/firestore";
import { firestore } from "../firebase";
import http from "../http-common";


export const getAllocation = async () => {
  const data = [];
  const allocationData = await http.get("/getAllocation");
  allocationData.data.fAllocation.map((fdata) => {
    return data.push(fdata);
  })
  // const querySnapshot = await getDocs(collection(firestore, "allocation"));
  // querySnapshot.forEach((document) => {
  //   data.push({ ...document.data(), firebaseId: document.id });
  // });
  return data;
};

export const createAllocation = async (values) => {
  console.log(values);
  return http.post("/addAllocation", values);
  // try {
  //   await addDoc(collection(firestore, "allocation"), values);
  // } catch (err) {
  //   console.log({ err });
  // }
};

export const updateAllocation = async (values) => {
  console.log(values);
  try {
    return http.put("/editAllocation", values);
  } catch (err) {
    console.log({ err });
  }
  // try {
  //   await setDoc(doc(firestore, "allocation", values.firebaseId), values);
  // } catch (err) {
  //   console.log({ err });
  // }
};

export const deleteallocationData = async (values) => {
  console.log(values);
  try {
    return await http.delete(`/deleteAllocation?id=${values._id}`);
  } catch (err) {
    console.log({ err });
  }
};
