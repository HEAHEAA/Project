import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {Modal} from "@mui/material";
import {useContext, useEffect, useState} from "react";
import {LoginContext} from "../../../../ContextServer/LoginContext";
import axios from "axios";
import TextField from "@mui/material/TextField";
import * as React from "react";
import {KpiContext} from "../../../../ContextServer/KpiContext";

function ExcelAddModal({ExcelOpen,handleExcelClose}){
    const {access, RefreshToken} = useContext(LoginContext);
    const {getKPiAPI, getHeat,KpiList} = useContext(KpiContext);
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: 'none',
        borderRadius: "10px",
        boxShadow: 24,
        color: 'black',
        p: 4,
    };

    const [upload,setUpload] = useState(false);
    useEffect(()=>{
        setUpload(false);
    },[]);
    const onSubmit = async (e) => {
        e.preventDefault();
        e.persist();

        RefreshToken();
        let ac = null;
        if (access == '') {
            ac = localStorage.getItem('login').replaceAll('"', '')
        } else {
            ac = access
        }

        let files = e.target.profile_files.files;
        let formData = new FormData();
        for (let i = 0; i < files.length; i++) {
            formData.append("file", files[i]);
        }

        const post = await axios({
            method: "POST",
            url: '/api/excel/upload/kpi',
            mode: "cors",
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: 'Bearer ' + ac,
            },
            data: formData,
        });
        setUpload(true);
        getKPiAPI();
        getHeat();
        KpiList();
        handleExcelClose();
    }



    return(
        <div>
            <Modal
                open={ExcelOpen}
                onClose={handleExcelClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        KPI 엑셀 업로드
                    </Typography>


                    <form onSubmit={(e) => onSubmit(e)}>
                        <TextField
                            type="file"
                            name="profile_files"
                            id="file"
                            accept=".csv"
                            fullWidth
                        />

                        <Button type={"submit"} variant="contained" sx={{marginTop: 1}} fullWidth>
                            업로드
                        </Button>
                    </form>

                    {
                        upload === true ? <p>업로드 완료!</p> : null
                    }
                </Box>
            </Modal>
        </div>
    )
}
export default ExcelAddModal;