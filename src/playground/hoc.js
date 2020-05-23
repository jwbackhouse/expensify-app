// Higher order components (HOC)

import React from 'react';
import ReactDOM from 'react-dom';

const Info = (props) => (
  <div>
    <h1>Info</h1>
    <p>Lorem ipsum for { props.message }</p>
  </div>
)

const requireAuthentication = (WrappedComponent) => {
  return (props) => (
    <div>
      { !props.isAuthenticated ? (
        <p>Please log in</p>
      ) : (
       <WrappedComponent { ...props }/>
      )}
    </div>
  )
}

const AdminInfo = requireAuthentication(Info)


ReactDOM.render(<AdminInfo isAuthenticated={ false } message='some new component' />,document.getElementById('body'));
