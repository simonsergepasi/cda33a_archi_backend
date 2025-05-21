/**
 * recuperer l'authorization
 * extraire le token
 * faire appel au basic authenticator
 * recuperer le user
 * attacher le user dans la Request 
 */

import { NextFunction, Request, Response } from "express";
import { User } from "../../entities/user.entity";
import { extractToken } from "../utils/extract-token";
import container from "../config/dependency-injection";


declare module 'express-serve-static-core' {
    interface Request {
        user?: User
    }
}

export const authenticationMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const authorization = req.headers.authorization;
        if(!authorization) return res.jsonError("Unauthorized", 403)

        const token = extractToken(authorization)
        if(!token) return res.jsonError("Unauthorized", 403)

        const user = await container.resolve('authenticator').authenticate(token)

        if(!user) return res.jsonError("Unauthorized", 403)

        req.user = user
        next()
    } catch (error) {
        next(error)
    }
}