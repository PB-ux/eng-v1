import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Field, FieldArray, reduxForm, formValueSelector } from 'redux-form';
import validate from './validate';

import Button from 'src/components/UI/Button.jsx';

class QuizForm extends Component {

    renderInputField = ({ input, label, type, meta: { touched, error } }) => (
        <div>
            <label className="label mb-3">{label}</label>
            <div>
                <input className="input" {...input} type={type} placeholder={label} />
                {touched && error && <span>{error}</span>}
            </div>
        </div>
    );

    renderTextareaField = ({ input, label, type, meta: { touched, error } }) => (
        <div>
            <label className="label mb-3">{label}</label>
            <div>
                <textarea className="textarea" {...input} type={type} placeholder={label} />
                {touched && error && <span>{error}</span>}
            </div>
        </div>
    );

    renderSelectField = ({ input, label, type, meta: { touched, error }, children }) => (
        <div>
            <label>{label}</label>
            <div className="mb-3">
                <select {...input} >
                    {children}
                </select>
                {touched && error && <span>{error}</span>}
            </div>
        </div>
    );

    renderSelectQuestionTypeField = ({ input, label, type, meta: { touched, error }, children }) => (
        <div>
            <label>{label}</label>
            <div className="mb-3">
                <select {...input} >
                    {children}
                </select>
                {touched && error && <span>{error}</span>}
            </div>
        </div>
    );

    renderTextAnswers = ({ fields, question, meta: { error } }) => (
        <div>
            <Button type="button" onClick={() => fields.push()}>Добавить ответ</Button>
            {fields.map((answer, index) => (
                <div key={index}>
                    <Button className="mb-3" type="button" onClick={() => fields.remove(index)}>Удалить ответ</Button>
                    <Field
                        name={answer}
                        type="text"
                        component={this.renderInputField}
                        label={`Ответ #${index + 1}`}
                    />
                </div>
            ))}
            <div>
                <Field
                    name={`${question}.correctAnswer`}
                    component={this.renderSelectField}
                    label="Корретный ответ"
                >
                    <option value="">Выберите пожалуйста, корретный ответ</option>
                    {fields.map((answer, index) => (
                        <option key={index+1} value={index+1}>{`Ответ #${index + 1}`}</option>
                    ))}
                </Field>
            </div>

            {error && <div className="error">{error}</div>}
        </div>
    );

    renderQuestions = ({ fields, meta: { touched, error, submitFailed } }) => (
        <div>
            <Button className="mb-2" type="button" onClick={() => fields.push({})}>Добавить вопрос</Button>
            {(touched || submitFailed) && error && <span>{error}</span>}
            {fields.map((question, index) => (
                <div key={index}>
                    <Button className="mb-3" type="button" onClick={() => fields.remove(index)}>Удалить вопрос</Button>
                    <h4>Вопрос #{index + 1}</h4>
                    <Field
                        name={`${question}.question`}
                        type="text"
                        component={this.renderInputField}
                        label="Название вопроса"
                    />
                    <Field
                        name={`${question}.questionType`}
                        component={this.renderSelectQuestionTypeField}
                        label="Тип вопроса"
                    >
                        <option value="">Выберите пожалуйста тип вопроса</option>
                        <option value="text">Текст</option>
                    </Field>
                    <FieldArray name={`${question}.answers`} component={this.renderTextAnswers} question={question} />
                    <Field
                        name={`${question}.messageForCorrectAnswer`}
                        type="text"
                        component={this.renderTextareaField}
                        label="Сообщение для правильного ответа"
                    />
                    <Field
                        name={`${question}.messageForIncorrectAnswer`}
                        type="text"
                        component={this.renderTextareaField}
                        label="Сообщение для некорретного ответа"
                    />
                    <Field
                        name={`${question}.explanation`}
                        type="text"
                        component={this.renderTextareaField}
                        label="Объяснение"
                    />
                    <Field
                        name={`${question}.point`}
                        type="number"
                        component={this.renderInputField}
                        label="Очки"
                    />
                </div>
            ))}
        </div>
    );

    render() {

        const { handleSubmit, pristine, reset, submitting } = this.props;

        return (
            <div className="quiz-form">
                <form name="quiz-form" onSubmit={handleSubmit}>
                    <Field
                        name="quizTitle"
                        type="text"
                        component={this.renderInputField}
                        label="Название упраженения"
                    />
                    <Field
                        name="quizSynopsis"
                        type="text"
                        component={this.renderTextareaField}
                        label="Краткое описание упраженения"
                    />
                    <FieldArray name="questions" component={this.renderQuestions} />
                    <div className="quiz-form__btns">
                        <Button className="quiz-form__btn" type="submit" disabled={submitting}>Отправить</Button>
                        <Button className="quiz-form__btn" type="button" disabled={pristine || submitting} onClick={reset}>
                            Очистить форму
                        </Button>
                    </div>
                </form>
            </div>
        );
    }
}

QuizForm = reduxForm({
    form: 'quizForm',
    validate
})(QuizForm);

const selector = formValueSelector('quizForm');

QuizForm = connect(
    state => {
        const questions = selector(state, 'questions');
        const questionType = questions && questions.map(question => question.questionType);

        return { questionType: questionType }
    }
)(QuizForm)


export default QuizForm;