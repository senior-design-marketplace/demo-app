import React from 'react';
import User from '../model/user/User';
import { withAuthenticator } from 'aws-amplify-react';
import signUpConfig from './signUpConfig';

type State = {
    searching: boolean,
    favoriteDog: string | undefined
}

class App extends React.Component<{}, State> {

    //init state
    state = {
        searching: true,
        favoriteDog: undefined
    }

    async componentWillMount() {
        const user = new User("testUsername", "testPassword123");
        user.authenticate();
        
        const dogger = await user.getFavoriteDog();
        this.setState({
            searching: false,
            favoriteDog: dogger
        })
    }

    render() {
        if (this.state.searching) {
            return <div>Searching for favorite dog...</div>
        } else {
            return <div>Favorite dog is { this.state.favoriteDog }</div>
        }
    }
}

//we should customize this further so that non-authenticated users can see it too
export default withAuthenticator(App, { signUpConfig });
