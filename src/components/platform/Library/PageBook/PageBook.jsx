import React, { useState, useEffect } from 'react';
import {useNavigate, useParams} from 'react-router-dom';

import BookRepository from '../../../../repositories/BookRepository';

import Button from '../../../UI/Button.jsx';
import LevelBook from '../../../UI/LevelBook.jsx';

import BookPreview from '../../../../assets/page-book-cover.png';

function PageBook({}) {
  const params = useParams();
  const navigate = useNavigate();

  const { id } = params;
  const [infoBook, setInfoBook] = useState([]);

  useEffect(() => {
    BookRepository.getBook(id)
        .then((response) => {
          setInfoBook(response.book);
        }).catch((e) => console.log(e));
  }, []);

  const handleClickRead = () => {
    navigate(`/book/read/${id}`)
  }

  return <div className="page-book">
    <div className="page-book__cover">
      <img src={ infoBook.cover ? `http://localhost:5000/${infoBook.cover}` : BookPreview } alt="book cover" className="page-book__cover-img"/>
    </div>
    <div className="page-book__content">
      <LevelBook level={infoBook.level}></LevelBook>
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