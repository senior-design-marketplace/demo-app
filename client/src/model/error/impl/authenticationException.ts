class AuthenticationError implements Error {

    public readonly name: string = "AuthenticationError";

    constructor(public readonly message: string) {
    }
}

export default AuthenticationError;