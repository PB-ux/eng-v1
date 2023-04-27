import Account from './components/platform/Account/Account.jsx';
import Library from './components/platform/Library/Library.jsx';
import PageBook from './components/platform/Library/PageBook/PageBook.jsx';
import Gramma from './components/platform/Gramma.jsx'
import Reader from './components/platform/Library/Reader/Reader.jsx';
import Admin from './components/platform/Admin/Admin.jsx';

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
        path: "/library/:id",
        element: <PageBook />
    },
    {
        path: "/book/read/:id",
        element: <Reader />
    },
    {
        path: "/gramma",
        element: <Gramma />
    },
    {
        path: "/admin",
        element: <Admin />
    }
];