import express from 'express';
import cors from "cors";

export default (app) => {
    app.use(express.urlencoded({extended: true}));
    app.use(express.json());
    app.use(cors({
        "origin": "http://localhost:3000",
        "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
        "credentials": true
    }));
};