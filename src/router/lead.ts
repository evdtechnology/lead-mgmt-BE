import { Router } from "express";
import { getLeads, postLeads } from "../controllers/leadController";

const leadRouter = Router();

leadRouter.get('/', getLeads)
leadRouter.post('/create', postLeads)

export default leadRouter;