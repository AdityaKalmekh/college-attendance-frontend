import http from "../http-common";

export const addFaculty = async (values) =>{
    return http.post("/addFaculty",values)
}

export const getFaculty = async (values) =>{
    
}

export const getFacultyBranch = async () =>{
    const dt = [];
    const branches = await http.get("/branch");
    branches.data.branchName.map((branch) =>{
        return dt.push(branch);
    })
    return dt;
}

export const getFacultySem = async (values) =>{
    const dt = [];
    const semester = await http.get(`/semester/${values}`);
    semester.data.sem.map((sem) =>{
        return dt.push(sem);
    })
    console.log(dt);
    return dt
}

export const getFacultySubject = async (bname,semester) =>{
    const dt = [];
    const subjects = await http.get(`/subject/${bname}/${semester}`);
    subjects.data.subjects.map((subject) =>{
        return dt.push(subject);
    })
    console.log(dt);
    return dt;
}