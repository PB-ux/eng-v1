import React from 'react';

function enumerate(num, dec) {
    if (num > 100) num = num % 100;
    if (num <= 20 && num >= 10) return dec[2];
    if (num > 20) num = num % 10;
    return num === 1 ? dec[0] : num > 1 && num < 5 ? dec[1] : dec[2];
}

const dec = ['книга', 'книги', 'книг']
const decCompleted = ['прочтена', 'прочтены', 'прочтено'];

function StatisticAccount({ statistic, countBooks }) {
    const startedBooks = statistic.filter((item) => item.current_books.status === 'start');
    const completedBooks = statistic.filter((item) => item.current_books.status === 'completed');
    const percentageBooksCompleted = Math.round((completedBooks.length * 100) / countBooks);
    const percentageBooksStarted = Math.round((startedBooks.length * 100) / countBooks);

    return <div className="statistic-book">
        <h5 className="statistic-book__title">Статистика по книгам</h5>
        <div className="statistic-book__area">
            <div className="statistic-book__area-small">
                <span className="statistic-book__count-book">
                    {completedBooks.length} <br /> {enumerate(completedBooks.length, dec)} <br /> {enumerate(completedBooks.length, decCompleted)}
                </span>
            </div>
        </div>
        <div className="statistic-book__note">
            <div className="statistic-book__note-content">
                <div className="statistic-book__note-circle"></div>
                <div className="statistic-book__note-text">
                    {percentageBooksCompleted}% <br />
                    <span>прочтено</span>
                </div>
            </div>
            <div className="statistic-book__note-content">
                <div className="statistic-book__note-circle"></div>
                <div className="statistic-book__note-text">
                    {percentageBooksStarted}% <br />
                    <span>начали читать</span>
                </div>
            </div>
        </div>
    </div>
}

export default StatisticAccount;