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
        contentLabel="Just to check..."
      >
        <h3>Are you sure you want to delete this expense?</h3>
        <button
          className='button--secondary'
          onClick={this.props.onModalConfirm}
        >Yes</button>
        <button
          className='button--secondary'
          onClick={ this.props.onModalCancel }
        >No</button>
      </Modal>
    );
  }
};

export default DeleteModal;