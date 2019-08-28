import User from '../user/User';
import Company from '../company/company';

class Project {

    constructor(public readonly name: string,
                public readonly contributors: Set<User>,
                public readonly sponsor?: Company,
                public readonly description?: string) {}

    public addContributor(student: User): void {
        this.contributors.add(student);
    }

    public removeContributor(student: User): void {
        this.contributors.delete(student);
    }
}

export default Project;