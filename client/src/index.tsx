import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';

import AWS from './secrets';
import Amplify from 'aws-amplify';
Amplify.configure(AWS);

ReactDOM.render(<App />, document.getElementById('root'));
