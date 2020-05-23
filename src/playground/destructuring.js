console.log('destructuring.js is running');

// Object destructuring
const book = {
  title: 'The Lean Startup',
  author: 'AN Other',
  publisher: {
    name: 'Random House'
  }
}

const { name: Publisher = 'Self published' } = book.publisher; //NB renaming with colon and default value after comma

console.log(`${ Publisher }`)



// Array destructuring
const menu = ['Hot drinks', 'Latte', '£2.20'];

const [, item, small = '£1.99', large = '£2.99'] = menu; //NB default after comma, ignore entries by leaving blank between commas

console.log(`A ${ item } costs ${ small } for a small and ${ large } for a large.`)