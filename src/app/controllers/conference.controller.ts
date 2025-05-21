import { NextFunction, Request, Response } from "express";
import { FixedIDGenerator } from "../../utils/fixed-id-generator";
import { InMemoryConferenceRepository } from "../../repositories/in-memory-conference.repository";
import { OrganizeConference } from "../../usecases/organize-conference.usecase";

const idGenerator = new FixedIDGenerator();
const conferenceRepository = new InMemoryConferenceRepository();
const usecase = new OrganizeConference(conferenceRepository, idGenerator);

export const organizeConference = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const body = req.body;
        const id = await usecase.execute(body);
        return res.status(201).json({ id });
    } catch (error) {
        next(error)
    }
}