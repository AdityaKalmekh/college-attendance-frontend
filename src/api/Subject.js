import {
  addDoc,
  //   deleteDoc,
  //   doc,
  // setDoc,
  getDocs,
  collection,
} from "firebase/firestore";
import { firestore } from "../firebase";
// import http from "../http-common";

export const getSubject = async () => {
  const data = [];
  const querySnapshot = await getDocs(collection(firestore, "subject"));
  querySnapshot.forEach((document) => {
    data.push({ ...document.data() });
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

export const createSubject = async (container) => {
  try {
    await addDoc(collection(firestore, "subject"), container);
  } catch (err) {
    console.log({ err });
  }
  // return http.post("/addStudents", values);
};

// export const updateSubject = async (values) => {
//   try {
//     return http.put("/editSubject", values);
//   } catch (err) {
//     console.log({ err });
//   }
// };

// export const deleteSubjectData = async (values) => {
//   console.log(values._id);
//   return http.delete(`/deleteSubject?id=${values._id}`);
// };
