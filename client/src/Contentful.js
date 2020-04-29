import { createClient } from 'contentful';
// import config from './config';

// var space;
// var accessToken;
// if (config) {
//     space = config.REACT_APP_API_SPACE;
//     accessToken = config.REACT_APP_API_TOKEN;
// } else {
//     space = process.env.REACT_APP_API_SPACE;
//     accessToken = process.env.REACT_APP_API_TOKEN;
// }

export default createClient({
    space: process.env.REACT_APP_API_SPACE,
    accessToken: process.env.REACT_APP_API_TOKEN
});