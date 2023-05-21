import React from 'react';
import { useSelector } from 'react-redux';
import cn from 'classnames';

import { ACTIVE_MODULE } from 'src/components/constansts/activeModuleConstant';

function EmptyContent({ title, icon }) {
    const activeModule = useSelector((state) => state.activeModule.activeModule);

    return <div className={cn('empty-book pages', { 'pages_offset': activeModule === ACTIVE_MODULE.categoryBooks || activeModule === ACTIVE_MODULE.gramma })}>
        { icon }
        <div className="empty-book__title">
            { title }
        </div>
    </div>;
}

export default EmptyContent;