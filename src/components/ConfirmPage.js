import React from 'react';
import { Link } from 'react-router-dom';
import {firebase} from '../firebase/firebase';
import Header from './Header';


export class ConfirmPage extends React.Component {
  state = {
    email: '',
    error: '',
    showForm: false
  };
  
  componentDidMount = () => {
    this.isValidURL();
  }
  
  onEmailChange = (e) => {
    const email = e.target.value;
    this.setState(() => ({ email }));
  };

  onSubmit = (e) => {
    e.preventDefault();
    this.signIn(this.state.email);
  };
  
  signIn = (email) => {
    firebase.auth().signInWithEmailLink(email, window.location.href)    // auth code parsed from URL
      .then((result) => {
        window.localStorage.removeItem('emailForSignIn');   // Clear email from storage.
        // Can access the new user via result.user
      })
      .catch((err) => {
        const error = 'Sorry, something went wrong.'
        this.setState(() => ({error}))
      });
  };
  
  isValidURL = () => {
    const pageURL = firebase.auth().isSignInWithEmailLink(window.location.href);
    const savedEmail = window.localStorage.getItem('emailForSignIn');
    if (pageURL) {    // Check page URL contains valid auth code
      if (!savedEmail) {    // If local storage doesn't contain an email (e.g. user switched devices)
        const showForm = true;
        this.setState(() => ({showForm}))
      } else {
        this.signIn(savedEmail);
      }
    } else {
      const error = "Sorry, that doesn't look like a valid link."
      this.setState(() => ({error}))
    }
    
  }
  
  onClick = () => {
    this.isValidURL();
  }

  render() {
    let form, error;
    if (this.state.showForm) {
      form = (
        <div>
          <h3>Please confirm your email</h3>
          <form onSubmit = { this.onSubmit }>
            <input
              type='email'
              placeholder='Email address'
              value={this.state.email}
              onChange={this.onEmailChange}
            />
            <button className="button--tertiary-pink">Confirm</button>
          </form>
        </div>
      )
    }
    if (this.state.error) {
      error = (
        <div>
          <p>{ this.state.error }</p>
          <Link className='button' to='/'>Return to login page</Link>
        </div>
      )
    }
    return (
      <div className='box-layout'>
        <div className='box-layout__box'>
          <h1 className='box-layout__title'>Expensify</h1>
          { form }
          { error }
        </div>
      </div>
    )
  }
};

export default ConfirmPage;