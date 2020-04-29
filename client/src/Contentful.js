import { createClient } from 'contentful';
const API_SPACE = 'sq7963teqhv4';
const API_TOKEN = 'erAYLFXAULLB9UIgxSYb1TshACQp-sK-o1rSb3B7OIs';

export default createClient({
    space: API_SPACE,
    accessToken: API_TOKEN
});