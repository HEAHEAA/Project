import {Pagination} from "@mui/material";

const GroupNewsLayout = () => {
    return(
        <div>
            <div  className="group-news-section">
                <div className="group-news-section01">
                    img
                </div>
                <div className="group-news-section02">
                    img
                </div>
                <div className="group-news-section03">
                    img
                </div>
                <div className="group-news-section04">
                    <Pagination
                        count={10}
                        variant="outlined"
                        shape="rounded"
                        sx={{marginTop: 1, float: "right"}}
                        onChange={(e) => handlePage(e)}
                    />
                </div>
            </div>
        </div>
    )
}
export default GroupNewsLayout;
