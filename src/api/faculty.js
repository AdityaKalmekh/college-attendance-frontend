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

export const getFaculty = async () => {
  const data = [];
  const facultyData = await http.get("/getFaculty");
  facultyData.data.faculty.map((faculty) => {
    return data.push(faculty);
  });
  // const querySnapshot = await getDocs(collection(firestore, "faculty"));
  // querySnapshot.forEach((document) => {
  //   data.push({ ...document.data(), firebaseId: document.id });
  // });
  console.log(data);
  return data;
};

export const createFaculty = async (values) => {
   return http.post("/addFaculty", values);
  // try {
  //   await addDoc(collection(firestore, "faculty"), values);
  // } catch (err) {
  //   console.log({ err });
  // }
};

export const updateFaculty = async (values) => {
  console.log(values);
  try {
    return await http.put("/editFaculty", values);
  } catch (err) {
    console.log({ err });
  }
  // try {
  //   await setDoc(doc(firestore, "faculty", values.firebaseId), values);
  // } catch (err) {
  //   console.log({ err });
  // }
};

export const deletefacultyData = async (values) => {
  try {
    return await http.delete(`/deleteFaculty?id=${values._id}`);  
    // await deleteDoc(doc(firestore, "faculty", values.firebaseId));
  } catch (err) {
    console.log({ err });
  }
};
