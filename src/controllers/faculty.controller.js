import { generateToken, Response, verifyHash } from "../utils";

import Batch from "../models/batch.model";
import Student from "../models/student.model";
import Project from "../models/project.model";
import Faculty from "../models/faculty.model";
import PanelMember from "../models/panel-member.model";

const facultyControllers = {
    async facultyLogin(req, res) {
        try {
            const { username, password } = req.body;
            const faculty = await Faculty.findOne({ where: { username } });
            if (!faculty) {
                return res.json(Response(400, "User doesn't exist"));
            }
            const isPasswordValid = await verifyHash(password, faculty.password);
            if (!isPasswordValid) {
                return res.json(Response(400, "Invalid username or password"));
            }
            const accessToken = generateToken({id:faculty.id,username:faculty.username,role:"faculty"});
            const data = faculty.dataValues
            return res.json(Response(200, "Login successful", {...data,accessToken }));
            
        } catch (error) {
            return res.status(500).json(Response(500, "Internal Server Error", error));
        }
    },
    async facultyRegister(req, res) {
        try {
            const { username, password, name, department, designation } = req.body;
            const faculty = await Faculty.findOne({ where: { username } });
            if (faculty) {
                return res.json(Response(400, "User already exists"));
            }
            const newFaculty = await Faculty.create({ username, password, name, department, designation });
            return res.json(Response(201, "Registration successful"));
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

    async getFacultyByUsername(username) {
        try {
            return await Faculty.findOne({ where: { username } });
        } catch (error) {
            throw Error(error);
        }
    },

    
    async getProject(projectId){
        try {
            const project = await Project.findByPk(projectId);
            // console.log(batches);
            return project;
        } catch (error) {
            throw Error(error);
        }
    },
    async getBatches(req,res) {
        try {
            const {facultyId} = req.query;
            // const data = await Batch.findAll({
            //     where: {
            //         facultyId:req.user.id,
            //     },
            //     include: [
            //         {
            //             model: Student,
            //         },
            //     ],
            // });
            const data = await PanelMember.findAll({where:{faculty_id:facultyId},include:[{model:Batch,include:[Student]}]})
            return res.status(200).json(Response(200,"Success",data));
        } catch (error) {
            return res.status(500).json(Response(500,"Internal Server Error",error));
        }
    }
};

export default facultyControllers;
