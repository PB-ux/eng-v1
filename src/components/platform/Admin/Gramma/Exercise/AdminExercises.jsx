import React, { useState } from 'react';
import cn from "classnames";
import {ACTIVE_MODULE} from "src/components/constansts/activeModuleConstant";
import { useNavigate } from "react-router-dom";
import {useSelector} from "react-redux";
import Modal from "react-modal";
import Button from "src/components/UI/Button.jsx";
import Table from "src/components/UI/Table.jsx";
import Menu, {MenuItem} from "rc-menu";
import Dropdown from "src/components/UI/Dropdown.jsx";
import LevelCard from "src/components/UI/LevelCard.jsx";

import { BiDotsHorizontalRounded } from 'react-icons/Bi';
import { GrView } from 'react-icons/Gr';
import { CiEdit } from 'react-icons/Ci';
import { RiDeleteBin2Line } from 'react-icons/Ri';

const quiz = [{
    "id": 1,
    "quizTitle": "Adjectives (Прилагательные в английском языке)",
    "quizSynopsis": "Прилагательное (Adjective) – это самостоятельная часть речи, которая указывает на признак лица, предмета или понятия и отвечает на вопрос «какой?». В английском языке они не имеют категории рода и числа, поэтому не меняют своей формы. Прилагательные чаще всего используются с существительными и в предложениях выступают определением или именной частью составного сказуемого.",
    "nrOfQuestions": "4",
}];

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

function AdminExercises(props) {
    const activeModule = useSelector((state) => state.activeModule.activeModule);
    const navigate = useNavigate();

    const [modalIsOpen, setModalIsOpen] = useState(false);

    const columns = React.useMemo(
        () => [
            {
                Header: 'Название',
                accessor: 'quizTitle',
            },
            {
                Header: 'Описание',
                accessor: 'quizSynopsis',
            },
            {
                Header: 'Количество вопросов',
                accessor: 'nrOfQuestions',
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

    const handleClickView = (id) => {
        navigate(`/admin/exercise/${id}`);
    }

    const handleClickEdit = (id) => {
        navigate(`/admin/book/update/${id}`);
    }

    const closeModal = () => {
        setModalIsOpen(false);
    }

    const handleAfterOpen = () => {
        document.body.style.overflow = 'hidden';
    }

    const handleAfterClose = () => {
        document.body.style.overflow = 'auto';
    }

    const renderActions = (id) => {
        return <Menu>
            <div className="admin-books__menu-icons">
                <GrView />
                <CiEdit />
                <RiDeleteBin2Line className="admin-books__menu-icons_red" />
            </div>
            <div className="admin-books__menu-items">
                <MenuItem key="1" onClick={() => handleClickView(id)}>Посмотреть</MenuItem>
                <MenuItem key="2" onClick={() => handleClickEdit(id)}>Ред.</MenuItem>
                <MenuItem key="3">Удалить</MenuItem>
            </div>
        </Menu>
    }

    return <div className={cn('admin-exercise pages', { 'pages_offset': activeModule === ACTIVE_MODULE.admin })}>
        <h4>Упражнения по грамматике</h4>
        <Modal onAfterOpen={handleAfterOpen} onAfterClose={handleAfterClose} isOpen={modalIsOpen} onRequestClose={closeModal} style={customStyles} contentLabel="Example Modal">
            <div className="admin-books__modal-title">Вы точно хотите удалить упражнение?</div>
            <div className="admin-books__modal-btns">
                <Button className="admin-books__modal-btn admin-books__modal-btn_cancel" onClick={closeModal}>Отмена</Button>
                <Button className="admin-books__modal-btn">Подтвердить</Button>
            </div>
        </Modal>
        <Table columns={columns} data={quiz} />
    </div>
}

export default AdminExercises;