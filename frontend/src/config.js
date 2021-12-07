const prod = {
    env: 'production',
    api_host: '/api' // an empty string to signify a relative path. can also put a deployment URL.
};
const dev = {
    env: 'development',
    api_host: 'http://localhost:5000/api', // web server localhost port
};

// export the appropriate environment
export default process.env.NODE_ENV === 'production' ? prod : dev;