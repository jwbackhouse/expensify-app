const moment = jest.requireActual('moment')    // Imports actual moment library, not this mock one

export default (timestamp = 0) => {   // Default of 0 means always get same result when calling moment()
  return moment(timestamp)
}