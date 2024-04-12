import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import AuthRouter from "./routers/auth.js";
import gameRouter from "./routers/game.js";
import AdminRouter from "./routers/admin.js";
import path from 'node:path'
import {fileURLToPath} from 'node:url'
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();

const port = 3001;

app.use(express.static(path.join(__dirname, './public')))
app.use(cors())
app.use(express.json());
app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.use('/auth', AuthRouter);

app.use('/game', gameRouter);

app.use('/admin', AdminRouter);




//connection a mongodb
mongoose.connect('mongodb://mongo/yams', {useNewUrlParser: true, useUnifiedTopology: true, user: 'root', pass: 'foobar'}) //mongodb://root:foobar@mongo/yams
    .then(() => {
        console.log('Connected to MongoDB')
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        })
    })
    .catch(err => console.log(err))