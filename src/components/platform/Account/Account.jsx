import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { present } from 'src/lib/RamdaHelpers.js';
import { getBooks } from 'src/store/asyncActions/books.js';

import BookRepository from 'src/repositories/BookRepository.js';

import InfoAccount from './InfoAccount.jsx';
import StatisticAccount from './StatisticAccount.jsx';
import StatisticExerciseAccount from './StatisticExerciseAccount.jsx';

import Spinner from 'src/components/UI/Spinner.jsx';
import EditInfoAccount from "src/components/platform/Account/EditInfoAccount.jsx";
import {edit} from "src/store/asyncActions/users";
import ExerciseRepository from "src/repositories/ExerciseRepository";

function Account(props) {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.user);
    const books = useSelector((state) => state.books.books);

    const [isLoading, setLoading] = useState(false);
    const [statisticBook, setStatisticBook] = useState([]);
    const [statisticExercise, setStatisticExercise]= useState([]);

    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            dispatch(getBooks())
            setLoading(false);
        }, 1000);
    }, []);


    useEffect(() => {
        const params = { userId: user.id };

        if (present(user)) {
            BookRepository.getCurrentBooks(params)
                .then((response) => {
                    const { booksCurrent } = response.user;
                    setStatisticBook(booksCurrent);
                }).catch((e) => console.log(e));

            ExerciseRepository.getCurrentExercise(params)
                .then((response) => {
                    const { currentExercise } = response.user;
                    setStatisticExercise(currentExercise);
                }).catch((e) => console.log(e));
        }
    }, [user])

    const handleEditAccount = (data) => {
        setLoading(true);
        setTimeout(() => {
            dispatch(edit(data));
            setLoading(false);
        }, 1000);
    }

    if (isLoading) return <Spinner isLoading={isLoading} />

    return <div className="account pages">
        <div className="account__content">
            <div className="account__content-hey">👋Привет, {user.firstName}</div>
            <h3 className="account__content-title">Ты заработал {user.points} поинта</h3>
            <div className="account__statistic">
                <StatisticAccount statistic={statisticBook} countBooks={books.length}/>
                <StatisticExerciseAccount statistic={statisticExercise} countBooks={books.length}/>
            </div>
            <h5 className="account__content-edit">Редактирование информации</h5>
            <EditInfoAccount handleEditAccount={handleEditAccount} />
        </div>
        <InfoAccount />
    </div>;
}

export default Account;