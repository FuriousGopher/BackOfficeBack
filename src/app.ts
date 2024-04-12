import express, { Request, Response } from 'express';
import 'reflect-metadata';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { runDb } from './db/data-source';
import { router } from './router/routes';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cookieParser());

app.use(express.json());

app.use(cors());

app.use(router);

const startApp = async () => {
  await runDb();
  app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`);
  });
};

startApp();
