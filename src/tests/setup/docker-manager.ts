import path from 'path';
import { DockerComposeEnvironment, StartedDockerComposeEnvironment } from "testcontainers";

let instance: StartedDockerComposeEnvironment | null = null;

export const StartDocker = async () => {
    const composeFilePath = path.resolve(__dirname);
    const composeFile = 'docker-compose.yml';

    instance = await new DockerComposeEnvironment(composeFilePath, composeFile).up();
    console.log('✅ Docker is running');
}

export const StopDocker = async () => {
    if(!instance) return;

    try {
        await instance.down();
        instance = null;
    } catch (error) {
        console.log('❌ Error when stopping docker', error);
    }
}

export const getDockerInstance = () => {
    if(!instance) throw new Error("No instance is running");
    return instance;
}