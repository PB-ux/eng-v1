import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

function UploadPhoto({ src, title, uploadPhoto, type }) {
    const dispatch = useDispatch();

    const [file, setFile] = useState();

    useEffect(() => {
        if (file) handleSubmit();
    }, [file]);


    function handleChange(event) {
        setFile(event.target.files[0]);
    }

    console.log(file);

    function handleSubmit() {
        const formData = new FormData();
        formData.append(type, file);

        dispatch(uploadPhoto(formData));
    }

    return <div className="upload">
        <img className="upload__avatar" src={`http://localhost:5000/${src}`}></img>
        <form className="upload__form">
            <input type="file" id="file" className="upload__file" onChange={handleChange}/>
            <label className="upload__label" htmlFor="file">
                <span>{title}</span>
            </label>
        </form>
    </div>
}

export default UploadPhoto;