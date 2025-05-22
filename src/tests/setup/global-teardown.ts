import { StopDocker } from "./docker-manager";

const teardown = async () => {
    await StopDocker();
}

export default teardown;