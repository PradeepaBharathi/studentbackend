import express from 'express'

import { createStudent, deleteStudent, getAllStudents, getStudent, getStudentByNameController, updateStudent } from '../controller/studentController'

const router = express.Router();
export default (): express.Router =>{
    router.post('/create-student',createStudent)
    router.get('/all-student', getAllStudents);
    router.get('/student/:id', getStudent);
    router.get('/student-name/:name', getStudentByNameController);
    router.put('/edit-student/:id', updateStudent);
    router.delete('/delete-student/:id', deleteStudent);
    return router;
}