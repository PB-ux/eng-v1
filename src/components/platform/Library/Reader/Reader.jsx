import React, { useEffect, useState } from 'react';
import HTMLFlipBook from 'react-pageflip';
import { pdfjs, Document, Page as ReactPdfPage } from 'react-pdf';

import FilePdf from '../../../../assets/sample-pdf-file.pdf';
import BookRepository from "../../../../repositories/BookRepository";
import {useNavigate, useParams} from "react-router-dom";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const width = 350;
const height = 733;

const Page = React.forwardRef(({ pageNumber }, ref) => {
    return <div ref={ref}>
        <ReactPdfPage scale={1.5} pageNumber={pageNumber} width={width} />
    </div>;
});

function Reader({filePdf}) {
    const params = useParams();

    const { id } = params;
    const [numPages, setNumPages] = useState(0);
    const [file, setFile] = useState({});
    const fileName = `http://localhost:5000/${file}`;

    useEffect(() => {
        BookRepository.getBook(id)
            .then((response) => {
                const { file } = response.book;
                setFile(file);
            }).catch((e) => console.log(e));
    }, []);

    const onDocumentLoadSuccess = ({ numPages }) => {
        setNumPages(numPages);
    }

    const renderPages = () => {
        const pages = [];

        for(let i = 1; i < numPages; i++) {
            pages.push(<Page pageNumber={i} />);
        }

        return pages;
    }

    return <div className="reader">
        <Document file={fileName} onLoadSuccess={onDocumentLoadSuccess}>
            <HTMLFlipBook width={500} height={height} usePortrait={false}>
                { renderPages() }
            </HTMLFlipBook>
        </Document>
    </div>;
}

export default Reader;