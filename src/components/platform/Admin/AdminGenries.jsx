import React, { useEffect, useState } from 'react';
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import cn from "classnames";
import Modal from "react-modal";
import Menu, {MenuItem} from "rc-menu";

import {ACTIVE_MODULE} from "src/components/constansts/activeModuleConstant";

import CategoryRepository from "src/repositories/CategoryRepository";

import Table from "src/components/UI/Table.jsx";
import Dropdown from "src/components/UI/Dropdown.jsx";
import Spinner from "src/components/UI/Spinner.jsx";
import Button from "src/components/UI/Button.jsx";

import { BiDotsHorizontalRounded } from 'react-icons/Bi';
import { CiEdit } from 'react-icons/Ci';
import { RiDeleteBin2Line } from 'react-icons/Ri';

const getTableData = (data) => {
    return data.map((item) => {
        return {
            id: item.id,
            title: item.title,
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

function AdminGenries(props) {
    const activeModule = useSelector((state) => state.activeModule.activeModule);
    const navigate = useNavigate();

    const [categories, setCategories] = useState([]);
    const [isLoading, setLoading] = useState(false);
    const [modalIsOpen, setIsOpen] = useState(false);
    const [idCategory, setId] = useState(null);

    const data = getTableData(categories);

    const columns = React.useMemo(
        () => [
            {
                Header: 'Название',
                accessor: 'title',
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
        [categories]
    );

    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            CategoryRepository.getOnlyCategories()
                .then((response) => {
                    const { categories } = response;
                    setCategories(categories);
                    setLoading(false);
                })
        }, 1000);
    }, []);

    const handleClickDelete = (id) => {
        setIsOpen(true);
        setId(id);
    }

    const handleClickEdit = (id) => {
        navigate(`/admin/genre/update/${id}`);
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
        const copyCategories = [...categories];
        const filterCategories = copyCategories.filter((item) => item.id != idCategory);
        setCategories(filterCategories);

        setLoading(true);
        closeModal();
        setTimeout(() => {
            CategoryRepository.deleteCategory(idCategory)
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
        <h4>Жанры</h4>
        <Modal onAfterOpen={handleAfterOpen} onAfterClose={handleAfterClose} isOpen={modalIsOpen} onRequestClose={closeModal} style={customStyles} contentLabel="Example Modal">
            <div className="admin-books__modal-title">Если вы удалите жанр, то это появляет на книги, у них пропадет жанр. <br/> Вы точно хотите удалить жанр?</div>
            <div className="admin-books__modal-btns">
                <Button className="admin-books__modal-btn admin-books__modal-btn_cancel" onClick={closeModal}>Отмена</Button>
                <Button className="admin-books__modal-btn" onClick={handleConfirmDelete}>Подтвердить</Button>
            </div>
        </Modal>
        <Table columns={columns} data={data} />
    </div>
}

export default AdminGenries;