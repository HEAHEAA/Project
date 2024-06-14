import {useContext, useState} from "react";
import {LoginContext} from "../../../../ContextServer/LoginContext";
import {KpiContext} from "../../../../ContextServer/KpiContext";
import * as React from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import {BiDownload} from "react-icons/bi";
import Grid from "@mui/material/Grid";
import FormControl from "@mui/material/FormControl";
import {MenuItem, Modal, Select} from "@mui/material";
import TextField from "@mui/material/TextField";
import ExcelAddModal from "../../chart/Modal/ExcelAddModal";
import Box from "@mui/material/Box";
import * as Excel from "exceljs/dist/exceljs.min";
import { saveAs } from "file-saver";
import Typography from "@mui/material/Typography";


// TH에 들어갈 텍스트 데이터
let list = [];
const headers = ["데이터구분", "날짜", "횟수"];
const headerWidths = [15, 15, 15];
function KpiAdminEdit(){
    const {category, setCategory, month, setMonth, count, setCount, PostKpi} = useContext(KpiContext);
    // category = 카테고리별
    // month  = 월별
    //count 횟수

    const onSelect = (e) => {
        setCategory(e.target.value);
    }

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);


    const [ExcelOpen, setExcelOpen] = React.useState(false);
    const handleExcelOpen = () => setExcelOpen(true);
    const handleExcelClose = () => setExcelOpen(false);



    const downloadList = async (rows) => {
        try {
            const wb = new Excel.Workbook();
            // sheet 생성
            const sheet = wb.addWorksheet("kpi 엑셀양식");

            // 상단 헤더(TH) 추가
            const headerRow = sheet.addRow(headers);
            // 헤더의 높이값 지정
            headerRow.height = 30.75;
            // 각 헤더 cell에 스타일 지정
            headerRow.eachCell((cell, colNum) => {
                styleHeaderCell(cell);
                sheet.getColumn(colNum).width = headerWidths[colNum - 1];
            });

            // 각 Data cell에 데이터 삽입 및 스타일 지정
            rows.forEach(({ orderNum, menu, price, date }) => {
                const rowDatas = [orderNum, menu, price, date];
                const appendRow = sheet.addRow(rowDatas);

                appendRow.eachCell((cell, colNum) => {
                    styleDataCell(cell, colNum);
                    if (colNum === 1) {
                        cell.font = {
                            color: "white" ,
                        };
                    }
                    if (colNum === 3) {
                        cell.numFmt = "0,000";
                    }
                });
            });

            // 파일 생성
            const fileData = await wb.xlsx.writeBuffer(); //writeBuffer는 프로미스를 반환하므로 async-await을 사용해야 한다.
            const blob = new Blob([fileData], {
                type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            });
            saveAs(blob, `kpi 엑셀양식`);
        } catch (error) {
            console.log(error);
        }
    };


    return(
        <div>
            <div className="userEdit">
                <div className="userEdit-5">

                    <Button sx={{float: "left",zIndex: 99999999999}} onClick={() => downloadList(list)}>
                        엑셀 양식 다운로드 &nbsp; <BiDownload/>
                    </Button>


                    <Button variant="contained" color={"success"} sx={{float: "right",zIndex: 9999999}} onClick={()=>{
                        handleExcelOpen();
                    }}>엑셀 다중등록</Button>
                </div>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={12}>
                        <FormControl variant="filled" fullWidth>
                            <span style={{textAlign: "left"}}>데이터구분</span>
                            <Select
                                labelId="demo-simple-select-filled-label"
                                id="demo-simple-select-filled"
                                value={category} onChange={(e) => onSelect(e)}
                                sx={{textAlign: "left"}}
                            >
                                <MenuItem value={1}>범죄</MenuItem>
                                <MenuItem value={2}>교통사고</MenuItem>
                                <MenuItem value={3}>온열질환자</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={12}>
                        <FormControl variant="filled" fullWidth>
                            <span style={{textAlign: "left"}}>월</span>
                            <TextField type="month" variant="outlined" value={month}
                                       onChange={(e) => setMonth(e.target.value)}/>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={12}>
                        <FormControl variant="filled" fullWidth>
                            <span style={{textAlign: "left"}}>횟수</span>
                            <TextField type="number" variant="outlined" value={count}
                                       onChange={(e) => setCount(e.target.value)}/>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={12}>
                        <FormControl variant="filled" fullWidth>
                            <span style={{textAlign: "left"}}>기타</span>
                            <TextField type="textarea" variant="outlined"/>
                        </FormControl>
                    </Grid>
                </Grid>
                <Button variant="contained" fullWidth sx={{marginTop: 1}} className="kpi-save" onClick={() => {
                    PostKpi();
                    handleOpen();
                }}>
                    단일등록
                </Button>
            </div>



            <KPIModal open={open} handleClose={handleClose}/>
            <ExcelAddModal ExcelOpen={ExcelOpen} handleExcelClose={handleExcelClose}/>
        </div>
    )
}



function KPIModal({open, handleClose}) {
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        color: "black",
        bgcolor: 'background.paper',
        border: 'none',
        borderRadius: "10px",
        boxShadow: 24,
        p: 4,
    };

    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        통계데이터가 정상적으로 입력되었습니다.
                    </Typography>

                    <Typography id="modal-modal-title" variant="h6" component="h2" sx={{marginTop: 1}}>
                        <Button variant="outlined" fullWidth onClick={() => {
                            handleClose();
                        }}>확인</Button>
                    </Typography>
                </Box>
            </Modal>
        </div>
    )
}



const styleHeaderCell = (cell) => {
    cell.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "ffffffff" },
    };
    cell.border = {
        bottom: { style: "thin", color: { argb: "-100000f" } },
        right: { style: "thin", color: { argb: "-100000f" } },
    };
    cell.font = {
        name: "Arial",
        size: 10,
        color: { argb: "ff252525" },
    };
    cell.alignment = {
        vertical: "middle",
        horizontal: "center",
        wrapText: true,
    };
};

const styleDataCell = (cell) => {
    cell.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "ffffffff" },
    };
    cell.border = {
        bottom: { style: "thin", color: { argb: "-100000f" } },
        right: { style: "thin", color: { argb: "-100000f" } },
    };
    cell.font = {
        name: "Arial",
        size: 10,
        color: { argb: "ff252525" },
    };
    cell.alignment = {
        vertical: "middle",
        horizontal: "center",
        wrapText: true,
    };
};

export default KpiAdminEdit;