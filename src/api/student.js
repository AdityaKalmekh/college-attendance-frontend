import {
  deleteDoc,
  doc,
  setDoc,
  getDocs,
  collection,
  addDoc,
} from "firebase/firestore";
import { firestore } from "../firebase";
import http from "../http-common";

export const getStudent = async () => {
  // const data = [];
  // const querySnapshot = await getDocs(collection(firestore, "student"));
  // querySnapshot.forEach((document) => {
  //   data.push({ ...document.data(), firebaseId: document.id });
  // });
  // return data;

  const dt = [];
  const studentData = await http.get("/getStudents");
  studentData.data.students.map((student) => {
    return dt.push(student);
  });
  console.log(dt);
  return dt;
};

export const createStudent = async (values) => {
  // try {
  //   await addDoc(collection(firestore, "student"), values);
  // } catch (err) {
  //   console.log({ err });
  // }
  return http.post("/addStudents", values);
};

export const updateStudent = async (values) => {
  console.log(values);
  try {
    return http.put("/editStudent", values);
  } catch (err) {
    console.log({ err });
  }
};

export const deletestuentData = async (values) => {
  console.log(values._id);
  return http.delete(`/deleteStudent?id=${values._id}`);
  // try {
  //   await deleteDoc(doc(firestore, "student", values.firebaseId));
  // } catch (err) {
  //   console.log({ err });
  // }
};