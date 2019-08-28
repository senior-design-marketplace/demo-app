import { Request, Response } from 'express';
import { Controller, Middleware, Get, Post, Put, Delete, ClassMiddleware } from '@overnightjs/core';
import { Logger } from '@overnightjs/logger';
import cors from 'cors';

//entire API will need CORS, we might want to put this
//middleware on a top level conroller and extend from it
@ClassMiddleware(cors())
@Controller('topsecret')
export default class TopSecretController {

    @Get()
    private getFavoriteDog(req: Request, res: Response) {
        Logger.Info(req);

        //make a call over to Dynamo in the real deal
        return res.status(200).json({
            message: 'Get was called!'
        });
    }
}