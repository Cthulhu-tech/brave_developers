import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import 'dotenv/config';

export const config: TypeOrmModuleOptions = {
    type: "postgres",
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    port: parseInt(process.env.PORT),
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    synchronize: true,
    entities: ["dist/**/*.entity{.ts,.js}"],
}