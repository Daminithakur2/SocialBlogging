import express from "express";
import authRouter from "./routes/auth.js";
import mongoose from "mongoose";
import dotenv from "dotenv";
import postRouter from "./routes/post.js";
import cors from 'cors'
import bodyParser from "body-parser";
import{fileURLToPath} from "url"
import { dirname,join } from "path";
const app = express()
dotenv.config();
const port=process.env.PORT;
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())
app.use('/auth', authRouter)
app.use('/',postRouter)
const __filename=fileURLToPath(import.meta.url)
const __dirname=dirname(__filename)
app.use("/upload",express.static(join(__dirname,"upload")))
const connection= process.env.CONNECTION_STRING;

mongoose.connect(connection,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("database is connected");
    })
    .catch((error) => {
        console.log("datdase is not connected", error);
    });
    
app.listen(port, () => {
    console.log(`server is running on http://localhost:${port}`);
})