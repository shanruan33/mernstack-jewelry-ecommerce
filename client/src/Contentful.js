import { createClient } from 'contentful';
// import config from './config';

export default createClient({
    space: config.REACT_APP_API_SPACE,
    accessToken: config.REACT_APP_API_TOKEN
});