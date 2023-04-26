import React, {useEffect, useState} from 'react';
import cn from 'classnames';

import CategoryRepository from '../../../repositories/CategoryRepository';

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
    }, []);

    return <div className={cn('module-category', className)}>
        <div className="module-category__title">Категории</div>
        { categories.map((category) => <CategoryItem key={category.id} title={category.title} countBook={category.books.length} />) }
    </div>;
}

export default ModuleCategory;