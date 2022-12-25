import { Response } from "../utils";
import Panel from "../models/panel.model";
import PanelMember from "../models/panel-member.model";
import Faculty from "../models/faculty.model";

const panelController = {
    async getPanel(req, res) {
        try {
            const { panelId, facultyId } = req.query;
            let data = null;
            // get panel by panelId
            if (panelId) {
                data = await Panel.findOne({
                    where: { panel_id: panelId },
                    include: [
                        Faculty,
                        {
                            model: PanelMember,
                            include: [
                                {
                                    model: Faculty,
                                    attributes: {
                                        exclude: ["password", "faculty_id"],
                                    },
                                },
                            ],
                        },
                    ],
                });
            } else if(facultyId) {
                data = await PanelMember.findOne({
                    where: { faculty_id: facultyId },
                    include: [
                        {
                            model: Faculty,
                            attributes: { exclude: ["password", "faculty_id"] },
                        }
                    ],
                });
            }else{
                data = await Panel.findAll({
                    include: [
                        Faculty,
                        {
                            model: PanelMember,
                            include: [
                                {
                                    model: Faculty,
                                    attributes: {
                                        exclude: ["password", "faculty_id"],
                                    },
                                },
                            ],
                        },
                    ],
                });
            }
            return res.json(Response(200, "Success", data));
        } catch (error) {
            return res
                .status(500)
                .json(Response(500, "Internal Server Error", error));
        }
    },
};
export default panelController;
