const signUpConfig = {
    header: 'Senior Design Marketplace',
    hideAllDefaults: true,
    defaultCountryCode: '1',
    signUpFields: [
        {
            label: 'Username',
            key: 'username',
            required: true,
            displayOrder: 1,
            type: 'string'
        },
        {
            label: 'Password',
            key: 'password',
            required: true,
            displayOrder: 2,
            type: 'password'
        },
        {
            label: 'Email',
            key: 'email',
            required: true,
            displayOrder: 3,
            type: 'string'
        }
    ]
};

export default signUpConfig;