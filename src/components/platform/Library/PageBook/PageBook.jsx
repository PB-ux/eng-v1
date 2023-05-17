import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import cn from 'classnames';

import { ACTIVE_MODULE } from 'src/components/constansts/activeModuleConstant.js';

import { present } from 'src/lib/RamdaHelpers.js';

import BookRepository from 'src/repositories/BookRepository.js';

import Button from 'src/components/UI/Button.jsx';
import LevelBook from 'src/components/UI/LevelBook.jsx';
import Spinner from 'src/components/UI/Spinner.jsx';

import EmptyCover from 'src/assets/empty-cover.jpg';

function PageBook({}) {
  const params = useParams();
  const navigate = useNavigate();
  const activeModule = useSelector((state) => state.activeModule.activeModule);

  const { id } = params;
  const [infoBook, setInfoBook] = useState([]);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    setTimeout(() => {
      BookRepository.getBook(id)
          .then((response) => {
            setInfoBook(response.book);
            setLoading(false);
          }).catch((e) => console.log(e));
    }, 1000);
  }, []);

  const handleClickRead = () => {
    navigate(`/book/read/${id}`)
  }

  if (isLoading) return <Spinner isLoading={isLoading} />

  return <div className={cn('page-book pages', { 'pages_offset': activeModule === ACTIVE_MODULE.categoryBooks })}>
    <div className="page-book__cover">
      <img src={ infoBook.cover ? `http://localhost:5000/${infoBook.cover}` : EmptyCover } alt="book cover" className="page-book__cover-img"/>
    </div>
    <div className="page-book__content">
      { present(infoBook.level) ? <LevelBook level={infoBook.level.title}></LevelBook> : null }
      <div className="page-book__name">
        <h2>{infoBook.title}</h2>
      </div>
      <div className="page-book__description">
        <p>
          {infoBook.description}
        </p>
      </div>
      <Button className="page-book__button" onClick={handleClickRead}>Читать онлайн</Button>
    </div>
  </div>
}

export default PageBook;