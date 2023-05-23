import React, { useState, useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import cn from 'classnames';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import Quiz from 'react-quiz-component';

import { ACTIVE_MODULE } from 'src/components/constansts/activeModuleConstant';

import { present, isBlank } from 'src/lib/RamdaHelpers.js';

import { addPoints } from "src/store/asyncActions/users";

import TheoryRepository from 'src/repositories/TheoryRepository.js';

import Button from 'src/components/UI/Button.jsx';
import Spinner from 'src/components/UI/Spinner.jsx';
import MDEditor from "@uiw/react-md-editor";
import ExerciseRepository from "src/repositories/ExerciseRepository";
import { BsFillCheckCircleFill } from "react-icons/Bs";
import Tooltip from "rc-tooltip";

const appLocale = {
    "landingHeaderText": "<questionLength> Вопросы",
    "question": "Вопроса",
    "startQuizBtn": "Начните тестирование",
    "resultFilterAll": "Все",
    "resultFilterCorrect": "Правильно",
    "resultFilterIncorrect": "Неверно",
    "prevQuestionBtn": "Предыдущий",
    "nextQuestionBtn": "Следующий",
    "resultPageHeaderText": "Вы закончили тест.",
    "answerSelectionType": "Один",
    "singleSelectionTagText": "Одиночный выбор",
    "multipleSelectionTagText": "Множественный выбор",
    "pickNumberOfSelection": "Выбран <numberOfSelection>",
    "resultPagePoint": "Вы набрали <correctPoints> из <totalPoints> баллов"
}

const getQuestions = (quiz) => {
    return {
        appLocale,
        quizTitle: quiz.title,
        nrOfQuestions: quiz.numberQuestions,
        quizSynopsis: quiz.review,
        questions: quiz.questions,
    }
}

function GrammaPage(props) {
    const params = useParams();
    const { id } = params;
    const activeModule = useSelector((state) => state.activeModule.activeModule);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.user);

    const [isLoading, setLoading] = useState(false);
    const [tabIndex, setTabIndex] = useState(0);
    const [theory, setTheory] = useState({});
    const [currentExercise, setCurrentExercise] = useState([]);

    let exercise;
    if (present(theory)) exercise = getQuestions(theory.exercise);

    const filterCurrentExercise = currentExercise.filter((item) => item.id === +id && item.current_exercises.status === 'completed');
    console.log(filterCurrentExercise);
    console.log('current', currentExercise);

    useEffect(() => {
        setLoading(true);
        TheoryRepository.getTheory(id)
            .then((response) => {
                const { theory } = response;
                setTheory(theory);
                setLoading(false);
            }).catch((e) => console.log(e));
    }, []);

    useEffect(() => {
        const params = { userId: user.id };

        if (present(user)) {
            ExerciseRepository.getCurrentExercise(params)
                .then(({ user } ) => {
                    const { currentExercise } = user;
                    setCurrentExercise(currentExercise);
                }).catch((e) => console.log(e));
        }
    }, [user]);

    const handleClickFinishQuiz = (points) => {
        const totalPoints = { points: points }
        const params = { userId: user.id, exerciseId: id };

        if (isBlank(filterCurrentExercise)) {
            ExerciseRepository.addCurrentExercise(params)
                .then((response) => {
                    console.log(response);
                }).catch((e) => console.log(e));

            dispatch(addPoints(totalPoints));
        }

        navigate('/gramma');
    }

    const renderOverlayCompleted = () => {
        return <div>
            Это урок вы уже прошли
        </div>
    }

    const renderTitle = () => {
        return <div className="gramma__title-container">
            <div>{theory.title}</div>
            <div className="gramma__title-icon">
                <BsFillCheckCircleFill />
            </div>
        </div>;
    }

    const renderCustomResultPage = (obj) => {
       const { questions, correctPoints, totalPoints, } = obj;

       const elementQuestions = questions.map((item, index) => {
           const { answers, correctAnswer, question } = item;
           const titleQuestion = `В${index+1}: ${question}`;

           const allAnswers = answers.map((answer, index) => <div key={index} className={cn('quiz-result__answer', { 'quiz-result__answer_correct': index === correctAnswer - 1})}>{answer}</div>);

           return <div className="quiz-result__answers" key={index}>
               <h4 className="quiz-result__question">{titleQuestion}</h4>
               {allAnswers}
           </div>
       });

        return <div className="quiz-result">
            <h4 className="quiz-result__points">Вы набрали {correctPoints} из {totalPoints}</h4>
            {elementQuestions}
            <Button className="quiz-result__btn" onClick={() => handleClickFinishQuiz(Number(correctPoints))}>Завершить тестирование</Button>
        </div>;
    }

    if (isLoading) return <Spinner isLoading={isLoading} />

    return <div  className={cn('gramma pages', { 'pages_offset': activeModule === ACTIVE_MODULE.gramma })}>
        <h4 className="gramma__title">
            { present(filterCurrentExercise)
                ? <Tooltip overlay={renderOverlayCompleted}>
                    { renderTitle() }
                </Tooltip>
                : theory.title
            }
        </h4>
        <Tabs selectedIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
            <TabList>
                <Tab>Материал</Tab>
                <Tab>Упражнения</Tab>
            </TabList>

            <TabPanel>
                <div className="container" data-color-mode="light">
                    <MDEditor.Markdown source={theory.description} />
                </div>
            </TabPanel>
            <TabPanel>
                <Quiz quiz={exercise} showDefaultResult={false} customResultPage={renderCustomResultPage}/>
            </TabPanel>
        </Tabs>
    </div>;
}

export default GrammaPage;