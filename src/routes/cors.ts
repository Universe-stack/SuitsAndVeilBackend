import express from 'express';
import cors from 'cors';

const whitelist = ['http://localhost:3000', 'https://localhost:3157', 'http://localhost:4200', 'http://JusticeChinedu:3001'];

const corsOptionsDelegate = (req: express.Request, callback: (error: Error | null, options?: cors.CorsOptions) => void) => {
    const corsOptions: cors.CorsOptions = {
        origin: whitelist.includes(req.header('Origin')) ? true : false,
    };
    callback(null, corsOptions);
};

export const corsMiddleware = cors();
export const corsWithOptionsMiddleware = cors(corsOptionsDelegate);
