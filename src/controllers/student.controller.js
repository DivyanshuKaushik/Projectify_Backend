import Batch from "../models/batch.model";
import FacultyAdviser from "../models/faculty-adviser.model";
import Faculty from "../models/faculty.model";
import Student from "../models/student.model";
import { generateToken, Response, verifyHash } from "../utils";

const studentController = {
    async studentLogin(req, res) {
        try {
            const { username, password } = req.body;
            const student = await Student.findOne({ where: { username } });
            if (!student) {
                return res.json(Response(400, "User doesn't exist"));
            }
            const isPasswordValid = await verifyHash(password, student.password);
            if (!isPasswordValid) {
                return res.json(Response(400, "Invalid username or password"));
            }
            const accessToken = generateToken({id:student.id,username:student.username,role:"student"});
            const data = student.dataValues
            return res.json(Response(200, "Login successful", {...data,accessToken }));
            
        } catch (error) {
            return res.status(500).json(Response(500, "Internal Server Error", error));
        }
    },
    async getStudent(req, res) {
        try {
            const {studentId} = req.query;
            const user = await Student.findByPk(studentId);
            if(!user){
                return res.json(Response(400,"User doesn't exist"));
            }
            return res.json(Response(200,"Success",user));
        } catch (error) {
            return res.status(500).json(Response(500, "Internal Server Error", error));
        }
    },
    async getStudentsByBatch(req,res){
        try {
            const {batchId} = req.params;
            const batch = await Student.findAll({where:{batch_id:batchId}});
            return res.json(Response(200,"Success",batch));
        } catch (error) {
            return res.status(500).json(Response(500, "Internal Server Error", error));
        }
    },
    async getFA(req,res){
        try {
            const {id} = req.params;
           const data = await FacultyAdviser.findOne({where:{student_id:id}});
           const fa = await Faculty.findOne({where:{faculty_id:data.faculty_id}});
            return res.json(Response(200,"Success",fa));
        } catch (error) {
            console.log(error);
            return res.status(500).json(Response(500, "Internal Server Error", error));
        }
    },
    async updateGrade(req,res){
        try {
            const {id} = req.params;
            const {grade} = req.body;
            const data = await Student.update({grade},{where:{student_id:id}});
            return res.json(Response(200,"Updated grade successfully",data));
        } catch (error) {
            console.log(error);
            return res.status(500).json(Response(500, "Internal Server Error", error));
        }
    }
}
export default studentController;