import TopSecretController from '../../../src/routes/impl/topsecret';
import { DocumentClient, GetItemOutput } from 'aws-sdk/clients/dynamodb';
import { AWSError } from 'aws-sdk/lib/error';
import { PromiseResult, Request as AWSRequest } from 'aws-sdk/lib/request';
import { Request } from 'express';
import { mockReq, mockRes } from 'sinon-express-mock';
import { mock, SinonMock, match, assert, stub } from 'sinon';

const documentClient = new DocumentClient();
const documentClientMock: SinonMock = mock(documentClient);
const controller: TopSecretController = new TopSecretController(documentClient);

/**
 * WHEN:    a valid gateway event is provided to the route
 * THEN:    the document client is called with the parsed identity from that event and a 200 is returned
 */
test('Document client is called with correct cognito identity', async () => {
    const request: Request = {
        headers: {
            cognitoIdentityId: 'test'
        }
    } as any

    const awsRequest: AWSRequest<GetItemOutput, AWSError> = {
        promise: () => {}
    } as any

    const expected: PromiseResult<GetItemOutput, AWSError> = {
        Item: {
            test: 'test'
        }
    } as any

    stub(awsRequest, 'promise').resolves(expected);

    documentClientMock.expects('get').withArgs({
        TableName: match.string,
        Key: {
            username: 'test'
        }
    }).once().returns(awsRequest);

    const req = mockReq(request);
    const res = mockRes();

    await controller.getFavoriteDog(req, res);
    
    assert.calledOnce(res.status);
    assert.calledWith(res.status, 200);

    documentClientMock.verify();
});

/**
 * WHEN:    an invalid gateway event is provided to the route
 * THEN:    the client is not called and the route returns a 400
 */
test('Absent cognito identity', async () => {
    const request: Request = {
        headers: {
            cognitoIdentityId: ''
        }
    } as any

    const req = mockReq(request);
    const res = mockRes();

    documentClientMock.expects('get').never();

    await controller.getFavoriteDog(req, res);

    documentClientMock.verify();

    assert.calledOnce(res.sendStatus);
    assert.calledWith(res.sendStatus, 400);
});
