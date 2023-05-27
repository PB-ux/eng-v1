const validate = values => {
    const errors = {}
    if (!values.title) {
        errors.title = 'Это поле обязательное!'
    }
    if (!values.level) {
        errors.level = 'Это поле обязательное!'
    }
    if (!values.review) {
        errors.review = 'Это поле обязательное!'
    }
    if (!values.questions || !values.questions.length) {
        errors.questions = { _error: 'Необходимо ввести хотя бы один вопрос' }
    } else {
        const questionsArrayErrors = []
        values.questions.forEach((question, questionIndex) => {
            const questionErrors = {}
            if (!question || !question.question) {
                questionErrors.question = 'Это поле обязательное!'
                questionsArrayErrors[questionIndex] = questionErrors
            }
            if (!question.questionType) {
                questionErrors.questionType =  'Это поле обязательное!';
                questionsArrayErrors[questionIndex] = questionErrors;
            }

            if (!question.point) {
                questionErrors.point = 'Это поле обязательное!';
                questionsArrayErrors[questionIndex] = questionErrors;
            }

            if (!question.messageForCorrectAnswer) {
                questionErrors.messageForCorrectAnswer = 'Это поле обязательное!';
                questionsArrayErrors[questionIndex] = questionErrors;
            }

            if (!question.messageForIncorrectAnswer) {
                questionErrors.messageForIncorrectAnswer = 'Это поле обязательное!';
                questionsArrayErrors[questionIndex] = questionErrors;
            }

            if (!question.explanation) {
                questionErrors.explanation = 'Это поле обязательное!';
                questionsArrayErrors[questionIndex] = questionErrors;
            }

            if (!question.correctAnswer) {
                questionErrors.correctAnswer = 'Это поле обязательное!';
                questionsArrayErrors[questionIndex] = questionErrors;
            }

            if (question && question.answers && question.answers.length) {
                const answerArrayErrors = []
                question.answers.forEach((answer, answerIndex) => {
                    if (!answer || !answer.length) {
                        answerArrayErrors[answerIndex] = 'Это поле обязательное!'
                    }
                })

                if (answerArrayErrors.length) {
                    questionErrors.answers = answerArrayErrors
                    questionsArrayErrors[questionIndex] = questionErrors
                }

                if (question.answers.length > 4) {
                    if (!questionErrors.answers) {
                        questionErrors.answers = []
                    }
                    questionErrors.answers._error = 'Нельзя ввести больше 4-х вопросов'
                    questionsArrayErrors[questionIndex] = questionErrors
                }
                if (!question.correctAnswer){
                    questionErrors.correctAnswer =  'Это поле обязательное!';
                    questionsArrayErrors[questionIndex] = questionErrors;
                }
            }

            if (!question.answers || question.answers.length === 0) {
                if (!questionErrors.answers) {
                    questionErrors.answers = []
                }
                questionErrors.answers._error = 'Необходимо ввести хотя бы один вопрос'
                questionsArrayErrors[questionIndex] = questionErrors
            }

        })

        if (questionsArrayErrors.length) {
            errors.questions = questionsArrayErrors
        }
    }
    return errors
}

export default validate