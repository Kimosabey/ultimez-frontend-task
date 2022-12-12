import React from 'react';

import { useLocation } from 'react-router-dom';
const INITIAL_STATE = [
  {
    Fullname: 'kimosa',
    Username: 'Tommy',
    Country: 21,
    Email: 'coding',
    Mobile: '9945475582',
    Referal_id: 'dsaffsad',
  },
];

const capitalize = (word) => {
  return word[0].toUpperCase() + word.slice(1);
};
export default function Dashboard() {
  // The data sent through can be accessed through the useLocation hook.
  const location = useLocation();

  const [users, setUsers] = React.useState(location.state.message);

  const {
    full_name,
    username,
    referral_row_id,
    referral_username,
    email_id,
    mobile_number,
    country_row_id,
  } = users;

  console.log(email_id, full_name);

  return (
    <div className='table-container' id='full-size'>
      <div className='card'>
        <h1>Details</h1>

        <table id='table'>
          <tr className='table-header'>
            <th>Fullname</th>
            <th>Username</th>
            <th>Country</th>
            <th>Email id</th>
            <th>Mobile number</th>
            <th>Referral id</th>
          </tr>
          <tr>
            <td>{full_name}</td>
            <td>{username}</td>
            <td>{country_row_id}</td>
            <td>{email_id}</td>
            <td>{mobile_number}</td>
            <td>{`${referral_username}-${referral_row_id}`}</td>
          </tr>
        </table>
      </div>
    </div>
  );
}
