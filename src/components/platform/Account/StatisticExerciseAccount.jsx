import React from 'react';

function enumerate(num, dec) {
    if (num > 100) num = num % 100;
    if (num <= 20 && num >= 10) return dec[2];
    if (num > 20) num = num % 10;
    return num === 1 ? dec[0] : num > 1 && num < 5 ? dec[1] : dec[2];
}

const dec = ['упражнение', 'упражнения', 'упражнений']
const decCompleted = ['выполнено', 'выполнены', 'выполнены'];

function StatisticExerciseAccount({ statistic, countBooks }) {
    const completeExercises = statistic.filter((item) => item.current_exercises.status === 'completed');
    const percentageBooksCompleted = Math.round((completeExercises.length * 100) / countBooks);

    return <div className="statistic-book statistic-exercise">
        <h5 className="statistic-book__title">Статистика по упражнениям</h5>
        <div className="statistic-book__area statistic-exercise__area">
            <div className="statistic-book__area-small statistic-exercise__area-small">
                <span className="statistic-book__count-book">
                    {completeExercises.length} <br /> {enumerate(completeExercises.length, dec)} <br /> {enumerate(completeExercises.length, decCompleted)}
                </span>
            </div>
        </div>
    </div>
}

export default StatisticExerciseAccount;