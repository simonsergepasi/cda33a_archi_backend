import dotenv from 'dotenv';
dotenv.config();

const getEnv = (name: string): string => {
    const value = process.env[name]
    if(!value) throw new Error(`Missing env variable: ${name}`);
    return value
}

export const config = {
    port: getEnv("PORT"),
    dbUrl: getEnv("DB_URL"),
    secretKey: getEnv("SECRET_KEY")
}
