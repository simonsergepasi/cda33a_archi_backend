// Test unitaire: il test les regles metiers
// test e2e (bout a bout) : requet -> controller -> usecase -> response
import { addDays, addHours } from 'date-fns'
import request from 'supertest'
import app from '../../app/app'
import container from '../../app/config/dependency-injection'
import { User } from '../../entities/user.entity'
import { IUserRepository } from '../../interfaces/user-repository.interface'

describe("Usecase: Organize conference", () => {
    const johnDoe = new User({id: "john-doe", email: 'johndoe@gmail.com', password: 'qwerty'})
    let userRepository: IUserRepository

    beforeEach(async () => {
        userRepository = container.resolve('userRepository')
        userRepository.save(johnDoe)
    })

    it("should organize a conference", async () => {
        const response = await request(app)
                            .post("/conferences")
                            .set('Authorization', 'Basic am9obmRvZUBnbWFpbC5jb206cXdlcnR5')
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