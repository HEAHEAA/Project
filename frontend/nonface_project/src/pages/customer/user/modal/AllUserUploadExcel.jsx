import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import {FaDownload} from "react-icons/fa6";
import Button from "@mui/material/Button";
import * as Excel from "exceljs/dist/exceljs.min";
import {saveAs} from "file-saver";
import {useContext} from "react";
import {LoginContext} from "../../../../api/login/LoginContext.jsx";
import axios from "axios";


// 데이터 배열
const list = [
    {
        id: 1,
        groupId: "영진기술",
        userId: "ID",
        userName: "name",
        phone: "010-1234-5678",
        email: "abc@naver.com",
        sms: true,
        alarm: false
    }
];


// TH에 들어갈 텍스트 데이터
const headers = ["번호", "조직사 아이디", "사용자 이름", "사용자 아이디", "연락처", "이메일" ,"sms 알람 사용 여부", "개인정보 활용 동의 여부"];
// TH width, 단위는 cell의 width나 height 단위는 픽셀이 아닌 엑셀의 너비 기준이다.
const headerWidths = [15,15,15,15,15,15,15,15];

function AllUserUploadExcel({open, handleClose}) {
    const {RefreshToken} = useContext(LoginContext);


    const style = {
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
    };

    const darkTheme = createTheme({
        typography: {
            fontFamily: 'SUITE-Regular',
            fontWeight: 300
        }
    });



    const downloadList = async (rows) => {
        try {
            const wb = new Excel.Workbook();

            const sheet = wb.addWorksheet("사용자 일괄등록 양식");


            const headerRow = sheet.addRow(headers);

            headerRow.height = 25.75;

            headerRow.eachCell((cell, colNum) => {
                styleHeaderCell(cell);
                sheet.getColumn(colNum).width = headerWidths[colNum - 1];
            });


            rows.forEach(({id, groupId, userId,userName, phone, email, sms, alarm}) => {
                const rowDatas = [id, groupId, userId,userName, phone, email, sms, alarm];
                const appendRow = sheet.addRow(rowDatas);

                appendRow.eachCell((cell, colNum) => {
                    styleDataCell(cell, colNum);
                    if (colNum === 1) {
                        cell.font = {
                            color: {argb: "ff1890ff"},
                        };
                    }
                    if (colNum === 3) {
                        cell.numFmt = "0,000";
                    }
                });
            });

            // 파일 생성
            const fileData = await wb.xlsx.writeBuffer();
            const blob = new Blob([fileData], {
                type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            });
            saveAs(blob, `사용자 일괄등록 양식`);
        } catch (error) {
            console.log(error);
        }
    };




    const onSubmit = async (e) => {
        e.preventDefault();
        e.persist();

        RefreshToken();

        let files = e.target.files.files;
        let formData = new FormData();


        formData.append("file", files[0]);

        const post = await axios({
            method: "POST",
            url: "/api/excel/upload/users",
            mode: "cors",
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: 'Bearer ' + localStorage.getItem("login"),
            },
            data: formData,
        });

        alert('업로드가 완료 되었습니다 !');
        handleClose();
    }





    return (
        <ThemeProvider theme={darkTheme}>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style} className="all-upload-user-modal">
                    <Typography id="modal-modal-title" variant="h5" component="h2">
                        <strong> 일괄 등록 양식 다운로드</strong>
                    </Typography>
                    <br/>

                    <Button
                        variant="outlined"
                        color={"success"}
                        fullWidth
                        onClick={()=>{
                            downloadList(list)
                        }}
                    >양식 다운로드 <FaDownload/>
                    </Button>
                    <br/>
                    <br/>
                    <p>① 양식 다운로드</p>
                    <p>② 일괄등록 할 사용자 양식 작성</p>
                    <p>③ 하단 파일 등록</p>
                    <p>④ 완료 !</p>
                    <br/>

                    <hr/>
                    <Typography id="modal-modal-title" variant="h5" component="h2">
                        <strong>B. 일괄 업로드</strong>
                    </Typography>
                    <br/>

                    <form onSubmit={(e) => onSubmit(e)}>
                        <input type={"file"} id="files"/>

                        <Button variant="contained" fullWidth type={"submit"} sx={{marginTop: 1}}>업로드 !</Button>
                    </form>

                    <br/>


                </Box>
            </Modal>
        </ThemeProvider>
    )
}


const styleHeaderCell = (cell) => {

};

const styleDataCell = (cell) => {

};


export default AllUserUploadExcel;