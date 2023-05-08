import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import HTMLFlipBook from 'react-pageflip';
import { pdfjs, Document, Page as ReactPdfPage } from 'react-pdf/dist/esm/entry.webpack5';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

import { present } from 'src/lib/RamdaHelpers.js';

import BookRepository from 'src/repositories/BookRepository.js';

import Button from 'src/components/UI/Button.jsx';
import Spinner from 'src/components/UI/Spinner.jsx';

const width = 400;
const height = 733;

const Page = React.forwardRef(({ pageNumber }, ref) => {
    return <div ref={ref}>
        <ReactPdfPage pageNumber={pageNumber} width={width} />
    </div>;
});

function Reader({ filePdf }) {
    const params = useParams();

    const { id } = params;
    const [numPages, setNumPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);
    const [file, setFile] = useState({});
    const [isLoading, setLoading] = useState(false);
    const book = useRef(null);

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

    if (isLoading) return <Spinner isLoading={isLoading} text="Идет загрузка книги..." />;

    return <div className="reader">
        { present(file)
            ? <Document file={fileName} loading=''  onLoadSuccess={onDocumentLoadSuccess}>
                <HTMLFlipBook width={400} height={533} usePortrait={false} ref={book} onFlip={handleFlip}>
                    { renderPages() }
                </HTMLFlipBook>
            </Document>
            : null
        }
        <div className="reader__actions">
            <Button className="reader__actions-btn" onClick={handleFlipPrev}>Предыдущая страница</Button>
            <CircularProgressbar className="reader__actions-progress" value={currentPage} maxValue={numPages} text={`${Math.round((currentPage / numPages) * 100)}%`} />
            <Button className="reader__actions-btn" onClick={handleFlipNext}>Следующая страница</Button>
        </div>
    </div>;
}

export default Reader;