import TopSecretController from '../../../src/routes/impl/topsecret';
import { DocumentClient, GetItemOutput } from 'aws-sdk/clients/dynamodb';
import { Mock, It, IMock, Times, MockBehavior } from 'typemoq';
import { AWSError } from 'aws-sdk/lib/error';
import { Request as AWSRequest, PromiseResult } from 'aws-sdk/lib/request';
import { Request as ExpressRequest, Response as ExpressResponse } from 'express';
import { IncomingHttpHeaders } from 'http';

//list out mocks
const headers: IMock<IncomingHttpHeaders> = Mock.ofType<IncomingHttpHeaders>();
const expressRequest: IMock<ExpressRequest> = Mock.ofType<ExpressRequest>();
const expressResponse: IMock<ExpressResponse> = Mock.ofType<ExpressResponse>();
const awsRequest: IMock<AWSRequest<GetItemOutput, AWSError>> = Mock.ofType<AWSRequest<GetItemOutput, AWSError>>();
const documentClient: IMock<DocumentClient> = Mock.ofType(DocumentClient, MockBehavior.Loose);

//anything which you do not modify or verify across tests
//set it up here and forget about it
beforeAll(() => {
    expressRequest.setup(mock => mock.headers).returns(() => headers.object);    
});

//anything which you modify or verify across tests, but has the same setup across tests
//setup here and reset in afterEach()
beforeEach(() => {
    documentClient.setup(mock => mock.get(It.isAny())).returns(() => awsRequest.object);
    expressResponse.setup(mock => mock.status(It.isAnyNumber())).returns(() => expressResponse.object);
});

//anything which you modify or verify across tests, and has different setup across tests
//reset here and setup in your test
afterEach(() => {
    headers.reset();
    documentClient.reset();
    expressResponse.reset();
});

//system under test
const controller: TopSecretController = new TopSecretController(documentClient.object);

/**
 * WHEN:    a valid gateway event is provided to the route
 * THEN:    the document client is called with the parsed identity from that event and a 200 is returned
 */
test('Document client is called with correct cognito identity', async () => {
    const promise: PromiseResult<GetItemOutput, AWSError> = {
        Item: {
            test: 'test'
        },
        $response: null
    } as PromiseResult<GetItemOutput, AWSError>

    headers.setup(mock => mock.cognitoIdentityId).returns(() => 'test')
    awsRequest.setup(mock => mock.promise()).returns(() => Promise.resolve(promise))

    await controller.getFavoriteDog(expressRequest.object, expressResponse.object);

    documentClient.verify(mock => mock.get(It.isObjectWith<any>({
        Key: {
            username: 'test'
        }
    })), Times.once());

    expressResponse.verify(mock => mock.status(It.isValue(200)), Times.once());
    expressResponse.verify(mock => mock.json(It.isObjectWith<any>({
        Item: {
            test: 'test'
        }
    })), Times.once())
});

/**
 * WHEN:    an invalid gateway event is provided to the route
 * THEN:    the client is not called and the route returns a 400
 */
test('Absent cognito identity', async () => {
    headers.setup(mock => mock.cognitoIdentityId).returns(() => '')

    await controller.getFavoriteDog(expressRequest.object, expressResponse.object);

    documentClient.verify(mock => mock.get(It.isAny()), Times.never());
    expressResponse.verify(mock => mock.sendStatus(It.isValue(400)), Times.once());
});