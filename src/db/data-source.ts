import dotenv from 'dotenv';
import { DataSource } from 'typeorm';
import { Admin } from '../models/admin';

dotenv.config();
export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true,
  entities: [Admin],
  subscribers: [],
  migrations: [],
});

export async function runDb() {
  try {
    AppDataSource.initialize().then(() => {
      console.log(`Server connect to ${process.env.DB_HOST}`);
    });
  } catch (error) {
    console.error(error);
  }
}
