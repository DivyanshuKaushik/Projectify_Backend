import Batch from "../models/batch.model";
import { Response } from "../utils";

const batchController = {
    async gradeBatch(req, res) {
        try {
            const {id,status} = req.body;
            const batch = await Batch.findByPk(id);
            if(!batch) {
                return res.status(400).json(Response(400,"Batch not found"));
            }
            batch.status = status;
            await batch.save();
            return res.status(200).json(Response(200,"Batch graded successfully"));
            
        } catch (error) {
            return res.status(500).json(Response(500, "Internal Server Error", error));
        }
    }
}
export default batchController