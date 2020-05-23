import React from 'react';
import { shallow } from 'enzyme';
import Header from '../../components/Header';


test('Should render Header correctly', () => {
  const wrapper = shallow(<Header />);
  expect(wrapper).toMatchSnapshot();
})



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