function BooksImg({img}) {

    return (
        <div className="content-img">
            <div className="content-img-div">
                <img src={img} alt="Book"/>
            </div>
        </div>
    )
}

export default BooksImg;