import React, { useState, useEffect } from 'react';
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import Modal from "react-modal";
import Menu, {MenuItem} from "rc-menu";
import cn from "classnames";

import {ACTIVE_MODULE} from "src/components/constansts/activeModuleConstant";

import AuthorRepository from "src/repositories/AuthorRepository";

import Dropdown from "src/components/UI/Dropdown.jsx";
import Spinner from "src/components/UI/Spinner.jsx";
import Button from "src/components/UI/Button.jsx";
import Table from "src/components/UI/Table.jsx";

import {BiDotsHorizontalRounded} from "react-icons/Bi";
import {CiEdit} from "react-icons/Ci";
import {RiDeleteBin2Line} from "react-icons/Ri";

const getTableData = (data) => {
    return data.map((item) => {
        return {
            id: item.id,
            fullName: item.fullName,
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

function AdminAuthors(props) {
    const activeModule = useSelector((state) => state.activeModule.activeModule);
    const navigate = useNavigate();

    const [authors, setAuthors] = useState([]);
    const [isLoading, setLoading] = useState(false);
    const [modalIsOpen, setIsOpen] = useState(false);
    const [idAuthor, setId] = useState(null);

    const data = getTableData(authors);

    const columns = React.useMemo(
        () => [
            {
                Header: 'Имя автора',
                accessor: 'fullName',
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
        [authors]
    );

    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            AuthorRepository.getOnlyAuthors()
                .then((response) => {
                    const { authors } = response;
                    setAuthors(authors);
                    setLoading(false);
                })
        }, 1000);
    }, []);

    const handleClickDelete = (id) => {
        setIsOpen(true);
        setId(id);
    }

    const handleClickEdit = (id) => {
        navigate(`/admin/author/update/${id}`);
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

    const handleConfirmDelete = () => {
        const copyAuthors = [...authors];
        const filterAuthors = copyAuthors.filter((item) => item.id != idAuthor);
        setAuthors(filterAuthors);

        setLoading(true);
        closeModal();
        setTimeout(() => {
            AuthorRepository.deleteAuthor(idAuthor)
                .then((response) => {
                    console.log(response);
                })
                .catch((e) => console.log(e))
                .finally(() => {
                    setLoading(false);
                });
        }, 1000);
    }

    const renderActions = (id) => {
        return <Menu>
            <div className="admin-books__menu-icons">
                <CiEdit />
                <RiDeleteBin2Line className="admin-books__menu-icons_red" />
            </div>
            <div className="admin-books__menu-items">
                <MenuItem key="2" onClick={() => handleClickEdit(id)}>Ред.</MenuItem>
                <MenuItem key="3" onClick={() => handleClickDelete(id)}>Удалить</MenuItem>
            </div>
        </Menu>
    }

    if (isLoading) return <Spinner isLoading={isLoading} />;

    return <div className={cn('admin-books pages', { 'pages_offset': activeModule === ACTIVE_MODULE.admin })}>
        <h4>Авторы</h4>
        <Modal onAfterOpen={handleAfterOpen} onAfterClose={handleAfterClose} isOpen={modalIsOpen} onRequestClose={closeModal} style={customStyles} contentLabel="Example Modal">
            <div className="admin-books__modal-title">Если вы удалите автора, то это появляет на книги, у них пропадет автор. <br/> Вы точно хотите удалить автора?</div>
            <div className="admin-books__modal-btns">
                <Button className="admin-books__modal-btn admin-books__modal-btn_cancel" onClick={closeModal}>Отмена</Button>
                <Button className="admin-books__modal-btn" onClick={handleConfirmDelete}>Подтвердить</Button>
            </div>
        </Modal>
        <Table columns={columns} data={data} />
    </div>
}

export default AdminAuthors;