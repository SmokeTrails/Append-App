const prod = {
    env: 'production',
    api_host: '' // an empty string to signify a relative path. can also put a deployment URL.
};
const dev = {
    env: 'development',
    api_host: 'http://localhost:5000', // web server localhost port
    use_frontend_test_user: false,
    user: "user"
};

// export the appropriate environment
export default process.env.NODE_ENV === 'production' ? prod : dev;