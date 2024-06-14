function BooksCommend({summary}) {
    return (
        <div>
            <div className="book-content-head">요약 추천</div>
            <div className="book-contetn-body">
                {summary}
            </div>
        </div>
    )
}

export default BooksCommend;