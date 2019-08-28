import { Auth, API } from 'aws-amplify';
import { CognitoUser } from "@aws-amplify/auth";

class User {

    constructor(private readonly username: string,
                private readonly password: string) {}

    public authenticate(): Promise<CognitoUser> {
        return Auth.signIn(this.username, this.password);
    }

    public async getFavoriteDog(): Promise<string> {        
        try {
            return await API.get('APIGateway', '/topsecret', undefined);
        } catch (e) {
            console.log(e);
            return Promise.resolve('No dog found');
        }
    }
}

export default User;