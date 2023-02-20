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
  try{
    const data = [];
    const facultyData = await http.get("/getFaculty");
    facultyData.data.faculty.map((faculty) => {
      return data.push(faculty);
    });
    return data;
  } catch(err){
    console.log({err});
  }
};

export const createFaculty = async (values) => {
  try{
    return http.post("/addFaculty", values);
  } catch (err){
    console.log({err});
  }
};

export const updateFaculty = async (values) => {
  console.log(values);
  try {
    return await http.put("/editFaculty", values);
  } catch (err) {
    console.log({ err });
  }
};

export const deletefacultyData = async (values) => {
  try {
    return await http.delete(`/deleteFaculty?id=${values._id}`);  
  } catch (err) {
    console.log({ err });
  }
};
