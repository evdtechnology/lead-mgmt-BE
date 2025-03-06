import { Router } from "express";
// import leadRouter from "./lead.router";
import { getLeads } from "../controllers/leadController";
import leadRouter from "./lead";

const router = Router();

router.use('/leads', leadRouter)

export default router;