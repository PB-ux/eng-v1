import React, { useState, useEffect } from 'react';
import cn from "classnames";
import {ACTIVE_MODULE} from "src/components/constansts/activeModuleConstant";
import { useNavigate } from "react-router-dom";
import {useSelector} from "react-redux";
import Modal from "react-modal";
import Button from "src/components/UI/Button.jsx";
import Table from "src/components/UI/Table.jsx";
import Menu, {MenuItem} from "rc-menu";
import Dropdown from "src/components/UI/Dropdown.jsx";
import Spinner from "src/components/UI/Spinner.jsx";
import LevelCard from "src/components/UI/LevelCard.jsx";

import { BiDotsHorizontalRounded } from 'react-icons/Bi';
import { GrView } from 'react-icons/Gr';
import { CiEdit } from 'react-icons/Ci';
import { RiDeleteBin2Line } from 'react-icons/Ri';
import ExerciseRepository from "src/repositories/ExerciseRepository";

const getExercises = (exercises) => {
    return exercises.map((item) => {
        return {
            id: item.id,
            title: item.title,
            review: item.review,
            numberQuestions: item.numberQuestions,
            level: item.level,
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

function AdminExercises(props) {
    const activeModule = useSelector((state) => state.activeModule.activeModule);
    const navigate = useNavigate();

    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [isLoading, setLoading] = useState(false);
    const [exercises, setExercises] = useState([]);
    const [idExercise, setId] = useState(null);

    const data = getExercises(exercises);

    const columns = React.useMemo(
        () => [
            {
                Header: 'Название',
                accessor: 'title',
            },
            {
                Header: 'Описание',
                accessor: 'review',
            },
            {
                Header: 'Кол. вопр.',
                accessor: 'numberQuestions',
            },
            {
                Header: 'Уровень',
                Cell: ({row}) => (
                    <LevelCard level={row.original.level.title} />
                ),
                accessor: 'level',
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
            ExerciseRepository.getExercises()
                .then(({ exercises }) => {
                    setExercises(exercises);
                    setLoading(false);
                })
        }, 1000);
    }, []);

    const handleClickView = (id) => {
        navigate(`/admin/exercise/${id}`);
    }

    const handleClickEdit = (id) => {
        navigate(`/admin/exercise/update/${id}`);
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

    const handleClickDelete = (id) => {
        setModalIsOpen(true);
        setId(id);
    }

    const handleConfirmDelete = () => {
        const copyExercises = [...exercises];
        const filterExercises = copyExercises.filter((item) => item.id != idExercise);
        setExercises(filterExercises);

        setLoading(true);
        closeModal();
        setTimeout(() => {
            ExerciseRepository.deleteExercise(idExercise)
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
                <GrView />
                <CiEdit />
                <RiDeleteBin2Line className="admin-books__menu-icons_red" />
            </div>
            <div className="admin-books__menu-items">
                <MenuItem key="1" onClick={() => handleClickView(id)}>Посмотреть</MenuItem>
                <MenuItem key="2" onClick={() => handleClickEdit(id)}>Ред.</MenuItem>
                <MenuItem key="3" onClick={() => handleClickDelete(id)}>Удалить</MenuItem>
            </div>
        </Menu>
    }

    if (isLoading) return <Spinner isLoading={isLoading} />

    return <div className={cn('admin-exercise pages', { 'pages_offset': activeModule === ACTIVE_MODULE.admin })}>
        <h4>Упражнения по грамматике</h4>
        <Modal onAfterOpen={handleAfterOpen} onAfterClose={handleAfterClose} isOpen={modalIsOpen} onRequestClose={closeModal} style={customStyles} contentLabel="Example Modal">
            <div className="admin-books__modal-title">Вы точно хотите удалить упражнение?</div>
            <div className="admin-books__modal-btns">
                <Button className="admin-books__modal-btn admin-books__modal-btn_cancel" onClick={closeModal}>Отмена</Button>
                <Button className="admin-books__modal-btn" onClick={handleConfirmDelete}>Подтвердить</Button>
            </div>
        </Modal>
        <Table columns={columns} data={data} />
    </div>
}

export default AdminExercises;