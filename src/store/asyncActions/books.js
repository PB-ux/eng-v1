import BookRepository from '../../repositories/BookRepository.js';

import { getBookAction, setBookAction } from '../actionCreators/bookActionCreator.js';

export const getBooks = () => {
    return (dispatch) => {
        BookRepository.getBooks()
            .then((response) => {
                const { books } = response;
                dispatch(getBookAction(books));
            }).catch((e) => console.log(e));
    }
}

export const setBooks = (payload) => {
    return (dispatch) => {
        BookRepository.getBooksCategory(payload)
            .then((response) => {
                console.log(response);
                const { books } = response;
                dispatch(setBookAction(books));
            }).catch((e) => console.log(e));
    }
}