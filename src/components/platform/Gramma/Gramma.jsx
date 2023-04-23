import React from 'react';

import ModuleGramma from '../Sidebar/ModuleGramma.jsx';
import GrammaPage from './GrammaPage.jsx';


function Gramma({}) {
    return <>
        <ModuleGramma></ModuleGramma>
        <GrammaPage title={"Начальный уровень"}></GrammaPage>
    </>;
}

export default Gramma;