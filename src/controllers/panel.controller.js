import { Response } from "../utils";
import Panel from "../models/panel.model";
import PanelMember from "../models/panel-member.model";
import Faculty from "../models/faculty.model";

const panelController = {
    async getPanels(req, res) {
        try {
            const data = await Panel.findAll({
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
            return res.json(Response(200, "Success", data));
        } catch (error) {
            return res
                .status(500)
                .json(Response(500, "Internal Server Error", error));
        }
    },
    async getPanelById(req, res) {
        try {
            const data = await Panel.findOne({
                where: { panel_id: req.params.id },
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
            return res.json(Response(200, "Success", data));
        } catch (error) {
            return res
                .status(500)
                .json(Response(500, "Internal Server Error", error));
        }
    },
    async getPanelByFaculty(req, res) {
        try {
            const data = await PanelMember.findOne({
                where: { faculty_id: req.params.id },
                include: [
                    {
                        model: Faculty,
                        attributes: { exclude: ["password", "faculty_id"] },
                    },
                ],
            });
            return res.json(Response(200, "Success", data));
        } catch (error) {
            return res
                .status(500)
                .json(Response(500, "Internal Server Error", error));
        }
    },
};
export default panelController;
