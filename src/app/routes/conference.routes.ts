import { Router } from "express";
import { organizeConference } from "../controllers/conference.controller";
import { authenticationMiddleware } from "../middlewares/authentication.middleware";

const router = Router();

router.get('/conferences');
router.use(authenticationMiddleware);
router.post("/conferences", organizeConference);

export {router as ConferenceRoute};