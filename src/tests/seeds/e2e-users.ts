import { User } from "../../entities/user.entity";
import { UserFixture } from "../fixtures/user-fixture";

export const E2eUsers = {
    john: new UserFixture(
        new User({
            id: 'john-doe', 
            email: 'johndoe@gmail.com',
            password: 'qwerty'
        })
    ),
    alice: new UserFixture(
        new User({
            id: 'alice', 
            email: 'alice@gmail.com',
            password: 'qwerty'
        })
    ),
    bob: new UserFixture(
        new User({
            id: 'bob', 
            email: 'bob@gmail.com',
            password: 'qwerty'
        })
    ),
}