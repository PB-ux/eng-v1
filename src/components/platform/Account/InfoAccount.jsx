import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import  { uploadPhoto } from '../../../store/asyncActions/users';
import  userAvatar from '../../../assets/user-avatar.png';

function InfoAccount(props) {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.user);

    const pathAvatar = user.photo ? `http://localhost:5000/${user.photo}` : userAvatar

    const [file, setFile] = useState();

    useEffect(() => {
        if (file) handleSubmit();
    }, [file]);


    function handleChange(event) {
        setFile(event.target.files[0]);
    }

    function handleSubmit() {
        const formData = new FormData();
        formData.append('file', file);

        dispatch(uploadPhoto(formData));
    }

    return <div className="account__info">
        <div className="account__info-photo">
            <img className="account__info-avatar" src={pathAvatar}></img>
            <form className="account__info-form">
                <input type="file" id="file" className="account__info-file" onChange={handleChange}/>
                <label className="account__info-label" htmlFor="file">
                    <span>Загрузить фото</span>
                </label>
            </form>
        </div>
    </div>;
}

export default InfoAccount;