import AuthenticationError from "../error/impl/authenticationException";

abstract class User {

    isAuthenticated: boolean = false;
    token: string | undefined = undefined;

    constructor(public readonly username: string, public readonly password: string, public readonly email: string) {
    }

    /**
     * Attempt to authenticate a given user.  If authentication fails, throw an AuthenticationException
     */
    public authenticate(): void {
        this.token = this._authenticate();

        //simulate sometimes-erroneous login via a coin toss
        if ((Math.floor(Math.random() * 2) === 0)) {
            throw new AuthenticationError('Woops!  Something went wrong :(');
        }

        this.isAuthenticated = true;
    }

    protected abstract _authenticate(): string;
}

export default User;