import express, { Application } from "express";
import { jsonReponseMiddleware } from "../app/middlewares/json-response.middleware";
import { ConferenceRoute } from "../app/routes/conference.routes";
import { errorHandlerMiddleware } from "../app/middlewares/error-handler.middleware";
import { IFixture } from "./fixtures/fixture.interface";
import { Container } from "../types/container.type";
import container from "../app/config/dependency-injection";
import mongoose from "mongoose";

export class TestApp {
    private app : Application
    private container : Container

    constructor() {
        this.app = express();
        this.container = container
    }

    async setup() {
        await mongoose.connect('mongodb://admin:qwerty@localhost:3702/conferences?authSource=admin');
        await mongoose.connection.db?.collection('users').deleteMany({});

        this.app.use(express.json());
        this.app.use(express.urlencoded({extended: true}));
        this.app.use(jsonReponseMiddleware);
        this.app.use(ConferenceRoute);
        this.app.use(errorHandlerMiddleware);
    }

    async teardown() {
        await mongoose.connection.close();
    }

    async loadFixtures(fixtures: IFixture[]) {
        return Promise.all(fixtures.map(fixture => fixture.load(container)))
    }

    get expressApp() {
        return this.app
    }
}