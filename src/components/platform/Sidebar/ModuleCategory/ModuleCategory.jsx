import React, { useEffect, useState } from 'react';
import cn from 'classnames';

import CategoryRepository from 'src/repositories/CategoryRepository.js';

import CategoryItem from './CategoryItem.jsx';

function ModuleCategory({ className }) {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        CategoryRepository.getCategories()
            .then((response) => {
                const { categories } = response;

                setCategories(categories);
            })
            .catch((e) => console.log(e));
        return () => {

        }
    }, []);

    return <div className={cn('module', className)}>
        <div className="module__title">Категории</div>
        <CategoryItem title="Понравившиеся книги" />
        { categories.map((category) => <CategoryItem key={category.id} title={category.title} countBook={category.books.length} />) }
    </div>;
}

export default ModuleCategory;