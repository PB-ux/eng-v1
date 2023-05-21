import bookActions from '../actionConstants/bookActions.js';

const defaultState = {
    books: [],
    countFavoriteBook: 0,
}

export const bookReducer = (state = defaultState, action) => {
    switch(action.type) {
        case bookActions.GET_BOOKS:
            return {...state, books: [...action.payload]};
        case bookActions.SET_BOOKS:
            return {...state, books: [...action.payload]};
        case bookActions.GET_FAVORITE_BOOK:
            return {...state, books: [...action.payload]};
        case bookActions.DELETE_FAVORITE_BOOK:
            const countDeleteFavoriteBook = state.countFavoriteBook - 1;
            const bookId = action.payload;

            const favoriteBooks = state.books.filter((item) => item.id !== bookId);

            return {...state, books: [...favoriteBooks], countFavoriteBook: countDeleteFavoriteBook};
        case bookActions.SET_FAVORITE_BOOK:
            const countAddFavoriteBook = state.countFavoriteBook + 1;

            return {...state, countFavoriteBook: countAddFavoriteBook}
        default:
            return state;
    }
}