import * as firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyAMlaXLBe2QL3E52M7B5vAxBmurHpiFZWo",
  authDomain: "expensify-dfa83.firebaseapp.com",
  databaseURL: "https://expensify-dfa83.firebaseio.com",
  projectId: "expensify-dfa83",
  storageBucket: "expensify-dfa83.appspot.com",
  messagingSenderId: "1089954814599",
  appId: "1:1089954814599:web:7b87ed1047c0d315efb622",
  measurementId: "G-HGYB92KNHS"
};

firebase.initializeApp(firebaseConfig);
// TODO: link analytics functionality
// firebase.analytics();

const database = firebase.database();

database.ref().remove();

const expenses = [{
  description: 'Expense One',
  body: 'This is the body',
  amount: 500,
  createdAt: '1234'
},{
  description: 'Expense Two',
  body: 'This is the body',
  amount: 600,
  createdAt: '5678'
},{
  description: 'Expense Three',
  body: 'This is the body',
  amount: 200,
  createdAt: '9101'
}];

// NOTE .push is used to store an array, with each item stored under a unique identifier
database.ref('expenses').push(expenses[0]);
database.ref('expenses').push(expenses[1]);
database.ref('expenses').push(expenses[2]);


database.ref('expenses').on('child_changed', (snapshot) => {
  console.log(snapshot.key, snapshot.val());
});

// NOTE:  How to convert Firebase output into an array, using the key as unique identifier
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