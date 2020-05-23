import moment from 'moment';

export default [{
  description: 'one',
  amount: 100,
  createdAt: 0,
  id: 1
},{
  description: 'two',
  amount: 200,
  createdAt: moment(0).subtract(4,'days').valueOf(),
  id: 2
},{
  description: 'three',
  amount: 10,
  createdAt: moment(0).add(4,'days').valueOf(),
  id: 3
}];