import { StartDocker } from "./docker-manager";

const setup = async () => {
    await StartDocker();
}

export default setup;