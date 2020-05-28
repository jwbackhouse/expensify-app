import moment from 'moment';

export default [{
  description: 'one',
  amount: 100,
  createdAt: 0,
  id: '123'
},{
  description: 'two',
  amount: 200,
  createdAt: moment(0).subtract(4,'days').valueOf(),
  id: '456'
},{
  description: 'three',
  amount: 10,
  createdAt: moment(0).add(4,'days').valueOf(),
  id: '789'
}];