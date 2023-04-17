import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import RootRouter from "./RootRouter.jsx";

function App(props) {
    return <BrowserRouter>
        <RootRouter />
    </BrowserRouter>
}

export default App;