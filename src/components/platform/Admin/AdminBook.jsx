import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import cn from 'classnames';

import  { ACTIVE_MODULE } from 'src/components/constansts/activeModuleConstant.js';

import CategoryRepository from 'src/repositories/CategoryRepository.js';
import AuthorRepository from 'src/repositories/AuthorRepository.js';
import SelectOptionsPresenter from 'src/presenters/SelectOptionsPresenter.js';

import EmptyCover from 'src/assets/empty-cover.jpg';

import Input from 'src/components/UI/Input.jsx';
import Button from 'src/components/UI/Button.jsx';
import Textarea from 'src/components/UI/Textarea.jsx';
import Select from 'src/components/UI/Select.jsx';
import BookRepository from "src/repositories/BookRepository";

function AdminBook(props) {
    const activeModule = useSelector((state) => state.activeModule.activeModule);
    const [cover, setCover] = useState();
    const [pdf, setPdf] = useState();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [level, setLevel] = useState('');
    const [author, setAuthor] = useState('');
    const [category, setCategory] = useState('');
    const [optionsCategory, setOptionsCategory] = useState([]);
    const [optionsAuthor, setOptionsAuthor] = useState([]);

    const srcCover = cover ? URL.createObjectURL(cover) : EmptyCover;
    let pdfName;

    if (pdf) pdfName = pdf.name.length > 30 ? `${pdf.name.slice(0, 30)}...` : pdf.name;

    useEffect(() => {
        CategoryRepository.getOnlyCategories()
            .then(({ categories }) => {
                const options = SelectOptionsPresenter.optionsValueCategory(categories);
                setOptionsCategory(options);
            }).catch((e) => console.log(e));

        AuthorRepository.getOnlyAuthors()
            .then(({ authors }) => {
                const options = SelectOptionsPresenter.optionsValueAuthor(authors);
                setOptionsAuthor(options);
            }).catch((e) => console.log(e));
    }, [])

    const handleCover = (e) => {
        setCover(e.target.files[0]);
    }

    const handlePdf = (e) => {
        setPdf(e.target.files[0]);
    }

    const handleSendForm = () => {
        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('level', level);
        formData.append('categoryId', category.value);
        formData.append('authorId', author.value);
        formData.append('cover', cover);
        formData.append('file', pdf);

        BookRepository.createBook(formData)
            .then((response) => {
                console.log(response);
            }).catch((e) => console.log(e));
    }

    return <div className={cn('admin__book pages', { 'pages_offset': activeModule === ACTIVE_MODULE.admin })}>
        <h3 className="admin__book-title">Добавить книгу</h3>
        <div className="admin__book-container">
            <div className="admin__book-form">
                <Input textLabel="Название книги" className="admin__book-input_label" text="Robin Hood" onChange={setTitle} />
                <Textarea textLabel="Описание" className="admin__book-input_label" text="Рассказывает о жизни и приключениях Робин Гуда..." onChange={setDescription} />
                <Input textLabel="Уровень книги" className="admin__book-input_label" text="A1" onChange={setLevel} />
                <Select onChange={setCategory} options={optionsCategory} placeholder="Выберите жанр" className="xselect admin__book-input_label" classNamePrefix="react-select" />
                <Select onChange={setAuthor} options={optionsAuthor} placeholder="Выберите автора" className="xselect admin__book-input_label" classNamePrefix="react-select" />
                <div className="admin__book-pdf">
                    <label className="admin__book-pdf_label" htmlFor="pdf">
                        <span>Загрузить книгу</span>
                    </label>
                    <span className="admin__book-pdf_name">{ pdfName ? pdfName : 'Файл не загружен' }</span>
                    <input type="file" id="pdf" className="admin__book-pdf_input" onChange={handlePdf}/>
                </div>
                <Button className="admin__book-btn" onClick={handleSendForm}>Отправить</Button>
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