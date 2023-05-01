import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Menu, { MenuItem } from 'rc-menu';
import Modal from 'react-modal';
import cn from 'classnames';

import { ACTIVE_MODULE } from 'src/components/constansts/activeModuleConstant.js';

import BookRepository from 'src/repositories/BookRepository.js';

import Table from 'src/components/UI/Table.jsx';
import Dropdown from 'src/components/UI/Dropdown.jsx';
import LevelCard from 'src/components/UI/LevelCard.jsx';
import Button from 'src/components/UI/Button.jsx';
import Spinner from 'src/components/UI/Spinner.jsx';

import { BiDotsHorizontalRounded } from 'react-icons/Bi';
import { GrView } from 'react-icons/Gr';
import { CiEdit } from 'react-icons/Ci';
import { RiDeleteBin2Line } from 'react-icons/Ri';

const getTableData = (data) => {
    return data.map((item) => {
        return {
            id: item.id,
            title: item.title.length > 10 ? `${item.title.slice(0, 10)}...` : item.title,
            cover: item.cover,
            level: item.level,
            description: item.description.length > 20 ? `${item.description.slice(0, 20)}...` : item.description,
            authors: item.authors.map((author) => author.fullName).join(','),
            categories: item.categories.map((category) => category.title).join(','),
        }
    })
}

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};

function AdminBooks(props) {
    const activeModule = useSelector((state) => state.activeModule.activeModule);
    const navigate = useNavigate();

    const [books, setBooks] = useState([]);
    const [isLoading, setLoading] = useState(false);
    const [modalIsOpen, setIsOpen] = React.useState(false);

    const data = getTableData(books);

    const columns = React.useMemo(
        () => [
            {
                Header: 'Название',
                Cell: ({row}) => (
                    <span>
                        <img className="admin-books__table-img" src={`http://localhost:5000/${row.original.cover}`} />
                        {row.original.title}
                    </span>
                ),
                accessor: 'title', // accessor is the "key" in the data
            },
            {
                Header: 'Описание',
                accessor: 'description',
            },
            {
                Header: 'Уровень',
                Cell: ({row}) => (
                    <LevelCard level={row.original.level} />
                ),
                accessor: 'level',
            },
            {
                Header: 'Автор',
                accessor: 'authors',
            },
            {
                Header: 'Жанр',
                accessor: 'categories',
            },
            {
                Header: 'Действия',
                Cell: ({row}) => (
                    <Dropdown trigger="click" overlay={() => renderActions(row.original.id)} overlayStyle={{ position: 'absolute', zIndex: 200 }} destroyPopupOnHide>
                        <div className="admin-books__table-actions"><BiDotsHorizontalRounded /></div>
                    </Dropdown>
                ),
                accessor: 'actions',
            }
        ],
        []
    );

    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            BookRepository.getBooks()
                .then((response) => {
                    const { books } = response;
                    setBooks(books);
                    setLoading(false);
                })
        }, 1000);
    }, []);

    const handleClickView = (id) => {
        navigate(`/admin/book/${id}`)
    }

    const handleClickDelete = () => {
        setIsOpen(true);
    }

    const closeModal = () => {
        setIsOpen(false);
    }

    const handleAfterOpen = () => {
        document.body.style.overflow = 'hidden';
    }

    const handleAfterClose = () => {
        document.body.style.overflow = 'auto';
    }

    const renderActions = (id) => {
        return <Menu className="menu">
            <div className="admin-books__menu-icons">
                <GrView />
                <CiEdit />
                <RiDeleteBin2Line className="admin-books__menu-icons_red" />
            </div>
            <div className="admin-books__menu-items">
                <MenuItem key="1" onClick={() => handleClickView(id)}>Посмотреть</MenuItem>
                <MenuItem key="2">Ред.</MenuItem>
                <MenuItem key="3" onClick={handleClickDelete}>Удалить</MenuItem>
            </div>
        </Menu>
    }

    // if (isLoading) return <Spinner isLoading={isLoading} />;

    return <div className={cn('admin-books pages', { 'pages_offset': activeModule === ACTIVE_MODULE.admin })}>
        <h4>Книги</h4>
        <Modal onAfterOpen={handleAfterOpen} onAfterClose={handleAfterClose} isOpen={modalIsOpen} onRequestClose={closeModal} style={customStyles} contentLabel="Example Modal">
            <div className="admin-books__modal-title">Вы точно хотите удалить книгу?</div>
            <div className="admin-books__modal-btns">
                <Button className="admin-books__modal-btn admin-books__modal-btn_cancel" onClick={closeModal}>Отмена</Button>
                <Button className="admin-books__modal-btn">Подтвердить</Button>
            </div>
        </Modal>
        <Table columns={columns} data={data} />
    </div>;
}

export default AdminBooks;