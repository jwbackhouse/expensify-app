import React from 'react';
import { shallow } from 'enzyme';
import { Header } from '../../components/Header';
import { firebase } from '../../firebase/firebase';

let startLogout, wrapper;
beforeEach(() => {
  startLogout = jest.fn();
  wrapper = shallow(<Header startLogout={startLogout} />);
});

test('Should render Header correctly', () => {
  expect(wrapper).toMatchSnapshot();
});

test('Should call the startLogout action when logout button clicked', () =>{
  wrapper.find('button').simulate('click');
  expect(startLogout).toBeCalled();
  // expect(firebase.auth().currentUser).toEqual(null);
});



// *** CAN AVOID NEEDING TO IMPORT TOJSON BY ADDING "snapshotSerializers": ["enzyme-to-json/serializer"] TO JEST.CONFIG.JSON
// import toJSON from 'enzyme-to-json';
// test('Should render Header correctly', () => {
//   const wrapper = shallow(<Header />);
//   expect(toJSON(wrapper)).toMatchSnapshot;
// })


// *** PREVIOUS APPROACH USING BASIC RENDERER (BETTER TO USE ENZYME AS ABOVE) ***
// import ReactShallowRenderer from 'react-test-renderer/shallow';
// test('Should render Header correctly', () => {
//   const renderer = new ReactShallowRenderer();
//   renderer.render(<Header />);
//   expect(renderer.getRenderOutput()).toMatchSnapshot();
// })