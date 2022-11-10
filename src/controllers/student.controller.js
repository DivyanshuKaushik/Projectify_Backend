import Batch from "../models/batch.model";
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
            const user = await Student.findByPk(req.user.id);
            if(!user){
                return res.json(Response(400,"User doesn't exist"));
            }
            return res.json(Response(200,"Success",user));
        } catch (error) {
            return res.status(500).json(Response(500, "Internal Server Error", error));
        }
    },
    async getStudentBatch(req,res){
        try {
            const {batchId} = req.params;
            const batch = await Batch.findOne({whrere:{id:batchId},include:[Student]});
            return res.json(Response(200,"Success",batch));
        } catch (error) {
            return res.status(500).json(Response(500, "Internal Server Error", error));
        }
    }
}
export default studentController;