import express, { Application } from "express";

export class TestApp {
    private app : Application

    constructor() {
        this.app = express();
    }

    async setup() {
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended: true}));
    }

    get expressApp() {
        return this.app
    }
}