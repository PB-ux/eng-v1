import React from 'react';
import { useSelector } from 'react-redux';
import cn from 'classnames';

import { ACTIVE_MODULE } from 'src/components/constansts/activeModuleConstant';

import { ImBooks } from 'react-icons/Im';

function EmptyBook(props) {
    const activeModule = useSelector((state) => state.activeModule.activeModule);

    return <div className={cn('empty-book pages', { 'pages_offset': activeModule === ACTIVE_MODULE.categoryBooks })}>
        <ImBooks className="empty-book__icon" />
        <div className="empty-book__title">
            В этом разделе пока нет книг
        </div>
    </div>;
}

export default EmptyBook;