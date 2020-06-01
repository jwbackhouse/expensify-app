import { firebase, googleAuthProvider, facebookAuthProvider } from '../firebase/firebase';

// NOTE this is called in app.js rather than startLogin so that it runs when app first loads, not just when user explictly logs in/out
export const login = (uid) => ({
  type:'LOGIN',
  uid
});

export const startLogin = () => {
  return () => {    // Returns a function for async actions (can be called with dispatch) - allowed via thunk
    return firebase.auth().signInWithPopup(googleAuthProvider);
    // .then((result) => {
    //   const uid = result.user.uid;
    //   dispatch(login(uid));
    // });
  };
};

export const startFacebookLogin = () => {
  return () => {
    return firebase.auth().signInWithPopup(facebookAuthProvider);
  };
};


// export const startEmailLogin = () => {
//   return () => {
//     return firebase.auth().sendSignInLinkToEmail(email, actionCodeSettings)
//       .then(() => {
//         console.log('sent successfully');
//         // The link was successfully sent. Inform the user.
//         // Save the email locally so you don't need to ask the user for it again
//         // if they open the link on the same device.
//         window.localStorage.setItem('emailForSignIn', email);
//       })
//       .catch((error) => {
//         console.log('Error'); // Some error occurred, you can inspect the code: error.code
//       });
//   };
// };

export const logout = () => ({
    type:'LOGOUT',
});

export const startLogout = () => {
  return () => {
    return firebase.auth().signOut();
  };
};