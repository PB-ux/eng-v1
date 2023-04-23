import React from 'react';

import BookPreview from '../../../assets/page-book-cover.png';
import Button from '../../UI/Button.jsx';
import LevelBook from '../../UI/LevelBook.jsx';

function PageBook(props) {
  return <div className="page-book">
    <div className="page-book__cover">
      <img src={BookPreview} alt="book cover" className="page-book__cover-img"/>
    </div>
    <div className="page-book__content">
      <LevelBook level="A1"></LevelBook>
      <div className="page-book__name">
        <h2>The Lord of the Rings - Beginner</h2>
      </div>
      <div className="page-book__description">
        <p>
          Recounts the life and adventures of Robin Hood, who, with his band of followers,
          lived in Sherwood Forest as an outlaw dedicated to fighting tyranny. 
          Illustrated notes throughout the text explain the historical background of the story.<br />
          Recounts the life and adventures of Robin Hood, who, with his band of followers,
          lived in Sherwood Forest as an outlaw dedicated to fighting tyranny. 
          Illustrated notes throughout the text explain the historical background of the story.
        </p>
      </div>
      <Button className="page-book__button">Читать онлайн</Button>
    </div>
  </div>
}

export default PageBook;