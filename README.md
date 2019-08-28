# Demo App
This is a proof-of-concept app for the currently proposed architecture of our Senior Design project.  That architecture is a simple CRUD app:

Client -> API -> Database

The proposed implementation of this pattern is:

Client (Static React app hosted on S3) -> API (AWS API Gateway supported by Lambda and Cognito) -> Database (Dynamo)

## Favorite Doggers
This app contains information about a user and their favorite type of dog.  As this is critically important information, it is hidden behind a secure login.

If you'd like to simulate a login, you can throw one of these out:
```bash
curl -X POST -d '{"username": "<USERNAME>", "password": "<PASSWORD>"}' -H "Content-Type: application/json" https://ejdxisi2h9.execute-api.us-east-1.amazonaws.com/dev/login
```

Here's some dummy credentials as well:
```javascript
{
    username: "testUsername",
    password: "testPassword123"
}

{
    username: "otherTestUsername",
    password: "otherTestPassword123"
}
```

You'll need to implement signature version 4 for other endpoints -- thankfully, this is taken care of via the Amplify library.
