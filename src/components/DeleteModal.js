import React from 'react';
import Modal from 'react-modal';
import { connect } from 'react-redux';

// TODO:
export class DeleteModal extends React.Component {
  componentDidMount = () => {
    Modal.setAppElement('body');
  }
  
  render() {
    return (
      <Modal
        isOpen={!!this.props.showModal}
        onRequestClose={this.props.onModalCancel}   // Allows esc / clicking background to close modal
        contentLabel='Just to check...'
        closeTimeoutMS={ 200 }    // Allows us to target the before-close class to apply a transition
        className='modal'
      >
        <h3 className='modal__title'>Are you sure you want to delete this expense?</h3>
        <button
          className='button button--green button--margin-right'
          id='confirm'
          onClick={this.props.onModalConfirm}
        >Yes</button>
        <button
          className='button button--grey'
          onClick={ this.props.onModalCancel }
          id='cancel'
        >No</button>
      </Modal>
    );
  }
};

export default DeleteModal;