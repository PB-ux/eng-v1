import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import cn from 'classnames';

import { ACTIVE_MODULE } from 'src/components/constansts/activeModuleConstant.js';

const quiz =  {
    "quizTitle": "Adjectives (Прилагательные в английском языке)",
    "quizSynopsis": "Прилагательное (Adjective) – это самостоятельная часть речи, которая указывает на признак лица, предмета или понятия и отвечает на вопрос «какой?». В английском языке они не имеют категории рода и числа, поэтому не меняют своей формы. Прилагательные чаще всего используются с существительными и в предложениях выступают определением или именной частью составного сказуемого.",
    "nrOfQuestions": "1",
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

function AdminExercise(props) {
    const activeModule = useSelector((state) => state.activeModule.activeModule);
    const params = useParams();
    const { id } = params;

    const renderQuestion = () => {
        const { questions } = quiz;
        const elementQuestions = questions.map((item, index) => {
            const { answers, correctAnswer, question, messageForCorrectAnswer, messageForIncorrectAnswer, point } = item;
            const titleQuestion = `В${index+1}: ${question}`;

            const allAnswers = answers.map((answer, index) => <div key={index} className={cn('quiz-result__answer', { 'quiz-result__answer_correct': index === correctAnswer - 1})}>{answer}</div>);

            return <div className="quiz-result__answers" key={index}>
                <h4 className="quiz-result__question">{titleQuestion}</h4>
                {allAnswers}
                <div className="quiz-result__explanation">{messageForCorrectAnswer}</div>
                <div className="quiz-result__explanation">{messageForIncorrectAnswer}</div>
                <div>Количество очков за вопрос: {point}</div>
            </div>
        });

        return <div className="quiz-result">
            {elementQuestions}
        </div>;
    }

    return <div className={cn('page-theory pages', { 'pages_offset': activeModule === ACTIVE_MODULE.admin })}>
        <h4>{quiz.quizTitle}</h4>
        <div>{quiz.quizSynopsis}</div>
        <div className="quiz__count-questions">Количество вопросов: {quiz.nrOfQuestions}</div>
        { renderQuestion() }
    </div>;
}

export default AdminExercise;