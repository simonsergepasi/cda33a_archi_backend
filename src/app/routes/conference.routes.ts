import { Router } from "express";
import { organizeConference } from "../controllers/conference.controller";

const router = Router();

router.post("/conferences", organizeConference);

export {router as ConferenceRoute};