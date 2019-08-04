import Student from '../user/impl/Student';
import Company from '../company/company';

class Project {

    constructor(public readonly name: string,
                public readonly contributors: Student[],
                public readonly sponsor?: Company,
                public readonly description?: string) {}

}

export default Project;