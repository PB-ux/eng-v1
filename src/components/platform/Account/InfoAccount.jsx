import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import  { uploadPhoto } from 'src/store/asyncActions/users.js';

import UploadPhoto from 'src/components/UI/UploadPhoto.jsx';

function InfoAccount(props) {
    const user = useSelector((state) => state.user.user);

    return <div className="account__info">
        <UploadPhoto src={user.photo} title="Загрузить фото" uploadPhoto={uploadPhoto} type="file" />
    </div>;
}

export default InfoAccount;