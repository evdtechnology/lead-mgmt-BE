import mongoose, { Document, Schema } from "mongoose";
import { LeadStatus } from "../helpers/enum";

// Define the Staff interface
export interface ILeads extends Document {
  name: string;
  email: string;
  status: string;
  createdAt: string;
}

const LeadSchema: Schema = new Schema<ILeads>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      enum: LeadStatus,
      required: false,
    }
  },
  { timestamps: true }
);

const leadModel = mongoose.model<ILeads>("leads", LeadSchema);
export default leadModel;
