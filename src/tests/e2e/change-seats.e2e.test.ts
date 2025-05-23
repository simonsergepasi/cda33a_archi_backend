import { addDays, addHours } from 'date-fns';
import { Application } from 'express';
import request from 'supertest';
import { E2eUsers } from '../seeds/e2e-users';
import { TestApp } from '../test-app';
import { E2eConferences } from '../seeds/e2e-conferences';

describe("Usecase: Change Seats", () => {

    let testApp: TestApp;
    let app: Application

    beforeEach(async () => {
        testApp = new TestApp()
        await testApp.setup()
        app = testApp.expressApp
        await testApp.loadFixtures([
            E2eUsers.john, 
            E2eConferences.conference1
        ])
    })

    afterAll(async() => {
        await testApp.teardown()
    })

    it("should change the number of seats", async () => {
        const conferenceId = E2eConferences.conference1.entity.props.id

        const response = await request(app)
                            .put(`/conferences/${conferenceId}/seats`)
                            .set('Authorization', E2eUsers.john.createJwtAuthorization())
                            .send({seats: 80})
        
        expect(response.status).toEqual(200);
        
        const conferenceRepository = testApp.containerDI.resolve('conferenceRepository');
        const updatedConference = await conferenceRepository.findById(conferenceId);

        expect(updatedConference).toBeDefined();
        expect(updatedConference?.props.seats).toEqual(80);

    })
})