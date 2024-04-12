import express, { Request, Response } from 'express';
import "reflect-metadata"
import {AppDataSource} from "./db/data-source";

const app = express();
const PORT = process.env.PORT || 3000;

AppDataSource.initialize()
    .then(() => {
        console.log(`Server connect to ${process.env.DB_HOST}`);
    })
    .catch((error) => console.log(error))


app.get('/', (req: Request, res: Response) => {
    res.send('Hello, World!');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});