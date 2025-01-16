import express from "express";
import cookieParser from "cookie-parser";
import cors from 'cors';
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import adminRoute from './routes/admin.route.js';
import postRoute from './routes/user.route.js'
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config();

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended:true}));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.get('/', (req,res)=>{
    return res.status(201).json({
        message: 'Server successfully built',
        success:true
    })
})

const cors = require('cors');
const express = require('express');

app.use(cors({ origin: '*' }));

app.use(cors({
  origin: 'https://luxury-heliotrope-4e7a81.netlify.app',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}));




app.use('/admin', adminRoute)
app.use('/user', postRoute)

const PORT = process.env.PORT || 3001;
app.listen(PORT, ()=>{
    connectDB()
    console.log(`http://localhost:${PORT}`)
})


