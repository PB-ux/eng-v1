import React from 'react';
import SyncLoader from 'react-spinners/SyncLoader';

function Spinner({ isLoading, color = '#1C7AF9' }) {
    return <div className="spinner">
        <span className="spinner__title">Идет загрузка...</span>
        <SyncLoader loading={isLoading} color={color} />
    </div>;
}

export default Spinner;