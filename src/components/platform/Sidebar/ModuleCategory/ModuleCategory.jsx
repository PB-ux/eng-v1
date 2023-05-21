import React, { useEffect, useState } from 'react';
import cn from 'classnames';

import CategoryRepository from 'src/repositories/CategoryRepository.js';

import CategoryItem from './CategoryItem.jsx';
import BookRepository from "src/repositories/BookRepository";
import {useSelector} from "react-redux";

function ModuleCategory({ className }) {
    const user = useSelector((state) => state.user.user);
    const countFavoriteBook = useSelector((state) => state.books.countFavoriteBook);

    const [categories, setCategories] = useState([]);
    const [books, setBooks] = useState([]);


    useEffect(() => {
        CategoryRepository.getCategories()
            .then((response) => {
                const { categories } = response;

                setCategories(categories);
            })
            .catch((e) => console.log(e));

        BookRepository.getBooks()
            .then((response) => {
                const { books } = response;
                setBooks(books);
            }).catch((e) => console.log(e));

        return () => {

        }
    }, []);

    return <div className={cn('module', className)}>
        <div className="module__title">Категории</div>
        <CategoryItem title="Все книги" countBook={books.length}/>
        <CategoryItem title="Понравившиеся книги" countBook={countFavoriteBook}/>
        { categories.map((category) => <CategoryItem key={category.id} title={category.title} countBook={category.books.length} />) }
    </div>;
}

export default ModuleCategory;