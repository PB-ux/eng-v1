import BookRepository from '../../repositories/BookRepository.js';

import {
    deleteFavoriteBookAction,
    getBookAction,
    getFavoriteBookAction,
    setBookAction,
    setFavoriteBookAction
} from '../actionCreators/bookActionCreator.js';

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

export const getFavoriteBook = (payload) => {
    return (dispatch) => {
        BookRepository.getFavoriteBook(payload)
            .then((response) => {
                const { booksFavorite } = response.user;
                dispatch(getFavoriteBookAction(booksFavorite));
            }).catch((e) => console.log(e));
    }
}

export const setFavoriteBook = (payload) => {
    return (dispatch) => {
        BookRepository.setFavoriteBook(payload)
            .then((response) => {
                dispatch(setFavoriteBookAction())
            }).catch((e) => console.log(e));
    }
}

export const deleteFavoriteBook = (payload) => {
    return (dispatch) => {
        BookRepository.deleteFavoriteBook(payload)
            .then((response) => {
                dispatch(deleteFavoriteBookAction(payload.bookId));
            }).catch((e) => console.log(e));
    }
}