import Review from "../models/review.model";
import { Response } from "../utils";

const reviewController = {
  async getAllReviews(req, res) {
    try {
      const data = await Review.findAll();
      return res.json(Response(200, "Success", data));
    } catch (error) {
      return res
        .status(500)
        .json(Response(500, "Internal Server Error", error));
    }
  },
  async getReviewById(req, res) {
    try {
      const data = await Review.findByPk(req.params.id);
      return res.json(Response(200, "Success", data));
    } catch (error) {
      return res
        .status(500)
        .json(Response(500, "Internal Server Error", error));
    }
  },
  async createReview(req, res) {
    try {
      const { deadline, batch, phase, fields } = req.body;
      const data = await Review.create({
        deadline,
        batch,
        phase,
        fields,
      });
      return res.json(Response(200, "Review created successfully", data));
    } catch (error) {
      return res
        .status(500)
        .json(Response(500, "Internal Server Error", error));
    }
  },
  async getReviewByBatch(req, res) {
    try {
      //   console.log(req.params);
      const data = await Review.findAll({
        where: {
          batch: req.params.batch,
        },
      });
      return res.json(Response(200, "Success", data));
    } catch (error) {
      return res
        .status(500)
        .json(Response(500, "Internal Server Error", error));
    }
  },
  async deleteReview(req, res) {
    try {
      const data = await Review.destroy({
        where: {
          id: req.params.id,
        },
      });
      return res.json(Response(200, "Review deleted successfully", data));
    } catch (error) {
      return res
        .status(500)
        .json(Response(500, "Internal Server Error", error));
    }
  },
};

export default reviewController;
