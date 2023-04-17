import Account from './components/platform/Account.jsx';
import Library from './components/platform/Library/Library.jsx';
import Gramma from './components/platform/Gramma.jsx'

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
        path: "/gramma",
        element: <Gramma />
    }
];