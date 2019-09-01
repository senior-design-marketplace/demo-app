import { Request, Response } from 'express';

//extract the api gateway event header and pull it onto the request
export const identityTranslation: any = (req: Request, res: Response, next: any) => {
    try {
        const event: string = req.headers['x-apigateway-event'] as string;
        const decoded: any = JSON.parse(decodeURIComponent(event));
        req.headers.cognitoIdentityId = decoded.requestContext.identity.cognitoIdentityId;
        next();
    } catch (e) {
        return res.status(400);
    }
}