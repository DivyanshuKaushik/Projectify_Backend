import { generateToken, hash, Response, verifyHash } from "../utils";

import Batch from "../models/batch.model";
import Student from "../models/student.model";
import Project from "../models/project.model";
import Faculty from "../models/faculty.model";
import PanelMember from "../models/panel-member.model";
import FacultyAdviser from "../models/faculty-adviser.model";

const facultyControllers = {
    async facultyLogin(req, res) {
        try {
            const { email, password } = req.body;
            const faculty = await Faculty.findOne({ where: { email } });
            if (!faculty) {
                return res.json(Response(400, "User doesn't exist"));
            }
            const isPasswordValid = await verifyHash(password, faculty.password);
            if (!isPasswordValid) {
                return res.json(Response(400, "Invalid Credentials"));
            }
            const accessToken = generateToken({faculty_id:faculty.faculty_id,email:faculty.email,role:faculty.role});
            const data = faculty.dataValues
            return res.json(Response(200, "Login successful", {...data,accessToken }));
            
        } catch (error) {
            return res.status(500).json(Response(500, "Internal Server Error", error));
        }
    },
    async facultyRegister(req, res) {
        try {
            let { faculty_id,email, password, name, mobile, designation,role } = req.body;
            const faculty = await Faculty.findOne({ where: { faculty_id } });
            if (faculty) {
                return res.json(Response(400, "User already exists"));
            }
            password = await hash(password);
            const newFaculty = await Faculty.create({ faculty_id,email, password, name, mobile, designation,role });
            return res.json(Response(201, "Registration successful"));
        } catch (error) {
            return res.status(500).json(Response(500, "Internal Server Error", error));
        }

    },
    async facultyBulkRegister(req, res) {
        try {
            let  { faculties } = req.body;
            faculties =  await Promise.all(faculties.map(async (faculty) => {
                let pass = await hash(faculty.password)
                return {...faculty,password: pass}
            }))
           
            await Faculty.bulkCreate(faculties);
            return res.json(Response(201, "Registration successful"));
        } catch (error) {
            console.log(error);
            return res.status(500).json(Response(500, "Internal Server Error", error));
        }

    },
    async createFacultyAdvisers(req, res) {
        try {
            const {facultyAdvisers} = req.body;
            if(!facultyAdvisers.length) {
                return res.status(400).json(Response(400,"Empty facultyAdvisers"));
            }
            await FacultyAdviser.bulkCreate(facultyAdvisers)
            return res.status(200).json(Response(200,"facultyAdvisers created successfully"));
            
        } catch (error) {
            return res.status(500).json(Response(500, "Internal Server Error", error));
        }
    },
    async changePassword(req, res) {
        try {
            const { facultyId,oldPassword,newPassword } = req.body;
            const faculty = await Faculty.findOne({ where: { faculty_id:facultyId } });
            if (!faculty) {
                return res.json(Response(400, "User doesn't exist"));
            }
            const verifyOldPassword = await verifyHash(oldPassword, faculty.password);
            if (!verifyOldPassword) {
                return res.json(Response(400, "Invalid Credentials"));
            }
            const newHashedPassword = await hash(newPassword);
            await Faculty.update({password:newHashedPassword},{where:{faculty_id:facultyId}})

            return res.json(Response(201, "Password Updated successfully"));
        } catch (error) {
            return res.status(500).json(Response(500, "Internal Server Error", error));
        }

    },
    async getFaculty(req,res) {
        try {
            const {facultyId} = req.query;
            const data = await Faculty.findByPk(facultyId);
            return res.status(200).json(Response(200,"Success",data));
        } catch (error) {
            return res.status(500).json(Response(500,"Internal Server Error",error));
        }
    },
    
    async getBatches(req,res) {
        try {
            const {facultyId} = req.query;
            const data = await PanelMember.findAll({where:{faculty_id:facultyId},include:[{model:Batch,include:[Student]}]})
            return res.status(200).json(Response(200,"Success",data));
        } catch (error) {
            return res.status(500).json(Response(500,"Internal Server Error",error));
        }
    },
    async getStudentsByFaculty(req,res) {
        try {
            const {facultyId} = req.query;
            const data = await FacultyAdviser.findAll({where:{faculty_id:facultyId},include:[{model:Student,attributes:{exclude:["password"]}}]})
            return res.status(200).json(Response(200,"Success",data));
        } catch (error) {
            return res.status(500).json(Response(500,"Internal Server Error",error));
        }
    }
};

export default facultyControllers;
