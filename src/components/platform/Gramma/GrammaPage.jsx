import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import cn from 'classnames';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import Quiz from 'react-quiz-component';

import { ACTIVE_MODULE } from 'src/components/constansts/activeModuleConstant';

import { present } from 'src/lib/RamdaHelpers.js';

import TheoryRepository from 'src/repositories/TheoryRepository.js';

import Button from 'src/components/UI/Button.jsx';
import Spinner from 'src/components/UI/Spinner.jsx';
import MDEditor from "@uiw/react-md-editor";

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

const quiz =  {
    appLocale,
    "quizTitle": "Adjectives (Прилагательные в английском языке)",
    "quizSynopsis": "Прилагательное (Adjective) – это самостоятельная часть речи, которая указывает на признак лица, предмета или понятия и отвечает на вопрос «какой?». В английском языке они не имеют категории рода и числа, поэтому не меняют своей формы. Прилагательные чаще всего используются с существительными и в предложениях выступают определением или именной частью составного сказуемого.",
    "nrOfQuestions": "4",
    "questions": [
        {
            "question": "Что такое производные прилагательные (derivative adjectives)",
            "questionType": "text",
            "answerSelectionType": "single",
            "answers": [
                "Это прилагательные образованы от других частей речи, в основном от глаголов",
                "Прилагательные образованые путем слияния двух или более основ",
                "Прилагательные, которые состоят из одного корня без ",
            ],
            "correctAnswer": "1",
            "messageForCorrectAnswer": "Правильные ответ. Хорошая работа.",
            "messageForIncorrectAnswer": "Неверный ответ. Попробуйте снова.",
            "explanation": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
            "point": "20"
        },
    ],
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

    const [isLoading, setLoading] = useState(false);
    const [tabIndex, setTabIndex] = useState(0);
    const [theory, setTheory] = useState({});

    let exercise;
    if (present(theory)) exercise = getQuestions(theory.exercise);

    useEffect(() => {
        setLoading(true);
        TheoryRepository.getTheory(id)
            .then((response) => {
                const { theory } = response;
                setTheory(theory);
                setLoading(false);
            }).catch((e) => console.log(e));
    }, []);

    const handleNavigate = () => {
        navigate('/gramma');
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
            <Button className="quiz-result__btn" onClick={handleNavigate}>Перейти к разделу с грамматикой</Button>
        </div>;
    }

    if (isLoading) return <Spinner isLoading={isLoading} />

    return <div  className={cn('gramma pages', { 'pages_offset': activeModule === ACTIVE_MODULE.gramma })}>
        <h4 className="gramma__title">Adjectives (Прилагательные в английском языке)</h4>
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