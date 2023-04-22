import React, { useEffect, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { checkAuth } from './store/asyncActions/users';

import RootRouter from './RootRouter.jsx';

import Spinner from './components/UI/Spinner.jsx';

function App(props) {
    const dispatch = useDispatch();

    const [isLoading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            dispatch(checkAuth());
            setLoading(false);
        }, 2000);
    }, [])

    if (isLoading) return <Spinner isLoading={isLoading} />;

    return <BrowserRouter>
        <RootRouter />
    </BrowserRouter>;
}

export default App;