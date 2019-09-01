import { Server } from '@overnightjs/core';
import { Application } from 'express';
import * as routes from './routes/routes';

//FIX:  apparently you can also just get this from the local
//config -- probably not needed when this is on lambda
//https://stackoverflow.com/questions/31039948/configuring-region-in-node-js-aws-sdk
import AWS from 'aws-sdk';
AWS.config.update({region: 'us-east-1'});

class App extends Server {
    
    constructor() {
        super();
        this.makeRoutes();
    }

    //kinda reminds me of Spring
    private makeRoutes(): void {
        const controllers: any = []; //need a superclass
        controllers.push(new routes.TopSecretController(new AWS.DynamoDB.DocumentClient()));

        super.addControllers(controllers);
    }

    //FIX: expose protected Application to Claudia
    public getApp(): Application {
        return this.app
    }
}

//FIX: https://github.com/claudiajs/claudia/issues/163
module.exports = new App().getApp();