import Project from "../models/project.model";
import Sdg from "../models/sdg.model";
import { Response } from "../utils";
import db from "../db";
const projectController = {
  async getProjectById(req, res) {
    try {
      const { id } = req.params;
      // find project by pk and include sdg by sdg_id of the project
      // const project = await Promise.all(
      //   const a = await Project.findByPk(id}
      // )
      const project = await Project.findByPk(id);
      const sdg = await Sdg.findByPk(project.sdg_id);
      // const project = await Project.findByPk(id, {
      //   include: {
      //     model: Sdg,
      //     where: {
      //       id: sequelize.col("Project.sdg_id"),
      //     },
      //   },
      // });
      console.log(project, sdg);
      return res
        .status(200)
        .json(Response(200, "Success", { ...project.dataValues, sdg }));
    } catch (error) {
      return res
        .status(500)
        .json(Response(500, "Internal Server Error", error));
    }
  },
  async comment(req, res) {
    try {
      const { id } = req.params;
      const project = await Project.update(
        { comments: req.body.comments },
        { where: { id } }
      );
      return res.status(200).json(Response(200, "Success", project));
    } catch (error) {
      return res
        .status(500)
        .json(Response(500, "Internal Server Error", error));
    }
  },
  async createProjects(req, res) {
    try {
      const { projects } = req.body;
      if (!projects.length) {
        return res.status(400).json(Response(400, "Empty projects"));
      }
      await Project.bulkCreate(projects);
      return res
        .status(200)
        .json(Response(200, "projects created successfully"));
    } catch (error) {
      return res
        .status(500)
        .json(Response(500, "Internal Server Error", error));
    }
  },
  async updateProjectName(req, res) {
    try {
      const { id, name } = req.body;
      if ((!id, !name)) {
        return res.status(400).json(Response(400, "Id and name are required"));
      }
      const project = await Project.update({ name }, { where: { id } });
      return res
        .status(200)
        .json(Response(200, "Project name updated successfully"));
    } catch (error) {
      return res
        .status(500)
        .json(Response(500, "Internal Server Error", error));
    }
  },
  async updateProjectSdg(req, res) {
    try {
      const { id, sdg_id } = req.body;
      if ((!id, !sdg_id)) {
        return res
          .status(400)
          .json(Response(400, "Id and sdg_id are required"));
      }
      // const sdg = await Sdg.findByPk(sdg_id);
      // const project = await Project.update({ sdg_id }, { where: { id } });
      // const project = await Project.findByPk(id);
      // project.sdg_id = sdg_id;
      // project.Sdg = sdg;
      // await project.save();
      const project = await Project.update({ sdg_id }, { where: { id } });
      return res
        .status(200)
        .json(Response(200, "Project sdg_id updated successfully"));
    } catch (error) {
      return res
        .status(500)
        .json(Response(500, "Internal Server Error", error));
    }
  },
};

export default projectController;
