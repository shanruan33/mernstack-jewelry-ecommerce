import { createClient } from 'contentful';
// import config from './config';

const space;
const accessToken;
if (config) {
    space = config.REACT_APP_API_SPACE;
    accessToken = config.REACT_APP_API_TOKEN;
} else {
    space = REACT_APP_API_SPACE;
    accessToken = REACT_APP_API_TOKEN;
}

export default createClient({
    space: space,
    accessToken: accessToken
});