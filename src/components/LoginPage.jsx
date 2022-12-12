import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import user from './images/icons8-name-48.png';
import lock from './images/icons8-lock-48.png';
import Swal from 'sweetalert2';
import axios from 'axios';

export default function LoginPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = React.useState({
    email: '',
    password: '',
    status: false,
  });

  const OneHandler = (event) => {
    const { checked, id, name, type, value } = event.target;

    setFormData((prevData) => {
      return {
        ...prevData,
        [name]: value,
      };
    });
  };

  // Sumbit With Field Validations
  async function handleSubmit(event) {
    event.preventDefault();

    // Empty Field Check Email , Password 
    if (formData.email === '') {
      Swal.fire({
        title: 'Error!',
        text: 'Email / Username Cant be Empty!',
        icon: 'warning',
        confirmButtonText: 'OK',
      });
      return false;
    } else if (formData.password === '') {
      Swal.fire({
        title: 'Error!',
        text: 'Password Cant be Empty!',
        icon: 'warning',
        confirmButtonText: 'OK',
      });
      return false;
    } else {
      // URL
      const url = 'https://lobster-app-ddwng.ondigitalocean.app/user/login';

      // Payload
      const data = {
        login_id: formData.email,
        password: formData.password,
      };

      // If we want  'API_KEY' to keep Private , we can put into .env File

      // Setting Headers + API_KEY
      const config = {
        headers: {
          'Content-Type': 'application/json',
          api_key: 'Z9Q7WKEY7ORGBUFGN3EG1QS5Y7FG8DU29GHKKSZH',
        },
      };

      // API POST CALL
      await axios
        .post(url, data, config)
        .then((res) => {
          if (res.data.status === true) {
            Swal.fire({
              title: 'Welcome',
              icon: 'success',
            });
            navigate('/dashboard', { state: res.data });
          } else {
            Swal.fire({
              title: 'Error!',
              text: res.data.message.alert_message,
              icon: 'warning',
              confirmButtonText: 'OK',
            });
          }
        })
        .catch((err) => {
          console.log('error ', err);
        });
    }
  }

  return (
    <div className='form-container' id='full-size'>
      <div className='login-header'>
        <h1 className='login-title'>Login</h1>
        <h3>Enter Your Account Login Details.</h3>
      </div>

      <form className='form' onSubmit={handleSubmit} noValidate>
        <div className='input-container'>
          <img src={user} className='input-image' />
          <input
            type='email'
            placeholder='User name or Email'
            className='form--input'
            name='email'
            value={formData.email}
            onChange={OneHandler}
          />
        </div>
        <div className='input-container'>
          <img src={lock} className='input-image' />
          <input
            type='password'
            placeholder='Password'
            className='form--input'
            name='password'
            value={formData.password}
            onChange={OneHandler}
          />
        </div>
        <button className='form--submit'>Sign in</button>

        <div className='form-link-holder'>
          Don't you have an account?
          <Link to='/register'>
            <button type='button' className='btn-sign-up'>
              Sign up
            </button>
          </Link>
        </div>
      </form>
    </div>
  );
}
