import React from 'react';
import SyncLoader from 'react-spinners/SyncLoader';

function Spinner({ isLoading, color = '#1C7AF9', text = 'Идет загрузка...' }) {
    return <div className="spinner">
        <span className="spinner__title">{text}</span>
        <SyncLoader loading={isLoading} color={color} />
    </div>;
}

export default Spinner;