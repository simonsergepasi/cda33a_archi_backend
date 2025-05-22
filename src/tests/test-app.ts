import express, { Application } from "express";
import { jsonReponseMiddleware } from "../app/middlewares/json-response.middleware";
import { ConferenceRoute } from "../app/routes/conference.routes";
import { errorHandlerMiddleware } from "../app/middlewares/error-handler.middleware";
import { IFixture } from "./fixtures/fixture.interface";
import { Container } from "../types/container.type";
import container from "../app/config/dependency-injection";

export class TestApp {
    private app : Application
    private container : Container

    constructor() {
        this.app = express();
        this.container = container
    }

    async setup() {
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended: true}));
        this.app.use(jsonReponseMiddleware);
        this.app.use(ConferenceRoute);
        this.app.use(errorHandlerMiddleware);
    }

    async loadFixtures(fixtures: IFixture[]) {
        return Promise.all(fixtures.map(fixture => fixture.load(container)))
    }

    get expressApp() {
        return this.app
    }
}