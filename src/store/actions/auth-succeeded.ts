import { parse } from 'query-string';

const authSucceeded = (currentHash: string) => {
    const hashParams = parse(currentHash);
    if ('access_token' in hashParams && typeof hashParams.access_token === 'string') {
        return { type: '[auth] success', token: hashParams.access_token };
    }
    return { type: '[auth] token parsing failed' };
};
export default authSucceeded;
