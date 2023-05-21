import React, { useEffect, useState } from 'react';
import * as R from 'ramda';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import cn from 'classnames';

import { ACTIVE_MODULE } from 'src/components/constansts/activeModuleConstant.js';

import { present, isBlank } from "src/lib/RamdaHelpers";

import SelectOptionsPresenter from "src/presenters/SelectOptionsPresenter";

import BookRepository from "src/repositories/BookRepository";
import CategoryRepository from "src/repositories/CategoryRepository";
import AuthorRepository from "src/repositories/AuthorRepository";
import LevelRepository from "src/repositories/LevelRepository";

import Spinner from 'src/components/UI/Spinner.jsx';
import Input from "src/components/UI/Input.jsx";
import Textarea from "src/components/UI/Textarea.jsx";
import Select from "src/components/UI/Select.jsx";
import Button from "src/components/UI/Button.jsx";
import Success from 'src/components/UI/Success.jsx';

import EmptyCover from "src/assets/empty-cover.jpg";

function EditBook(props) {
    const activeModule = useSelector((state) => state.activeModule.activeModule);
    const params = useParams();
    const { id } = params;
    const { register, handleSubmit, control, getValues, watch, reset, formState: { errors } } = useForm({
        defaultValues: {
            file: '',
            cover: '',
        }
    });
    const watchPdf = watch('file');
    const watchCover = watch('cover');
    const pdf = getValues('file');
    const cover = getValues('cover');

    const downloadCoverPdf = async () => {
        const resCover = await fetch(`http://localhost:5000/${book.cover}`)
        const dataCover = await resCover.blob();
        const metadata = { type: 'image/jpeg' };
        const file = new File([dataCover], `${book.cover}.jpg`, metadata);
        const dt = new DataTransfer();
        dt.items.add(file);
        const fileListCover = dt.files;

        const resPdf = await fetch(`http://localhost:5000/${book.file}`);
        const dataPdf = await resPdf.blob();
        const metadataPdf = { type: 'application/pdf' };
        const filePdf = new File([dataPdf], `${book.title}.pdf`, metadataPdf);
        const dtPdf = new DataTransfer();
        dtPdf.items.add(filePdf);
        const fileListPdf = dtPdf.files;

        return [fileListCover, fileListPdf];
    }

    const [optionsCategory, setOptionsCategory] = useState([]);
    const [optionsAuthor, setOptionsAuthor] = useState([]);
    const [optionsLevel, setOptionsLevel] = useState([]);
    const [book, setBook] = useState({});
    const [isLoading, setLoading] = useState(false);
    const [isSuccess, setSuccess] = useState(false);

    const checkCover = (cover) => {
        if (isBlank(cover)) return EmptyCover;
        if (R.is(Object, cover)) return URL.createObjectURL(cover[0]);
    }

    const srcCover = checkCover(cover);

    const validations = {
        req: { required: 'Это обязательное поле!'}
    }
    let pdfName;

    if (present(pdf)) pdfName = pdf[0].name.length > 30 ? `${pdf[0].name.slice(0, 30)}...` : pdf[0].name;

    useEffect(() => {
        if (present(book)) {
            downloadCoverPdf()
                .then((response) => {
                    const optionsAuthor = SelectOptionsPresenter.optionsValueAuthor(book.authors)[0];
                    const optionsCategory = SelectOptionsPresenter.optionsValueCategory(book.categories)[0];
                    const optionsLevel = { value: book.level.id, label: book.level.title };
                    const defaultValues = { title: book.title, description: book.description, level: optionsLevel, cover: response[0], file: response[1], author: optionsAuthor, category: optionsCategory };

                    reset(defaultValues);
                }).catch((e) => console.log(e));
        }
    }, [book])

    useEffect(() => {
        BookRepository.getBook(id)
            .then((response) => {
                const { book } = response;
                setBook(book);
            })

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

        LevelRepository.getLevels()
            .then(({ levels }) => {
                const options = SelectOptionsPresenter.optionsValueLevel(levels);
                setOptionsLevel(options);
            }).catch((e) => console.log(e));
    }, []);

    const handleSendForm = (data) => {
        console.log(data);
        const formData = new FormData();
        formData.append('title', data.title);
        formData.append('description', data.description);
        formData.append('levelId', data.level.value);
        formData.append('categoryId', data.category.value);
        formData.append('authorId', data.author.value);
        formData.append('cover', data.cover[0]);
        formData.append('file', data.file[0]);

        setLoading(true);
        setTimeout(() => {
            BookRepository.updateBook(id, formData)
                .then((response) => {
                    setLoading(false);
                    setSuccess(true);
                }).catch((e) => console.log(e));
        }, 1500);

        reset();
    };

    if (isLoading) return <Spinner isLoading={isLoading} />
    if (isSuccess) return <Success successText="Урок успешно создан!" successBtnText="Вернуться к книгам" link="/admin/book/show"/>

    return <div className={cn('book-edit pages', { 'pages_offset': activeModule === ACTIVE_MODULE.admin })}>
        <h4>Редактирования книги</h4>
        <form className="admin__book-form" onSubmit={handleSubmit(handleSendForm)}>
            <div className="admin__book-container">
                <Input register={register} errors={errors} name="title" validationSchema={validations.req} textLabel="Название книги" className="admin__book-input_label" text="Robin Hood" required />
                <Textarea register={register} errors={errors} name="description" validationSchema={validations.req} textLabel="Описание" className="admin__book-input_label" text="Рассказывает о жизни и приключениях Робин Гуда..." required />
                { present(book) ? <Select control={control} rules={{ required: 'Это поле обязательное!' }} name="level" errors={errors} options={optionsLevel} placeholder="Выберите уровень" textLabel="Уровень книги" className="admin__book-input_label" required /> : null }
                { present(book) ? <Select control={control} rules={{ required: 'Это поле обязательное!' }} name="category" errors={errors} options={optionsCategory} placeholder="Выберите жанр" textLabel="Жанр книги" className="admin__book-input_label" required /> : null }
                { present(book) ? <Select control={control} rules={{ required: 'Это поле обязательное!' }} name="author" errors={errors} options={optionsAuthor} placeholder="Выберите автора" textLabel="Автор книги" className="admin__book-input_label" required /> : null }

                <div className="admin__book-pdf">
                    <label className="admin__book-pdf_label" htmlFor="pdf">
                        <span>Загрузить книгу</span>
                    </label>
                    <span className={cn('admin__book-pdf_name', { 'admin__book-pdf_name_red': present(errors.file) })}>{ present(errors.file) ? errors.file.message : pdfName }</span>
                    <input {...register('file')} type="file" id="pdf" className="admin__book-pdf_input" />
                </div>

                <Button className="admin__book-btn" type="submit">Отправить</Button>
            </div>

            <div className="admin__book-upload">
                <div className="upload">
                    <img className="upload__cover" src={srcCover}></img>
                    { present(errors.cover) ? <span className="upload__error">{errors.cover.message}</span> : '' }
                    <input {...register('cover')} type="file" id="cover" className="upload__file" />
                    <label className="upload__label" htmlFor="cover">
                        <span>Загрузить обложку</span>
                    </label>
                </div>
            </div>
        </form>
    </div>
}

export default EditBook;