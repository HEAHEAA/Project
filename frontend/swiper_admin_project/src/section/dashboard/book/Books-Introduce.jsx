function BooksIntroduce({content}) {

    return (
        <div>
            <div className="book-content-head">책 소 개</div>
            <div className="book-contetn-body">
                {content}
            </div>
        </div>
    )
}

export default BooksIntroduce;