import React from 'react';
import cn from "classnames";
import  {ACTIVE_MODULE } from "../../constansts/activeModuleConstant";
import {useSelector} from "react-redux";

function AdminBook(props) {
    const activeModule = useSelector((state) => state.activeModule.activeModule);

    return <div className={cn('pages', { 'pages_offset': activeModule === ACTIVE_MODULE.admin })}>
        Админ Книги
    </div>
}

export default AdminBook;