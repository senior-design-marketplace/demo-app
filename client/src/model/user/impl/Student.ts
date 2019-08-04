import User from '../User';

class Student extends User {

    constructor(username: string, password: string, email: string) {
        super(username, password, email);
    }

    _authenticate(): string {
        console.log("Hitting the student user endpoint!");
        return "student";
    }
}

export default Student;