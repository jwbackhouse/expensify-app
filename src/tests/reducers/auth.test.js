import authReducer from '../../reducers/auth';

test('Should set user id on login.', () => {
  const uid = 1234;
  const action = {
    type:'LOGIN',
    uid
  }
  const state = authReducer(undefined, action);
  expect(state).toEqual({
    uid
  });
});

test('Should remove user id on logout.', () => {
  const prevState = {
    uid: 4567
  };
  const uid = 1234;
  const action = {
    type:'LOGOUT',
  }
  const state = authReducer(prevState, action);
  expect(state).toEqual({});
});