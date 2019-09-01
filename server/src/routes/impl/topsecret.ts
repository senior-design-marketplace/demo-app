import { Request, Response } from 'express';
import { Controller, Middleware, Get, Post, Put, Delete, ClassMiddleware } from '@overnightjs/core';
import { Logger } from '@overnightjs/logger';
import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import { identityTranslation } from '../middlewares';
import cors from 'cors';
import util from 'util';

@ClassMiddleware([cors(), identityTranslation])
@Controller('topsecret')
export default class TopSecretController {

    constructor(private readonly documentClient: DocumentClient) {}

    @Get()
    public async getFavoriteDog(req: Request, res: Response) {
        if (!req.headers.cognitoIdentityId) {
            return res.status(400);
        }

        try {
            const dog = await this.documentClient.get({
                TableName: 'senior-design-marketplace-demo',
                Key: {
                    username: req.headers.cognitoIdentityId
                }
            }).promise()

            return res.status(200).json(dog);
        } catch (e) {
            return res.status(500);
        }
    }
}