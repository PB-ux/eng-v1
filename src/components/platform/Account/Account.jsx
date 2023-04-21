import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'

import InfoAccount from './InfoAccount.jsx';

function Account(props) {
    const user = useSelector((state) => state.user.user);

    return <div className="account">
        <h1>Account</h1>
        <InfoAccount />
    </div>;
}

export default Account;