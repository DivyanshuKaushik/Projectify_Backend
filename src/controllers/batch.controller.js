import Batch from "../models/batch.model";
import Faculty from "../models/faculty.model";
import PanelMember from "../models/panel-member.model";
import { Response } from "../utils";

const batchController = {
    async getStudentBatch(req, res) {
        try {
           const {studentId} = req.params;
              const batch = await Batch.findOne({where:{student_id:studentId}});
            return res.json(Response(200,"Success",batch));
        } catch (error) {
            return res.status(500).json(Response(500, "Internal Server Error", error));
        }
    },
    async getBatch(req, res) {
        try {
           const {id} = req.params;
              const batch = await Batch.findOne({where:{batch_id:id}});
              const panelMember = await PanelMember.findOne({where:{id:batch.panel_member_id},include:{model:Faculty,attributes:{exclude:["password","faculty_id"]}}});
            return res.json(Response(200,"Success",{batch,panelMember}));
        } catch (error) {
            return res.status(500).json(Response(500, "Internal Server Error", error));
        }
    },
    async getAllBatches(req, res) {
        try {
            const batches = await Batch.findAll();
            return res.json(Response(200,"Success",batches));
        } catch (error) {
            return res.status(500).json(Response(500, "Internal Server Error", error));
        }
    },
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
    },
    async createBatches(req, res) {
        try {
            const {batches} = req.body;
            if(!batches.length) {
                return res.status(400).json(Response(400,"Empty Batches"));
            }
            await Batch.bulkCreate(batches)
            return res.status(200).json(Response(200,"Batches created successfully"));
            
        } catch (error) {
            return res.status(500).json(Response(500, "Internal Server Error", error));
        }
    },
    
    
}
export default batchController