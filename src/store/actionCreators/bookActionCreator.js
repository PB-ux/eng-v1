import bookActions from 'src/store/actionConstants/bookActions.js';

export const getBookAction = (payload) => ({ type: bookActions.GET_BOOKS, payload });

export const setBookAction = (payload) => ({ type: bookActions.SET_BOOKS, payload });

export const getFavoriteBookAction = (payload) => ({ type: bookActions.GET_FAVORITE_BOOK, payload });

export const setFavoriteBookAction = () => ({ type: bookActions.SET_FAVORITE_BOOK });

export const deleteFavoriteBookAction = (payload) => ({ type: bookActions.DELETE_FAVORITE_BOOK, payload });