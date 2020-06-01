import * as firebase from 'firebase';

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID
};

firebase.initializeApp(firebaseConfig);
// TODO: link analytics functionality
// firebase.analytics();

const database = firebase.database();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
const facebookAuthProvider = new firebase.auth.FacebookAuthProvider();

export { firebase, googleAuthProvider, facebookAuthProvider, database as default };


// Email auth settings
var actionCodeSettings = {
  // URL you want to redirect back to. The domain (www.example.com) for this
  // URL must be whitelisted in the Firebase Console.
  url: 'https://www.example.com/finishSignUp?cartId=1234',
  // This must be true.
  handleCodeInApp: true,
  // // Define in-app email programmes to use
  // iOS: {
  //   bundleId: 'com.example.ios'
  // },
  // android: {
  //   packageName: 'com.example.android',
  //   installApp: true,
  //   minimumVersion: '12'
  // },
  // dynamicLinkDomain: 'example.page.link'
};

// firebase.auth().sendSignInLinkToEmail(email, actionCodeSettings)
//   .then(function() {
//     // The link was successfully sent. Inform the user.
//     // Save the email locally so you don't need to ask the user for it again
//     // if they open the link on the same device.
//     window.localStorage.setItem('emailForSignIn', email);
//   })
//   .catch(function(error) {
//     // Some error occurred, you can inspect the code: error.code
//   });



// // Setup dummy data for the code below
// database.ref().remove();

// const expenses = [{
//   description: 'Expense One',
//   body: 'This is the body',
//   amount: 500,
//   createdAt: '1234'
// },{
//   description: 'Expense Two',
//   body: 'This is the body',
//   amount: 600,
//   createdAt: '5678'
// },{
//   description: 'Expense Three',
//   body: 'This is the body',
//   amount: 200,
//   createdAt: '9101'
// }];

// NOTE .push is used to store an array, with each item stored under a unique identifier
// database.ref('expenses').push(expenses[0]);
// database.ref('expenses').push(expenses[1]);
// database.ref('expenses').push(expenses[2]);


// database.ref('expenses').on('child_changed', (snapshot) => {
//   console.log(snapshot.key, snapshot.val());
// });

// // NOTE:  How to convert Firebase output into an array, using the key as unique identifier
// database.ref('expenses').on('value', (snapshot) => {
//   const expenses = [];
//   snapshot.forEach((childSnapshot) => {
//     const output = childSnapshot.val();
//     expenses.push({
//       id: childSnapshot.key,
//       ...output
//     })
//   })
//   console.log(expenses);
//   });



// NOTE: How to subscribe to automatic updates (does not return a promise and haven't worked out how to pass data out of the callback function)
// database.ref().on('value', (snapshot) => {
//   const person = snapshot.val();
//   console.log(`${ person.name } is ${ person.age } years old and comes from ${ person.location.country }`);
// })

// NOTE: How to make one-off data pull (returns a promise)
// database.ref('expenses')
//   .once('value')
//   .then((snapshot) => {
//     console.log(snapshot.val())
//   });

// NOTE: How to set data
// database.ref().set({
//   name: 'James Backhouse',
//   age: 38,
//   location: {
//     country: 'UK',
//     county: 'Surrey'
//   }
// }).then(() => {
//   console.log('Data is saved');
// }).catch((e) => {
//   console.log('This failed.', e);
// });

// NOTE: How to set data for specific field
// database.ref('attributes').set({
//   height: 180,
//   weight: 73
// });

// NOTE: How to remove specific field
// database.ref('age').remove().then(() => {
//   console.log('Removed')
// }).catch((e) => {
//   console.log('Error:', e)
// });

// NOTE: How to add / edit / remove using update
// database.ref().update({
//   name:'Florence Backhouse',
//   age: 4,
//   favouriteColour: 'Purple',
//   'attributes/height': 40,    // NOTE: how to get to nested entries
//   'attributes/weight': null   // NOTE: how to delete entries
// })