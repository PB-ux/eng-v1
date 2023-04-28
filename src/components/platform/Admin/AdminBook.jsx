import React, { useState } from 'react';
import cn from 'classnames';
import { useSelector } from 'react-redux';

import  { ACTIVE_MODULE } from 'src/components/constansts/activeModuleConstant.js';

import EmptyCover from 'src/assets/empty-cover.jpg';

import Input from 'src/components/UI/Input.jsx';
import Button from 'src/components/UI/Button.jsx';

function AdminBook(props) {
    const activeModule = useSelector((state) => state.activeModule.activeModule);
    const [file, setFile] = useState();
    const [pdf, setPdf] = useState();
    const srcCover = file ? URL.createObjectURL(file) : EmptyCover;
    let pdfName;

    if (pdf) pdfName = pdf.name.length > 50 ? `${pdf.name.slice(0, 50)}...` : pdf.name;

    const handleCover = (e) => {
        setFile(e.target.files[0]);
    }

    const handlePdf = (e) => {
        setPdf(e.target.files[0]);
    }

    return <div className={cn('admin__book pages', { 'pages_offset': activeModule === ACTIVE_MODULE.admin })}>
        <h3 className="admin__book-title">Добавить книгу</h3>
        <div className="admin__book-container">
            <div className="admin__book-form">
                <Input textLabel="Название книги" className="admin__book-input_label" text="Robin Hood"></Input>
                <Input textLabel="Описание" className="admin__book-input_label" text="Рассказывает о жизни и приключениях Робин Гуда..."></Input>
                <Input textLabel="Уровень книги" className="admin__book-input_label" text="A1"></Input>
                <Input textLabel="Автор книги" className="admin__book-input_label" text="Neil Philip"></Input>
                <Input textLabel="Категория книги" className="admin__book-input_label" text="Приключения"></Input>
                <div className="admin__book-pdf">
                    <label className="admin__book-pdf_label" htmlFor="pdf">
                        <span>Загрузить книгу</span>
                    </label>
                    <span className="admin__book-pdf_name">{ pdfName ? pdfName : 'Файл не загружен' }</span>
                    <input type="file" id="pdf" className="admin__book-pdf_input" onChange={handlePdf}/>
                </div>
                <Button className="admin__book-btn">Отправить</Button>
            </div>
            <div className="admin__book-upload">
                <div className="upload">
                    <img className="upload__cover" src={srcCover}></img>
                    <form className="upload__form">
                        <input type="file" id="file" className="upload__file" onChange={handleCover}/>
                        <label className="upload__label" htmlFor="file">
                            <span>Загрузить обложку</span>
                        </label>
                    </form>
                </div>
            </div>
        </div>
    </div>
}

export default AdminBook;