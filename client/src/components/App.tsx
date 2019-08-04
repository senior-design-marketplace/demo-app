import React from 'react';
import User from '../model/user/User';
import Student from '../model/user/impl/Student';

type AuthState = {
    isAuthenticated: boolean
}

class App extends React.Component<{}, AuthState> {

    attemptAuth(user: User) {
        this.setState({
            isAuthenticated: user.isAuthenticated
        });
    }

    componentWillMount() {
        const john = new Student("john123", "john123", "john@123");
        john.authenticate();

        this.attemptAuth(john);
    }

    render() {
        if (this.state.isAuthenticated) {
            return <div>User is authed, woohoo!</div>
        }
        return <div>User isn't authed :(</div>
    }
}

export default App;
