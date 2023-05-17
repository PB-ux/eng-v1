import React, { useState } from 'react';
import QuizForm from "src/components/platform/Admin/Gramma/Exercise/QuizForm.jsx";
import QuizFormResult from "src/components/platform/Admin/Gramma/Exercise/QuizFormResult.jsx";
import cn from "classnames";
import {ACTIVE_MODULE} from "src/components/constansts/activeModuleConstant";
import {useSelector} from "react-redux";

function CreateAdminExercise(props) {
    const activeModule = useSelector((state) => state.activeModule.activeModule);

    const [result, setResult] = useState(null);

    return <div className={cn('page-theory pages', { 'pages_offset': activeModule === ACTIVE_MODULE.admin })}>
        <QuizForm onSubmit={setResult} />
        <QuizFormResult result={result} />
    </div>
}

export default CreateAdminExercise;