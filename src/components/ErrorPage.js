import React from 'react';
import { Link } from 'react-router-dom';


const ErrorPage = () => (
  <div>
    <p>Doh! 404</p>
    <Link to='/'>Go home</Link>
  </div>
);

export default ErrorPage;