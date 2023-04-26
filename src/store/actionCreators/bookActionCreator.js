import bookActions from '../actionConstants/bookActions.js';

export const getBookAction = (payload) => ({ type: bookActions.GET_BOOKS, payload });

export const setBookAction = (payload) => ({ type: bookActions.SET_BOOKS, payload });