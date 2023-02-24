import Batch from "../models/batch.model";
import FacultyAdviser from "../models/faculty-adviser.model";
import Faculty from "../models/faculty.model";
import Grade from "../models/grade.model";
import Student from "../models/student.model";
import { generateToken, Response, verifyHash, hash } from "../utils";

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
      const accessToken = generateToken({
        id: student.id,
        username: student.username,
        role: "student",
      });
      const data = student.dataValues;
      return res.json(
        Response(200, "Login successful", { ...data, accessToken })
      );
    } catch (error) {
      return res
        .status(500)
        .json(Response(500, "Internal Server Error", error));
    }
  },
  async studentBulkRegister(req, res) {
    try {
      let { students } = req.body;
      students = await Promise.all(
        students.map(async (student) => {
          let pass = await hash(student.password);
          return { ...student, password: pass };
        })
      );

      await Student.bulkCreate(students);
      return res.json(Response(201, "Registration successful"));
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json(Response(500, "Internal Server Error", error));
    }
  },
  async getStudent(req, res) {
    try {
      const { studentId } = req.query;
      const user = await Student.findOne({
        where: { student_id: studentId },
        include: [
          {
            model: Grade,
            attributes: ["id", "grade", "phase", "graded_by"],
            include: [
              {
                model: Faculty,
                attributes: ["name", "email", "mobile"],
              },
            ],
          },
        ],
      });
      if (!user) {
        return res.json(Response(400, "User doesn't exist"));
      }
      return res.json(Response(200, "Success", user));
    } catch (error) {
      return res
        .status(500)
        .json(Response(500, "Internal Server Error", error));
    }
  },
  async getStudentsByBatch(req, res) {
    try {
      const { batchId } = req.params;
      const batch = await Student.findAll({ where: { batch_id: batchId } });
      return res.json(Response(200, "Success", batch));
    } catch (error) {
      return res
        .status(500)
        .json(Response(500, "Internal Server Error", error));
    }
  },
  async getFA(req, res) {
    try {
      const { id } = req.params;
      const data = await FacultyAdviser.findOne({ where: { student_id: id } });
      const fa = await Faculty.findOne({
        where: { faculty_id: data.faculty_id },
      });
      return res.json(Response(200, "Success", { fa: data, faculty: fa }));
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json(Response(500, "Internal Server Error", error));
    }
  },
  async grade(req, res) {
    try {
      const { studentId } = req.params;
      const { grade, graded_by, phase } = req.body;

      // const gradeExist = await Grade.findOne({ where: { phase } });
      // console.log(gradeExist);
      // if (gradeExist) {
      //   return res.status(202).json(Response(202, "Already graded"));
      // }
      const data = await Grade.create({
        student_id: studentId,
        grade,
        graded_by,
        phase,
      });

      return res.json(Response(201, "graded successfully", data));
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json(Response(500, "Internal Server Error", error));
    }
  },
  async updateGrade(req, res) {
    try {
      const { id } = req.params;
      const { grade } = req.body;
      const findGrade = await Grade.findByPk(id);
      if (findGrade) {
        const data = await Grade.update(
          {
            grade,
          },
          { where: { id } }
        );
        return res.json(Response(201, "graded successfully", data));
      }

      return res.json(Response(201, "grade not found"));
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json(Response(500, "Internal Server Error", error));
    }
  },

  async getAllGrades(req, res) {
    try {
      // const { studentId } = req.params;
      const data = await Grade.findAll();
      return res.json(Response(200, "Success", data));
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json(Response(500, "Internal Server Error", error));
    }
  },
};
export default studentController;
