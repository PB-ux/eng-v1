import React from 'react';
import { useSelector } from 'react-redux';

import InfoAccount from './InfoAccount.jsx';

function Account(props) {
    const user = useSelector((state) => state.user.user);

    return <div className="account pages">
        <div className="account__content">
            <div className="account__content-hey">👋Привет, {user.firstName}</div>
            <h3 className="account__content-title">Ты заработал {user.points} поинта</h3>
        </div>
        <InfoAccount />
    </div>;
}

export default Account;