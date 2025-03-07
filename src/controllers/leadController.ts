import { Request, Response } from "express";
import leadModel from "../model/leads";
import { LeadStatus } from "../helpers/enum";
import {SUCCESS_MESSAGE} from "../helpers/message";

const {DATA_CREATED} = SUCCESS_MESSAGE

export async function getLeads(request: Request, response: Response) {
    try {
        // TODO - Fetch leads from the database
        const leads = await leadModel.find({}).sort({createdAt: -1})
        response.json(leads); // Send fetched leads instead of an empty array
    } catch (error) {
        console.error("Error fetching leads:", error);
        response.status(500).json({ message: "Internal server error" });
    }
}

export async function postLeads(request: Request, response: Response) {
    try {
        const { name, email, status } = request.body;

        if (!name) {
            response.status(400).json({ message: "Name is required" });
        }
        if (!email) {
            response.status(400).json({ message: "Email is required" });
        }
        if (!Object.values(LeadStatus).includes(status)) {
            response.status(400).json({ 
                message: `Invalid status. Allowed values: ${Object.values(LeadStatus).join(", ")}` 
            });
        }

        const newLead = new leadModel({ name, email, status });
        await newLead.save();

        response.status(201).json(DATA_CREATED);
    } catch (error) {
        console.error("Error adding lead:", error);
        response.status(500).json({ message: "Internal server error" });
    }
}
