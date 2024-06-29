import express from 'express'
import { createStudents, deleteStudentById, getStudentByEmail, getStudentById, getStudentByName, getStudents, updateUserById} from '../db/students';
export const createStudent = async(req:express.Request,res:express.Response)=>{
try {
    const {name,email,phone,enrollNumber,dateOfAdmission} = req.body;
    if(!name || !email || !phone || !enrollNumber || !dateOfAdmission){
        return res.status(400).json({ message: "Please fill all fields" })
    }
    const existingStudent = await getStudentByEmail(email)
    if(existingStudent){
        return res.status(400).json({ message: "no data available" })
    }

     const student = await createStudents({name,email,phone,enrollNumber,dateOfAdmission})
     res.status(201).json(student);
} catch (error) {
    console.log(error)
     res.status(400).json({message:"error occured"})
}
}

export const getAllStudents = async (req: express.Request, res: express.Response) => {
    try {
        const students = await getStudents();
        res.status(200).json(students);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "An error occurred while fetching students" });
    }
};

export const getStudent = async (req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params;
        const student = await getStudentById(id);
        if (!student) {
            return res.status(404).json({ message: "Student not found" });
        }
        res.status(200).json(student);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "An error occurred while fetching the student" });
    }
};
export const getStudentByNameController = async (req: express.Request, res: express.Response) => {
    try {
        const { name } = req.params;
        const student = await getStudentByName(name);
        
        if (!student) {
            return res.status(404).json({ message: "Student not found" });
        }
        
        res.status(200).json([student]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "An error occurred while fetching the student" });
    }
};
export const updateStudent = async (req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params;
        const updatedStudent = await updateUserById(id, req.body);
        if (!updatedStudent) {
            return res.status(404).json({ message: "Student not found" });
        }
        res.status(200).json({ message: "Student updated successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "An error occurred while updating the student" });
    }
};

export const deleteStudent = async (req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params;
        console.log(id)
        const deletedStudent = await deleteStudentById(id);
        console.log(deleteStudent)
        if (!deletedStudent) {
            return res.status(404).json({ message: "Student not found" });
        }
        res.status(200).json({ message: "Student deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "An error occurred while deleting the student" });
    }
};