// import Project from "../models/project.model";
import Sdg from "../models/sdg.model";
import { Response } from "../utils";

const sdgController = {
  async getSdg(req, res) {
    try {
      const sdg = await Sdg.findAll();
      return res.status(200).json(Response(200, "Success", sdg));
    } catch (error) {
      return res
        .status(500)
        .json(Response(500, "Internal Server Error", error));
    }
  },
  async deleteSdg(req, res) {
    try {
      const { id } = req.params;
      const sdg = await Sdg.destroy({ where: { id } });
      return res.status(200).json(Response(200, "Success", sdg));
    } catch (error) {
      return res
        .status(500)
        .json(Response(500, "Internal Server Error", error));
    }
  },
  async createSdg(req, res) {
    try {
      const { objective, description } = req.body;
      if (!title || !description) {
        return res.status(400).json(Response(400, "Empty sdg"));
      }
      await Sdg.create({ title, description });
      return res.status(200).json(Response(200, "sdg created successfully"));
    } catch (error) {
      return res
        .status(500)
        .json(Response(500, "Internal Server Error", error));
    }
  },
  async updateSdg(req, res) {
    try {
      const { id, objective, description } = req.body;
      if ((!id, !description, !title)) {
        return res.status(400).json(Response(400, "Id and name are required"));
      }
      const sdg = await Sdg.update({ title, description }, { where: { id } });
      return res
        .status(200)
        .json(Response(200, "Sdg name updated successfully"));
    } catch (error) {
      return res
        .status(500)
        .json(Response(500, "Internal Server Error", error));
    }
  },
};

export default sdgController;
