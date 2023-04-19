import React, { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { checkAuth } from './store/asyncActions/users';

import RootRouter from "./RootRouter.jsx";

function App(props) {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(checkAuth());
    }, [])

    return <BrowserRouter>
        <RootRouter />
    </BrowserRouter>;
}

export default App;