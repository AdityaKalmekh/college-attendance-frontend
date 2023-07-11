import { async } from "@firebase/util";
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

export const getBranch = async () => {
  const data = [];
  const branchData = await http.get("/getBranch");
  branchData.data.branches.map((branch) => {
    return data.push(branch);
  });
  // const querySnapshot = await getDocs(collection(firestore, "branch"));
  // querySnapshot.forEach((document) => {
  //   data.push({ ...document.data(), firebaseId: document.id });
  // });
  return data;
};

export const createBranch = async (values) => {
  return await http.post("/addBranch", values);
  // try {
  //   await addDoc(collection(firestore, "branch"), values);
  // } catch (err) {
  //   console.log({ err });
  // }
};

export const updateBranch = async (values) => {
  try {
    await setDoc(doc(firestore, "branch", values.firebaseId), values);
  } catch (err) {
    console.log({ err });
  }
};

export const deletebranchData = async (values) => {
  console.log(values);
  // try {
  //   await http.delete("/deleteBranch");
  // } catch (err) {
  //   console.log({ err });
  // }
};

export const getbranchName = async () => {
  const data = [];
  try {
    const branchName = await http.get("/branch");
    branchName.data.branchName.map((branch) =>{
      return data.push(branch);
    })
  } catch (error) {
    console.log(error);
  }
  return data;
}

export const getSem = async (branch) => {
  const data = [];
  try {
    const semesters = await http.get(`/semester/${branch}`)
    semesters.data.sem.map((semster) => {
      return data.push(semster)
    })
  } catch (error) {
    console.log(error);
  }
  return data;
}

export const getSubject = async (branch,semester) => {
  const data = [];
  try {
    const subjects = await http.get(`/subject/${branch}/${semester}`)
    subjects.data.subject.map((subject) => {
      return data.push(subject);
    })
  } catch (error) {
    console.log(error);
  }
  return data;
}

export const getId = async (fName) => {
  try {
    const id = await http.post(`/id/${fName}`);
    console.log(id.data);
    return id.data;  
  } catch (error) {
      console.error(error);   
  }
}

export const getNonAllocatedSubjects = async (facultyId,branch,sem,subject) => {
  const data = []
  try {
    const subjects = await http.get(`/getNonAllocatedSubjects/${facultyId}/${branch}/${sem}/${subject}`)
    subjects.data.map((subject) => {return data.push(subject)})
  } catch (error) {
    console.error(error);   
  }
  return data
}