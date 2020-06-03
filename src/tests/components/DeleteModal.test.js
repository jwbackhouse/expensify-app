import React from 'react';
import { shallow }  from 'enzyme';
import { DeleteModal } from '../../components/DeleteModal';

let wrapper, onModalConfirm, onModalCancel, showModal;
beforeEach(() => {
  onModalConfirm = jest.fn();
  onModalCancel = jest.fn();
  showModal = jest.fn();
  wrapper = shallow(
    <DeleteModal
      onModalConfirm={ onModalConfirm }
      onModalCancel={ onModalCancel }
    />);
})

test('Should render delete modal', () => {
  expect(wrapper).toMatchSnapshot();
});

test('Should call onModalConfirm and close modal when pressing yes button', () => {
  wrapper.find('button').at(0).simulate('click');
  expect(onModalConfirm).toBeCalled();
  expect(wrapper.prop('isOpen')).toBe(false);
});

test('Should call onModalCancel and close modal when pressing no button', () => {
  wrapper.find('button').at(1).simulate('click');
  expect(onModalCancel).toBeCalled();
  expect(wrapper.prop('isOpen')).toBe(false);
});