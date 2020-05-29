import { firebase, googleAuthProvider } from '../firebase/firebase';

// NOTE this is called in app.js rather than startLogin so that it runs when app first loads, not just when user explictly logs in/out
export const login = (uid) => ({
  type:'LOGIN',
  uid
});

export const startLogin = () => {
  return () => {    // Returns a function for async actions (can be called with dispatch) - allowed via thunk
    return firebase.auth().signInWithPopup(googleAuthProvider)
    // .then((result) => {
    //   const uid = result.user.uid;
    //   dispatch(login(uid));
    // });
  };
};

export const logout = () => ({
    type:'LOGOUT',
});

export const startLogout = () => {
  return () => {
    return firebase.auth().signOut();
  };
};