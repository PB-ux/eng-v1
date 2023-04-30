import React from 'react';
import { useSelector } from 'react-redux'

import InfoAccount from './InfoAccount.jsx';

function Account(props) {
    return <div className="account">
        <h1>Account</h1>
        <InfoAccount />
    </div>;
}

export default Account;