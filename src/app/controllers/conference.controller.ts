import { NextFunction, Request, Response } from "express";
import { User } from "../../entities/user.entity";
import container from "../config/dependency-injection";
import { CreateConferenceDTO } from "../dto/conference.dto";
import { RequestValidator } from "../utils/validate-requests";


export const organizeConference = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {errors, input} = await RequestValidator(CreateConferenceDTO, req.body);
        if(errors) return res.jsonError(errors, 400)

        const id = await container.resolve('organizeConference').execute({
            user: new User({id: "john-doe", email: 'johndoe@gmail.com', password: 'qwerty'}),
            title: input.title,
            seats: input.seats,
            startDate: input.startDate,
            endDate: input.endDate
        });

        return res.jsonSuccess({ id }, 201)
    } catch (error) {
        next(error)
    }
}