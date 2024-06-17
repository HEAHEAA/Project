import {Grid, Table, TableBody, TableCell, TableContainer, TableRow, TextField} from "@mui/material";
import Button from "@mui/material/Button";
import PreviewPlay from "../../EditRight/modal/PreviewPlay.jsx";
import {useContext} from "react";
import {ResizeContext} from "../../../../context/ResizeContext.jsx";

function EditSize() {
    const {
        resizeList,
        setResizeList,
        updateResize,

        reSizeBoolean,setReSizeBoolean,
        open, setOpen,
        handleOpen,
        handleClose
    } = useContext(ResizeContext);


    return (
        <div>
            <PreviewPlay open={open} handleClose={handleClose}/>
            <TableContainer>
                <Table>
                    <TableBody>
                        <TableRow>
                            <TableCell style={{width: "30%", backgroundColor: "#ececec"}} size={"small"}>
                                <h4 style={{textAlign: "center"}}></h4>
                            </TableCell>
                            <TableCell style={{width: "80%", backgroundColor: "#ececec", textAlign: "center"}}
                                       size={"small"}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={6}>
                                        <h4>넓이(px)</h4>

                                    </Grid>

                                    <Grid item xs={12} sm={6}>
                                        <h4>높이(px)</h4>
                                    </Grid>
                                </Grid>
                            </TableCell>
                        </TableRow>


                        {
                            resizeList.map((arr, inx) => (
                                <TableRow key={arr.id}>
                                    <TableCell style={{width: "30%", backgroundColor: "#ececec"}} size={"small"}>
                                        <h4 style={{textAlign: "center"}}>{arr.name}</h4>
                                    </TableCell>
                                    <TableCell style={{width: "80%"}} size={"small"}>
                                        <Grid container spacing={2}>
                                            <Grid item xs={12} sm={6}>
                                                <TextField
                                                    type="number"
                                                    id="outlined-basic"
                                                    variant="outlined"
                                                    name="width"
                                                    defaultValue={arr.width}
                                                    onChange={(e) => {
                                                        updateResize[inx] = {
                                                            id: arr.id,
                                                            name: arr.name,
                                                            number: arr.number,
                                                            width: e.target.value,
                                                            height: arr.height
                                                        }
                                                        return setResizeList(updateResize)
                                                    }
                                                    }
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <TextField
                                                    type="number"
                                                    id="outlined-basic"
                                                    variant="outlined"
                                                    name="height"
                                                    defaultValue={arr.height}
                                                    onChange={(e) => {
                                                        updateResize[inx] = {
                                                            id: arr.id,
                                                            name: arr.name,
                                                            number: arr.number,
                                                            width: arr.width,
                                                            height: e.target.value
                                                        }
                                                        return setResizeList(updateResize)

                                                    }}
                                                />
                                            </Grid>
                                        </Grid>
                                    </TableCell>
                                </TableRow>
                            ))
                        }
                    </TableBody>

                </Table>
            </TableContainer>

            <p>※ [기준 범위]총 해상도 높이는 1920px 이 나와야합니다.</p>
            <h4>
                해상도 넓이 :
                {
                    parseInt(resizeList[0]?.width)
                } px
            </h4>
            <h4>
                총 해상도 높이 :
                {
                    parseInt(resizeList[0]?.height)+
                    parseInt(resizeList[1]?.height)+
                    parseInt(resizeList[2]?.height)+
                    parseInt(resizeList[3]?.height)
                }
                px
            </h4>


            <Button variant="contained" fullWidth onClick={()=>{
                if(
                    parseInt(resizeList[0]?.height) +
                    parseInt(resizeList[1]?.height) +
                    parseInt(resizeList[2]?.height) +
                    parseInt(resizeList[3]?.height) === 1920
                ){
                    setReSizeBoolean(true);
                    handleOpen();
                }else {
                    alert(
                        `Miss![기준 초과] 총 높이 해상도는 1920px이 나와야합니다.  `
                    )
                }
            }}>
                사이즈 저장
            </Button>
        </div>
    )
}

export default EditSize;