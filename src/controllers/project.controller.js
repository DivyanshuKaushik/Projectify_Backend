import Project from "../models/project.model";
import { Response } from "../utils";

const projectController = {
    async getProjectById(req, res) {
        try {
            const { id } = req.params;
            const project = await Project.findByPk(id);
            return res.status(200).json(Response(200, "Success", project));
        } catch (error) {
            return res.status(500).json(Response(500, "Internal Server Error", error));
        }
    },
    async comment(req, res) {
        try {
            const { id } = req.params;
            const project = await Project.update({ comments: req.body.comments }, { where: { id } });
            return res.status(200).json(Response(200, "Success", project));
        } catch (error) {
            return res.status(500).json(Response(500, "Internal Server Error", error));
        }
    }
}

export default projectController