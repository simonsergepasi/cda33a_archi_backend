import { ConferenceFixture } from "../fixtures/conference-fixture";
import { UnitConferences } from "./unit-conferences";

export const E2eConferences = {
    conference1 : new ConferenceFixture(UnitConferences.conference1),
    conference2 : new ConferenceFixture(UnitConferences.conference2)
}