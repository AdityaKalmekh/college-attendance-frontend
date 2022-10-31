import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  // getDocs,
  setDoc,
} from "firebase/firestore";
import { firestore } from "../firebase";
import http from "../http-common";

// export const getStudent = async () => {
//   const studentData = http.get("/getStudents");
//   studentData.then((response) => {
//     console.log(response.data.students);
//     return response.data.students;
//   });
// };
export const getStudent = async () => {
  const studentData = http.get("/getStudents");
  const dt = [];
  studentData.then((response) => {
    response.data.students.map((student) => {
      dt.push(student);
    });
    console.log(dt);
    return dt;
  });
};

// export const getStudent = async () => {
//   const dt = [];
//   const studentData = http.get("/getStudents");
//   // console.log(studentData);
//   studentData.then((response) => {
//     dt.push(response.data.students);
//     // response.data.students.forEach(stud =>{
//     //   dt.push({...stud});
//     // })
//   });
//   console.log(dt);
//   return dt;
// };

//   const data = [];
//   const querySnapshot = await getDocs(collection(firestore, "student"));
//   querySnapshot.forEach((document) => {
//     data.push({ ...document.data(), firebaseId: document.id });
//   });
//   console.log(data);
//   return data;
// };

export const createStudent = async (values) => {
  try {
    await addDoc(collection(firestore, "student"), values);
  } catch (err) {
    console.log({ err });
  }
  // return http.post("/addStudents", values);
};

export const updateStudent = async (values) => {
  try {
    await setDoc(doc(firestore, "student", values.firebaseId), values);
  } catch (err) {
    console.log({ err });
  }
};

export const deletestuentData = async (values) => {
  try {
    await deleteDoc(doc(firestore, "student", values.firebaseId));
  } catch (err) {
    console.log({ err });
  }
};
