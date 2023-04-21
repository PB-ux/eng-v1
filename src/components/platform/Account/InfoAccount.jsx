import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import cn from 'classnames';

import  { uploadPhoto } from '../../../store/asyncActions/users';

function InfoAccount(props) {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.user);

    const [file, setFile] = useState();
    const [isVisible, setVisible] = useState(false);

    function handleChange(event) {
        setFile(event.target.files[0]);
        setVisible(true);
    }

    function handleSubmit(event) {
        event.preventDefault()

        setVisible(false);

        const formData = new FormData();
        formData.append('file', file);

        dispatch(uploadPhoto(formData));
    }

    return <div className="account__info">
        <div className="account__info-photo">
            <img className="account__info-avatar" src={`http://localhost:5000/${user.photo}`}></img>
            <form className="account__info-form">
                <input type="file" id="file" className="account__info-file" onChange={handleChange}/>
                <label className={cn('account__info-label', { 'account__info-label_visible': isVisible })} htmlFor="file">
                    { isVisible ? <button className="account__info-overlay_btn" type="submit" onClick={handleSubmit}>Подтвердить</button> : <span className="account__info-overlay">Загрузить фото</span> }
                </label>
            </form>
        </div>
    </div>;
}

export default InfoAccount;