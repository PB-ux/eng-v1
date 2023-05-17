import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import  { uploadPhoto } from 'src/store/asyncActions/users.js';

import UploadPhoto from 'src/components/UI/UploadPhoto.jsx';

import Tooltip from 'src/components/UI/Tooltip.jsx';

function InfoAccount(props) {
    const user = useSelector((state) => state.user.user);

    const renderOverlayLevel = () => {
        return <div>
            Твой текущий уровень
        </div>
    }

    return <div className="account__info">
        <UploadPhoto src={user.photo} title="Загрузить фото" uploadPhoto={uploadPhoto} type="file" />
        <div className="account__info-award">
            <div className="account__info-award_title">Достижения</div>
            <Tooltip overlay={renderOverlayLevel}>
                <div className="account__info-level">
                    <div className="account__info-level_title">{user.level}</div>
                </div>
            </Tooltip>
        </div>
    </div>;
}

export default InfoAccount;