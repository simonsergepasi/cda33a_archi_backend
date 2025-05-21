// Test unitaire: il test les regles metiers
// test e2e (bout a bout) : requet -> controller -> usecase -> response
import request from 'supertest'
import app from '../../app/app'
import { addDays, addHours } from 'date-fns'

describe("Usecase: Organize conference", () => {
    it("should organize a conference", async () => {
        const response = await request(app)
                            .post("/conferences")
                            .send({
                                title: "My first conference",
                                seats: 50,
                                startDate: addDays(new Date(), 4).toISOString(),
                                endDate: addDays(addHours(new Date(), 2), 4).toISOString()
                            })

        expect(response.status).toEqual(201);
        expect(response.body).toEqual({id: "1"});
    })
})