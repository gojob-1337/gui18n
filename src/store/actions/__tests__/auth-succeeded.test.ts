import authSucceeded from '../auth-succeeded';

describe('AuthSucceeded', () => {

    it('should return an action with current token when current hash contains token',  () => {
        expect(authSucceeded('access_token=12345')).toEqual({type: '[auth] success', token: '12345'});
    });

    it('should return an action with current token when current hash contains token and other information',  () => {
        expect(authSucceeded('fake=jest&access_token=12345&other_data=data'))
        .toEqual({type: '[auth] success', token: '12345'});
    });

    it('should return a failed action when current hash does not contain access token',  () => {
        expect(authSucceeded('fake=jest&other_data=data'))
        .toEqual({type: '[auth] token parsing failed'});
    });

});
