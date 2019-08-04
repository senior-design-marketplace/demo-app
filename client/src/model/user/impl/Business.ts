import User from '../User';

class Business extends User {

    constructor(username: string, password: string, email: string) {
        super(username, password, email);
    }

    _authenticate(): string {
        console.log("Hitting the business user endpoint")
        return "business";
    }
}

export default Business;