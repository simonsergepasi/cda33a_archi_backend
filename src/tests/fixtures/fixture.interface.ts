import { Container } from "../../types/container.type";

export interface IFixture {
    load(container: Container): Promise<void>
}