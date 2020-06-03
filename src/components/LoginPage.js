import React from 'react';
import { connect } from 'react-redux';
import { startLogin, startFacebookLogin, startEmailLogin } from '../actions/auth';
import { firebase } from '../firebase/firebase';

export class LoginPage extends React.Component {
  state = {
    email: '',
    showForm: false,
    emailSent: false
  };
  
  onEmailChange = (e) => {
    const email = e.target.value;
    this.setState(() => ({ email }));
  };
  
  showForm = () => {
    const showForm = !this.state.showForm;
    this.setState(() => ({ showForm }));
  }
  
  onSubmit = (e) => {
    e.preventDefault();
    const emailSent = true;
    const showForm = false;
    this.setState(() => ({showForm}));
    this.setState(() => ({emailSent}));
    const email = this.state.email;
    this.props.startEmailLogin(email);
  };
  
  render() {
    let form, message;
    if (this.state.showForm) {
      form = (
        <form onSubmit = { this.onSubmit }>
          <input
            type='email'
            placeholder='Email address'
            value={this.state.email}
            onChange={this.onEmailChange}
          />
          <button className='button--tertiary'>Submit</button>
        </form>
      )
    }
    if (this.state.emailSent) {
      message = (
        <p>All done. Please check your email.</p>
      )
    }
    return (
      <div className='box-layout'>
        <div className='box-layout__box'>
          <h1 className='box-layout__title'>Expensify</h1>
          <p>Get your expenses under control</p>
          <button onClick = { this.props.startLogin } className ='button button--pink'>Login with Google</button>
          <button onClick = { this.props.startFacebookLogin } className ='button button--pink button--margin-top'>Login with Facebook</button>
          <button onClick = { this.showForm } className = 'button button--pink button--margin-top'>Login with email</button>
          <div>
            { form }
            { message }
          </div>
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  startLogin: () => dispatch(startLogin()),
  startFacebookLogin: () => dispatch(startFacebookLogin()),
  startEmailLogin: (email) => dispatch(startEmailLogin(email))
});

export default connect(undefined, mapDispatchToProps)(LoginPage);



// export default class LoginPage extends React.Component {
//   onSubmit = (e) => {
//     e.preventDefault();
//     this.props.history.push('/dashboard')   // Redirect on submit (uses in-built method)
//   };
  
//   render () {
//     return (
//       <div>
//         <h1>Login</h1>
//         <form onSubmit = {this.onSubmit}>
//           <label>User name
//             <input
//               type = 'text'
//               placeholder = 'User name'
//               autoFocus
//             />
//           </label>
//           <label>Password
//             <input
//               type = 'text'
//               placeholder = 'Password'
//             />
//           </label>
//           <button>Go</button>
//         </form>
//       </div>
//     )
//   };
// };