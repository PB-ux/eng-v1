import Account from './components/platform/Account/Account.jsx';
import Library from './components/platform/Library/Library.jsx';
import PageBook from './components/platform/Library/PageBook.jsx';
import Gramma from './components/platform/Gramma/Gramma.jsx'

export const publicRouters = [
    {
        path: "/account",
        element: <Account />,
    },
    {
        path: "/library",
        element: <Library />
    },
    {
        path: "library/book/:id",
        element: <PageBook />
    },
    {
        path: "/gramma",
        element: <Gramma />
    }
];