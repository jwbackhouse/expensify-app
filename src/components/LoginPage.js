import React from 'react';
import { connect } from 'react-redux';
import { startLogin } from '../actions/auth';

export const LoginPage = ({startLogin}) => (    // destructured the dispatch prop (i.e. avoids using props.startLogin below)
  <div className='box-layout'>
    <div className='box-layout__box'>
      <h1 className='box-layout__title'>Expensify</h1>
      <p>Get your expenses under control</p>
      <button onClick = { startLogin } className='button'>Login with Google</button>
    </div>
  </div>
);

const mapDispatchToProps = (dispatch) => ({
  startLogin: () => dispatch(startLogin())
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