import { Server } from '@overnightjs/core';
import { Application } from 'express';
import * as routes from './routes/routes';

class App extends Server {
    
    constructor() {
        super();
        this.makeRoutes();
    }

    private makeRoutes(): void {
        const controllers: any = [];
        controllers.push(new routes.TopSecretController());

        super.addControllers(controllers);
    }

    //FIX: expose protected Application to Claudia
    public getApp(): Application {
        return this.app
    }
}

//FIX: https://github.com/claudiajs/claudia/issues/163
module.exports = new App().getApp();