import { createClient } from 'contentful';

// var space;
// var accessToken;

export default createClient({
    space: process.env.REACT_APP_API_SPACE,
    accessToken: process.env.REACT_APP_API_TOKEN
});