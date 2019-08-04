import User from '../User';

class Faculty extends User {

    constructor(username: string, password: string, email: string) {
        super(username, password, email);
    }

    _authenticate(): string {
        console.log("Hitting the faculty user endpoint!");
        return "faculty";
    }
}

export default Faculty;