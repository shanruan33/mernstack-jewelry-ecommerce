import { createClient } from 'contentful';

const REACT_APP_API_SPACE='sq7963teqhv4';
const REACT_APP_API_TOKEN='erAYLFXAULLB9UIgxSYb1TshACQp-sK-o1rSb3B7OIs';

export default createClient({
    // space: process.env.REACT_APP_API_SPACE,
    // accessToken: process.env.REACT_APP_API_TOKEN
    space: REACT_APP_API_SPACE,
    accessToken: REACT_APP_API_TOKEN
});