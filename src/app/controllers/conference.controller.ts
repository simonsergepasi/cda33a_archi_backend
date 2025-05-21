import { NextFunction, Request, Response } from "express";
import { User } from "../../entities/user.entity";
import { InMemoryConferenceRepository } from "../../repositories/in-memory-conference.repository";
import { OrganizeConference } from "../../usecases/organize-conference.usecase";
import { UUIDGenerator } from "../../utils/uuid-generator";
import { CreateConferenceDTO } from "../dto/conference.dto";
import { RequestValidator } from "../utils/validate-requests";

const idGenerator = new UUIDGenerator();
const conferenceRepository = new InMemoryConferenceRepository();
const usecase = new OrganizeConference(conferenceRepository, idGenerator);

export const organizeConference = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {errors, input} = await RequestValidator(CreateConferenceDTO, req.body);
        if(errors) return res.status(400).json({errors})

        const id = await usecase.execute({
            user: new User({id: "john-doe"}),
            title: input.title,
            seats: input.seats,
            startDate: input.startDate,
            endDate: input.endDate
        });

        return res.status(201).json({ id });
    } catch (error) {
        next(error)
    }
}