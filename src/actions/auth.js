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
    return firebase.auth().signInWithPopup(facebookAuthProvider).catch((error) => {
      if (error.code === 'auth/account-exists-with-different-credential') {
        // Step 2.
        // User's email already exists.
        // The pending Facebook credential.
        var pendingCred = error.credential;
        // The provider account's email address.
        var email = error.email;
        // Get sign-in methods for this email.
        auth.fetchSignInMethodsForEmail(email).then(function(methods) {
          // Step 3.
          // If the user has several sign-in methods,
          // the first method in the list will be the "recommended" method to use.
          if (methods[0] === 'password') {
            // Asks the user their password.
            // In real scenario, you should handle this asynchronously.
            var password = promptUserForPassword(); // TODO: implement promptUserForPassword.
            auth.signInWithEmailAndPassword(email, password).then(function(user) {
              // Step 4a.
              return user.linkWithCredential(pendingCred);
            }).then(function() {
              // Facebook account successfully linked to the existing Firebase user.
              goToApp();
            });
            return;
          }
          // All the other cases are external providers.
          // Construct provider object for that provider.
          // TODO: implement getProviderForProviderId.
          var provider = getProviderForProviderId(methods[0]);
          console.log('You already have an account')
          // At this point, you should let the user know that they already has an account
          // but with a different provider, and let them validate the fact they want to
          // sign in with this provider.
          // Sign in to provider. Note: browsers usually block popup triggered asynchronously,
          // so in real scenario you should ask the user to click on a "continue" button
          // that will trigger the signInWithPopup.
          auth.signInWithPopup(provider).then(function(result) {
            // Remember that the user may have signed in with an account that has a different email
            // address than the first one. This can happen as Firebase doesn't control the provider's
            // sign in flow and the user is free to login using whichever account they own.
            // Step 4b.
            // Link to Facebook credential.
            // As we have access to the pending credential, we can directly call the link method.
            result.user.linkAndRetrieveDataWithCredential(pendingCred);
          });
        });
      }
    });
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