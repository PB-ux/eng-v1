import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { present } from 'src/lib/RamdaHelpers.js';

import EmptyPhoto from 'src/assets/empty-cover.jpg';

function UploadPhoto({ src, title, uploadPhoto, type }) {
    const dispatch = useDispatch();

    const [file, setFile] = useState();

    const srcPhoto = present(src) ? `http://localhost:5000/${src}` : EmptyPhoto;

    useEffect(() => {
        if (file) handleSubmit();
    }, [file]);


    function handleChange(event) {
        setFile(event.target.files[0]);
    }

    function handleSubmit() {
        const formData = new FormData();
        formData.append(type, file);

        dispatch(uploadPhoto(formData));
    }

    return <div className="upload">
        <img className="upload__avatar" src={srcPhoto}></img>
        <form className="upload__form">
            <input type="file" id="file" className="upload__file" onChange={handleChange}/>
            <label className="upload__label" htmlFor="file">
                <span>{title}</span>
            </label>
        </form>
    </div>
}

export default UploadPhoto;