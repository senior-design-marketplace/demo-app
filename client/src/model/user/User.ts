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
        this.isAuthenticated = true;
    }

    protected abstract _authenticate(): string;
}

export default User;