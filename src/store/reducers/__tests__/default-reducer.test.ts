import defaultReducer from '..';

describe('defaultReducer', () => {
  it('should produce the next state with token when action is auth success', async () => {
    // tslint:disable-next-line:max-line-length
    const state = defaultReducer(
      {},
      {
        type: '[auth] success',
        token: 'a97905f6feb373902d3a2c52393c6daed9d682070cb4a86cf604660a2024f011',
      },
    );
    expect(state).toEqual({
      token: 'a97905f6feb373902d3a2c52393c6daed9d682070cb4a86cf604660a2024f011',
    });
  });

  it('should produce the same state when action type is not handled', async () => {
    const initialState = {};
    const nextState = defaultReducer(initialState, { type: 'type' });
    expect(nextState).toEqual(initialState);
  });
});
