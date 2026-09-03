import { Router } from "express";
import { getLeads, createLead } from "./controller.js";

const router = Router();

router.get("/", getLeads);
router.post("/", createLead);

export default router;