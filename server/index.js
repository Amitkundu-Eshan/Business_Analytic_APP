import  Express  from "express";
import mongoose from "mongoose";
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import morgan from 'morgan';
import bodyParser from "body-parser";


import productRoute from "./routes/productRoute.js";
import enterpriseRoute from "./routes/enterpriseRoute.js";
import customerRoute from "./routes/customerRoute.js";


import connectDB from './config/DB.js';
import { generateToken } from "./utility/GenerateToken.js";


//----configurations----------//

dotenv.config();
const app = Express();
app.use(Express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({policy: "cross-origin"}));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cors());


const PORT = process.env.PORT || 5000;
connectDB();

//------ROUTES--------//

app.use("/api/auth", enterpriseRoute);
app.use("/api/customer",customerRoute);
app.use('/api/product',productRoute);

//generateToken("hedfyt5458875");

app.listen(PORT,()=>{
    console.log(`server is running on port no. ${PORT}`);
})

