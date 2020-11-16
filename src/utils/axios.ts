import axios from 'axios';

//console.log(asteroidConfig);

declare var __config__: {
    "axios": {
        "baseURL": string,
        "timeout": number
    }
};

let instance = axios.create(__config__.axios || {});

export default instance;
