import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import cn from 'classnames';

import  { ACTIVE_MODULE } from 'src/components/constansts/activeModuleConstant.js';

import { present } from 'src/lib/RamdaHelpers.js';

import CategoryRepository from 'src/repositories/CategoryRepository.js';
import AuthorRepository from 'src/repositories/AuthorRepository.js';
import BookRepository from 'src/repositories/BookRepository';

import SelectOptionsPresenter from 'src/presenters/SelectOptionsPresenter.js';

import EmptyCover from 'src/assets/empty-cover.jpg';

import Input from 'src/components/UI/Input.jsx';
import Button from 'src/components/UI/Button.jsx';
import Textarea from 'src/components/UI/Textarea.jsx';
import Select from 'src/components/UI/Select.jsx';
import Spinner from 'src/components/UI/Spinner.jsx';

function CreateAdminBook(props) {
    const activeModule = useSelector((state) => state.activeModule.activeModule);
    const { register, handleSubmit, control, getValues, watch, reset, formState: { errors } } = useForm({
        defaultValues: {
            title: '',
            description: '',
            level: '',
            category: '',
            author: '',
            file: {},
            cover: {},
        }
    });
    const watchPdf = watch('file');
    const watchCover = watch('cover');
    const pdf = getValues('file')[0];
    const cover = getValues('cover')[0];

    const [optionsCategory, setOptionsCategory] = useState([]);
    const [optionsAuthor, setOptionsAuthor] = useState([]);
    const [isLoading, setLoading] = useState(false);

    const srcCover = present(cover) ? URL.createObjectURL(cover) : EmptyCover;
    const validations = {
        req: { required: 'Это обязательное поле!'}
    }
    let pdfName;

    if (present(pdf)) pdfName = pdf.name.length > 30 ? `${pdf.name.slice(0, 30)}...` : pdf.name;

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

    const handleSendForm = (data) => {
        const formData = new FormData();
        formData.append('title', data.title);
        formData.append('description', data.description);
        formData.append('level', data.level);
        formData.append('categoryId', data.category.value);
        formData.append('authorId', data.author.value);
        formData.append('cover', data.cover[0]);
        formData.append('file', data.file[0]);

        setLoading(true);
        setTimeout(() => {
            BookRepository.createBook(formData)
                .then((response) => {
                    setLoading(false);
                }).catch((e) => console.log(e));
        }, 1500);

        reset();
    };

    if (isLoading) return <Spinner isLoading={isLoading} />;

    return <div className={cn('admin__book pages', { 'pages_offset': activeModule === ACTIVE_MODULE.admin })}>
        <h3 className="admin__book-title">Добавить книгу</h3>
        <form className="admin__book-form" onSubmit={handleSubmit(handleSendForm)}>
            <div className="admin__book-container">
                <Input register={register} errors={errors} name="title" validationSchema={validations.req} textLabel="Название книги" className="admin__book-input_label" text="Robin Hood" required />
                <Textarea register={register} errors={errors} name="description" validationSchema={validations.req} textLabel="Описание" className="admin__book-input_label" text="Рассказывает о жизни и приключениях Робин Гуда..." required />
                <Input register={register} errors={errors} name="level" validationSchema={validations.req} textLabel="Уровень книги" className="admin__book-input_label" text="A1" required />
                <Select control={control} rules={{ required: 'Это поле обязательное!' }} name="category" errors={errors} options={optionsCategory} placeholder="Выберите жанр" textLabel="Жанр книги" className="admin__book-input_label" required />
                <Select control={control} rules={{ required: 'Это поле обязательное!' }} name="author" errors={errors} options={optionsAuthor} placeholder="Выберите автора" textLabel="Автор книги" className="admin__book-input_label" required />

                <div className="admin__book-pdf">
                    <label className="admin__book-pdf_label" htmlFor="pdf">
                        <span>Загрузить книгу</span>
                    </label>
                    <span className={cn('admin__book-pdf_name', { 'admin__book-pdf_name_red': present(errors.file) })}>{ present(errors.file) ? errors.file.message : pdfName }</span>
                    <input {...register('file', { required: 'Выберите файл!' })} type="file" id="pdf" className="admin__book-pdf_input" />
                </div>

                <Button className="admin__book-btn" type="submit">Отправить</Button>
            </div>

            <div className="admin__book-upload">
                <div className="upload">
                    <img className="upload__cover" src={srcCover}></img>
                    { present(errors.cover) ? <span className="upload__error">{errors.cover.message}</span> : null }
                    <input {...register('cover', { required: 'Выберите файл!' })} type="file" id="cover" className="upload__file" />
                    <label className="upload__label" htmlFor="cover">
                        <span>Загрузить обложку</span>
                    </label>
                </div>
            </div>
        </form>
    </div>
}

export default CreateAdminBook;