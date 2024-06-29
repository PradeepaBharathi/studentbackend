import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true},
    phone:{type:Number,required:true},
    enrollNumber:{type:String,required:true},
    dateOfAdmission:{type:String,required:true},
},
{timestamps:true})

export const studentModel = mongoose.model("Student",studentSchema)
export const createStudents =(values:Record<string,any>) => new studentModel(values).save().then((student)=> student.toObject())
export const getStudents = () => studentModel.find()
export const getStudentByName =(name:string) => studentModel.findOne({name})
export const getStudentByEmail =(email:string) => studentModel.findOne({email})
export const getStudentById = (id:string)=> studentModel.findById(id)

export const deleteStudentById = async (id: string) => {
    try {
        const objectId = new mongoose.Types.ObjectId(id);  // Convert id to ObjectId
        const deletedStudent = await studentModel.findOneAndDelete({ _id: objectId });
        return deletedStudent;
    } catch (error) {
        console.error("Error deleting student:", error);
        throw error;
    }
};
export const updateUserById =(id:string,values:Record<string,any>)=> studentModel.findByIdAndUpdate(id,values)