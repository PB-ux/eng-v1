import React, { useEffect, useState, useRef } from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useParams} from 'react-router-dom';
import HTMLFlipBook from 'react-pageflip';
import { pdfjs, Document, Page as ReactPdfPage } from 'react-pdf/dist/esm/entry.webpack5';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

import { present, isBlank } from 'src/lib/RamdaHelpers.js';

import BookRepository from 'src/repositories/BookRepository.js';

import Tooltip from 'src/components/UI/Tooltip.jsx';
import Button from 'src/components/UI/Button.jsx';
import Spinner from 'src/components/UI/Spinner.jsx';
import Success from 'src/components/UI/Success.jsx';
import UserRepository from "src/repositories/UserRepository";
import {addPoints} from "src/store/asyncActions/users";

const width = 400;
const height = 733;

const Page = React.forwardRef(({ pageNumber }, ref) => {
    return <div ref={ref}>
        <ReactPdfPage pageNumber={pageNumber} width={width} />
    </div>;
});

function Reader({ filePdf }) {
    const params = useParams();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.user);

    const { id } = params;
    const [numPages, setNumPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);
    const [file, setFile] = useState({});
    const [isLoading, setLoading] = useState(false);
    const [isSuccess, setSuccess] = useState(false);
    const [currentBooks, setCurrentBooks] = useState([]);
    const book = useRef(null);

    const filterBooks = currentBooks.filter((item) => item.id == id && item.current_books.status === 'completed');
    console.log(filterBooks)

    const fileName = `http://localhost:5000/${file}`;

    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            BookRepository.getBook(id)
                .then((response) => {
                    const { file } = response.book;
                    setFile(file);
                    setLoading(false);
                }).catch((e) => console.log(e));
        }, 1000);

        pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;
    }, []);

    useEffect(() => {
        const params = { userId: user.id };

        if (present(user)) {
            BookRepository.getCurrentBooks(params)
                .then((response) => {
                    const { booksCurrent } = response.user;
                    setCurrentBooks(booksCurrent);
                }).catch((e) => console.log(e));
        }
    }, [user]);

    const onDocumentLoadSuccess = ({ numPages }) => {
        setNumPages(numPages);
        setLoading(false);
    }

    const renderPages = () => {
        const pages = [];

        for(let i = 1; i < numPages; i++) {
            pages.push(<Page key={i} pageNumber={i} />);
        }

        return pages;
    }

    const handleFlipNext = () => {
        book.current.pageFlip().flipNext();
    }

    const handleFlipPrev = () => {
        book.current.pageFlip().flipPrev();
    }

    const handleFlip = (e) => {
        if (e.data === 0) {
            setCurrentPage(e.data);
        } else {
            setCurrentPage(e.data+2);
        }
    }

    const handleFinishBook = () => {
        const params = { userId: user.id, bookId: id };
        const points = { points: 10 };

        setTimeout(() => {
            BookRepository.completedCurrentBooks(params)
                .then((response) => {
                    console.log(response);
                }).catch((e) => console.log(e));
        }, 1000);

        if (isBlank(filterBooks)) dispatch(addPoints(points));

        setSuccess(true);
    }

    if (isLoading) return <Spinner isLoading={isLoading} text="Идет загрузка книги..." />;

    const renderOverlayFinishBook = () => {
        return <div>
            Завершите чтение, вам начислять очки за прочтенную книгу
        </div>
    }

    const renderFinishBook = () => {
        return <>
            { isBlank(filterBooks)
                ? <Tooltip overlay={renderOverlayFinishBook} visible={currentPage === numPages} placement="bottom">
                    <Button className="reader__actions-btn" onClick={handleFinishBook}>Закончить чтение</Button>
                </Tooltip>
                : <Button className="reader__actions-btn" onClick={handleFinishBook}>Закончить чтение</Button>
            }
        </>

    }

    if (isSuccess && isBlank(filterBooks)) {
        return <Success successText="Поздравляем, вы получили 10 очков!" successBtnText="Вернуться к книгам" link="/library"/>
    } else if (isSuccess && present(filterBooks)) {
        return <Success successText="Поздравляем, с повторным прочтением книги!" successBtnText="Вернуться к книгам" link="/library"/>
    }

    return <div className="reader">
        { present(file)
            ? <>
                <Document file={fileName} loading='' onLoadSuccess={onDocumentLoadSuccess}>
                <HTMLFlipBook className="flip-book" width={400} height={533} usePortrait={false} ref={book} onFlip={handleFlip}>
                    { renderPages() }
                </HTMLFlipBook>
            </Document>
            </>
            : null
        }
        { present(book.current)
            ? <div className="reader__actions">
                <Button className="reader__actions-btn" onClick={handleFlipPrev}>Предыдущая страница</Button>
                <CircularProgressbar className="reader__actions-progress" value={currentPage} maxValue={numPages} text={`${Math.round((currentPage / numPages) * 100)}%`} />
                { currentPage === numPages ? renderFinishBook() : <Button className="reader__actions-btn" onClick={handleFlipNext}>Следующая страница</Button> }
            </div>
            : null
        }
    </div>;
}

export default Reader;