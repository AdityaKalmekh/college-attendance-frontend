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

export const getFaculty = async () => {
  const data = [];
  const querySnapshot = await getDocs(collection(firestore, "faculty"));
  querySnapshot.forEach((document) => {
    data.push({ ...document.data(), firebaseId: document.id });
  });
  return data;

  // const dt = [];
  // const studentData = await http.get("/getStudents");
  // studentData.data.students.map((student) => {
  //   return dt.push(student);
  // });
  // console.log(dt);
  // return dt;
};

export const createFaculty = async (values) => {
  try {
    await addDoc(collection(firestore, "faculty"), values);
  } catch (err) {
    console.log({ err });
  }
  // return http.post("/addStudents", values);
};

//   export const updateStudent = async (values) => {
//     try {
//       return http.put("/editStudent", values);
//     } catch (err) {
//       console.log({ err });
//     }
//   };

export const updateFaculty = async (values) => {
  try {
    await setDoc(doc(firestore, "faculty", values.firebaseId), values);
  } catch (err) {
    console.log({ err });
  }
};

export const deleteFacultyData = async (values) => {
  console.log(values._id);
  // return http.delete(`/deleteStudent?id=${values._id}`);
  try {
    await deleteDoc(doc(firestore, "faculty", values.firebaseId));
  } catch (err) {
    console.log({ err });
  }
};
