import { addDays, addHours } from 'date-fns';
import { Application } from 'express';
import request from 'supertest';
import { E2eUsers } from '../seeds/e2e-users';
import { TestApp } from '../test-app';

describe("Usecase: Organize conference", () => {

    let testApp: TestApp;
    let app: Application

    beforeEach(async () => {
        testApp = new TestApp()
        await testApp.setup()
        app = testApp.expressApp
        await testApp.loadFixtures([E2eUsers.alice])
    })

    it("should organize a conference", async () => {
        const response = await request(app)
                            .post("/conferences")
                            .set('Authorization', E2eUsers.alice.createBasicAuthorization())
                            .send({
                                title: "My first conference",
                                seats: 50,
                                startDate: addDays(new Date(), 4).toISOString(),
                                endDate: addDays(addHours(new Date(), 2), 4).toISOString()
                            })
        
        expect(response.status).toEqual(201);
        expect(response.body.data).toEqual({id: expect.any(String)});
    })
})