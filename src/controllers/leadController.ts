import { Request, Response } from "express";
import leadModel from "../model/leads";
import { LeadStatus } from "../helpers/enum";
import {SUCCESS_MESSAGE} from "../helpers/message";

const {DATA_CREATED} = SUCCESS_MESSAGE

// TODO - Fetch leads from the database
export async function getLeads(request: Request, response: Response) {
    try {

        // Sort leads by createdAt in descending order
        const leads = await leadModel.find({}).sort({createdAt: -1});
        
        // Send fetched leads
        response.json(leads);
        return;
    } catch (error) {
        console.error("Error fetching leads:", error);
        response.status(500).json({ message: "Internal server error" });
        return;
    }
}

// TODO - Add a new lead to the database
export async function postLeads(request: Request, response: Response) {
    try {
        const { name, email, status } = request.body;

        // Check if name is not presend in request body
        if (!name) {
            response.status(400).json({ message: "Name is required" });
            return;
        }
        // Check if email is not present in request body
        if (!email) {
            response.status(400).json({ message: "Email is required" });
            return;
        }
        // Check if status is not present in request body or is not a valid LeadStatus
        if (status && !Object.values(LeadStatus).includes(status)) {
            response.status(400).json({ 
                message: `Invalid status. Allowed values: ${Object.values(LeadStatus).join(", ")}` 
            });
            return;
        }

        // Check if email already exists in the database (to prevent duplicates)
        const existingEmail = await leadModel.findOne({ email: email });

        if(existingEmail) {
            response.status(400).json({ message: "Email already exists" });
            return;
        }

        // Create a new lead and save it to the database
        const newLead = new leadModel({ name, email, status });
        await newLead.save();

        response.status(201).json(DATA_CREATED);
        return;
    } catch (error) {
        console.error("Error adding lead:", error);
        response.status(500).json({ message: "Internal server error" });
        return;
    }
}
