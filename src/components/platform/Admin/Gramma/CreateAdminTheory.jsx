import React, { useState } from 'react';
import MDEditor from '@uiw/react-md-editor';
import cn from "classnames";
import {ACTIVE_MODULE} from "src/components/constansts/activeModuleConstant";
import {useSelector} from "react-redux";

import Button from 'src/components/UI/Button.jsx';

function CreateAdminTheory(props) {
    const activeModule = useSelector((state) => state.activeModule.activeModule);
    const [value, setValue] = useState("");

    return <div data-color-mode="light" className={cn('admin__theory pages', { 'pages_offset': activeModule === ACTIVE_MODULE.admin })}>
       <h4 className="admin__theory-title">Создание материала по грамматике</h4>
        <div className="admin__theory-markdown">
            <MDEditor
                value={value}
                onChange={setValue}
                className="admin__theory-editor"
            />
        </div>
        <Button className="admin__theory-btn">Отправить</Button>
    </div>
}

export default CreateAdminTheory;