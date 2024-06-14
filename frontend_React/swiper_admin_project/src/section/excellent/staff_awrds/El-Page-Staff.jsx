import {FiSearch} from "react-icons/fi";
import Button from "@mui/material/Button";
import {AssignmentInd, Clear} from "@mui/icons-material";
import {useContext, useState} from "react";
import {DeleteModal} from "../../../components/modal/delete-modal.jsx";
import AddStaffModal from "./AddStaff-Modal.jsx";
import {ElImgContext} from "../../../context/excellent/El-Img-Context.jsx";
import {ElAwardImgContext} from "../../../context/excellent/El-Award-Img-Context.jsx";
import {Avatar} from "@mui/material";

function ElPageStaff() {
    const {elAwardDelete, imgAURL} = useContext(ElAwardImgContext);
    const {elStaffDelete, imgURL} = useContext(ElImgContext);
    // 검색용
    const [filter, setFilter] = useState('');

    //우수직원 추가 이벤트
    const [addModal, setAddModal] = useState(false);
    const handleOpen = () => setAddModal(true);
    const handleClose = () => setAddModal(false);





    let imgUrlData = [];
    for(let i  = 0; i<imgURL.length; i++){
       for(let j = 0; j<imgAURL.length; j++){
           if(i === j){
               imgUrlData.push({
                   staffId: imgURL[i]?.ex_em_idx,
                   staffImgUrl: imgURL[i]?.ex_em_picture,
                   staffName: imgURL[i]?.ex_em_name,
                   staffPart: imgURL[i]?.ex_em_part,
                   awardId: imgAURL[j]?.ea_idx,
                   awardImgUrl: imgAURL[j]?.ea_picture
               })
           }
       }
    }


    return (
        <div>
            {/*모달*/}
            <AddStaffModal
                addModal={addModal}
                handleClose={handleClose}
            />

            <DeleteModal/>
            {/*모달*/}

            <div className="notice-search-header">
                <div className="list-search">
                    <div className="box">
                        <div className="container-1">
                            <span className="icon"><FiSearch/></span>
                            <input
                                type="search"
                                id="search"
                                placeholder="Search.."
                                value={filter}
                                onChange={(e) => {
                                    const inputValue = e.target.value;
                                    setFilter(inputValue);
                                }}
                            />
                        </div>
                    </div>
                </div>

                <Button variant="contained" sx={{float: 'right'}} onClick={()=>{
                    handleOpen();
                }}>
                    우수사원/시상식 추가 &nbsp; <AssignmentInd/>
                </Button>
            </div>

            <hr color="#f1f1f1"/>

            {
                imgUrlData
                    .filter((datas) => {
                        const title = datas?.staffName.toLowerCase();
                        const input = filter.toLowerCase();
                        return title.includes(input);
                    })
                    .map((el,inx) => (
                        <div className="excellent-user-card" key={el.staffName}>
                            <Button variant="contained" color={"error"} onClick={() => {
                                if(window.confirm('정말 삭제하시겠습니까?')) {
                                    elStaffDelete(el.staffId);
                                    elAwardDelete(el.awardId);
                                }
                            }}>
                                <Clear/>
                            </Button>
                            <div className="excellent-user-img">

                                <Avatar
                                    alt="Remy Sharp"
                                    src={el.staffImgUrl}
                                    sx={{width: 120, height: 120, position: "absolute",backgroundColor: "white"}}
                                    className="excellent-staff-img"
                                />

                                <div className="excellent-user-img-div">
                                    <img src={el?.awardImgUrl} alt="profile-img"/>
                                </div>
                            </div>

                            <h2>{el.staffPart}</h2>
                            <h1>{el.staffName}</h1>
                        </div>
                    ))
            }
            <br/>
            <br/>
            <br/>

        </div>
    )
}

export default ElPageStaff;
