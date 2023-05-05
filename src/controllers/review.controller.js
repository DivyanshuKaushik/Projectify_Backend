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
      const { deadline, batch, phase, fields, type } = req.body;
      const data = await Review.create({
        deadline,
        batch,
        phase,
        fields,
        type,
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
  async updateReview(req, res) {
    try {
      const { deadline, batch, phase, fields } = req.body;
      const data = await Review.update(
        {
          deadline,
          batch,
          phase,
          fields,
        },
        {
          where: {
            id: req.params.id,
          },
        }
      );
      return res.json(Response(200, "Review updated successfully", data));
    } catch (error) {
      return res
        .status(500)
        .json(Response(500, "Internal Server Error", error));
    }
  },
  async toggleReviewEdit(req, res) {
    try {
      const { edit } = req.body;
      // console.log(req.body);
      const data = await Review.update(
        {
          edit,
        },
        {
          where: {
            id: req.params.id,
          },
        }
      );
      console.log(edit, req, req.body);
      return res.json(
        Response(200, "Review updated successfully", { data, edit })
      );
    } catch (error) {
      return res
        .status(500)
        .json(Response(500, "Internal Server Error", error));
    }
  },
};

export default reviewController;
