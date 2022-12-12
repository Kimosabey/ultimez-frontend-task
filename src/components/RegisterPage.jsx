import React from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function RegisterPage() {
  const fullnameRef = React.useRef(null);
  const usernameRef = React.useRef(null);
  const referral_idRef = React.useRef(null);
  const country_row_idRef = React.useRef(null);
  const email_idRef = React.useRef(null);
  const mobile_numberRef = React.useRef(null);
  const passwordnumberRef = React.useRef(null);

  const navigate = useNavigate();

  const [formData, setFormData] = React.useState({
    fullname: '',
    username: '',
    referral_id: '',
    country_row_id: '0',
    mobile_number: '',
    email_id: '',
    password: '',
  });

  const OneHandler = (event) => {
    const { name, type, value } = event.target;

    setFormData((prevData) => {
      return {
        ...prevData,
        [name]: value,
      };
    });
  };

  // Regex Patterns For Email and Phone Number
  const phoneRegex = new RegExp(
    /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/i
  );

  const EmailRegex = new RegExp(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i);

  // Sumbit With Field Validations
  async function handleSubmit(event) {
    event.preventDefault();

    if (formData.fullname === '') {
      fullnameRef.current.focus();
      Swal.fire({
        title: 'Error!',
        text: 'Fullname Cant Be Empty!',
        icon: 'warning',
        confirmButtonText: 'OK',
      });
    } else if (formData.username === '') {
      usernameRef.current.focus();
      Swal.fire({
        title: 'Error!',
        text: 'Username Cant Be Empty!',
        icon: 'warning',
        confirmButtonText: 'OK',
      });
      return false;
    } else if (formData.country_row_id === '0') {
      country_row_idRef.current.focus();
      Swal.fire({
        title: 'Error!',
        text: 'Select Country',
        icon: 'warning',
        confirmButtonText: 'OK',
      });
      return false;
    } else if (formData.mobile_number === '') {
      mobile_numberRef.current.focus();
      Swal.fire({
        title: 'Error!',
        text: 'Mobile Number Cant Be Empty!',
        icon: 'warning',
        confirmButtonText: 'OK',
      });
      return false;
    } else if (!phoneRegex.test(formData.mobile_number)) {
      mobile_numberRef.current.focus();
      Swal.fire({
        title: 'Error!',
        text: 'Mobile Number Should Have Numbers Only',
        icon: 'warning',
        confirmButtonText: 'OK',
      });
      return false;
    } else if (formData.mobile_number.length != 10) {
      mobile_numberRef.current.focus();
      Swal.fire({
        title: 'Error!',
        text: 'Please enter valid  Mobile Number.',
        icon: 'warning',
        confirmButtonText: 'OK',
      });
      return false;
    } else if (formData.email_id === '') {
      email_idRef.current.focus();
      Swal.fire({
        title: 'Error!',
        text: 'Email Cant Be Empty!',
        icon: 'warning',
        confirmButtonText: 'OK',
      });
      return false;
    } else if (!EmailRegex.test(formData.email_id)) {
      email_idRef.current.focus();
      Swal.fire({
        title: 'Error!',
        text: 'Please Enter valid Email',
        icon: 'warning',
        confirmButtonText: 'OK',
      });
      return false;
    } else if (formData.password === '') {
      passwordnumberRef.current.focus();
      Swal.fire({
        title: 'Error!',
        text: 'Password Cant Be Empty!',
        icon: 'warning',
        confirmButtonText: 'OK',
      });
      return false;
    } else {
      // We know referral Id is not Mandotary so no Strict Validation for it.

      // URL
      const url = 'https://lobster-app-ddwng.ondigitalocean.app/user/register';

      // Payload
      const data = {
        full_name: formData.fullname,
        username: formData.username,
        email_id: formData.email_id,
        country_row_id: formData.country_row_id,
        mobile_number: formData.mobile_number,
        password: formData.password,
        referral_id: formData.referral_id,
      };

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
          console.log(res.data);
          if (res.data.status === true) {
            Swal.fire({
              title: 'Registered',
              text: 'Please Login Now!',
              icon: 'success',
            });
            navigate('/login');
          } else {
            Swal.fire({
              title: 'Error!',
              text: 'Please Check Details Again / User Already Existed!',
              icon: 'error',
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
    <div className='form-register-container' id='full-size'>
      <div className='login-header'>
        <h1 className='login-title'>Register</h1>
        <h3>Create Your Company Accounts.</h3>
      </div>

      <form className='form-register' onSubmit={handleSubmit} noValidate>
        <div className='input-container'>
          {' '}
          <input
            type='text'
            placeholder='Full name *'
            className='form--input'
            name='fullname'
            ref={fullnameRef}
            value={formData.fullname}
            onChange={OneHandler}
          />
        </div>
        <div className='input-container'>
          {' '}
          <input
            type='text'
            placeholder='User name *'
            className='form--input'
            name='username'
            ref={usernameRef}
            value={formData.username}
            onChange={OneHandler}
          />
        </div>
        <div className='input-container'>
          <select
            id='favColor'
            name='country_row_id'
            onChange={OneHandler}
            ref={country_row_idRef}
          >
            {' '}
            <option value='0'>Select Country *</option>\
            <option value='101'>INDIA</option>
            <option value='102'>USA</option>
            <option value='103'>JAPAN</option>
            <option value='104'>SRI-LANKA</option>
          </select>
        </div>
        <div className='input-container'>
          <input
            type='number'
            placeholder='Mobile Number *'
            className='form--input'
            name='mobile_number'
            ref={mobile_numberRef}
            value={formData.mobile_number}
            onChange={OneHandler}
          />
        </div>
        <div className='input-container'>
          <input
            type='email'
            placeholder='Email ID *'
            className='form--input'
            name='email_id'
            ref={email_idRef}
            value={formData.email_id}
            onChange={OneHandler}
          />
        </div>
        <div className='input-container'>
          {' '}
          <input
            type='password'
            placeholder='Password *'
            className='form--input'
            name='password'
            ref={passwordnumberRef}
            value={formData.password}
            onChange={OneHandler}
          />
        </div>
        <div className='input-container'>
          {' '}
          <input
            type='text'
            placeholder='Referral ID'
            className='form--input'
            name='referral_id'
            ref={referral_idRef}
            value={formData.referral_id}
            onChange={OneHandler}
          />
        </div>
        <div className='btn-container'>
          <button type='submit' className='form--register'>
            Register
          </button>
        </div>
      </form>
    </div>
  );
}
