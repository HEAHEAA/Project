import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Box from "@mui/material/Box";
import {BsFilePerson} from "react-icons/bs";
import {useContext, useEffect, useState} from "react";
import {Menu, MenuItem, SubMenu} from "react-pro-sidebar";
import {UserContext} from "../../../../ContextServer/UserContext";
import {MdRotateRight} from "react-icons/md";
import Checkbox from "@mui/material/Checkbox";

function UserAuth({open, setOpen, handleClose, userModal, setUserModal}) {
    const {
        userAllMenu,
        allMenu,
        setAllMenu,
        checkItem,
        setCheckItem,
        UserAuthCheckPost,
        AuthUserMenu,
        userMenu,
        setUserMenu,
        userId
    } = useContext(UserContext);


    useEffect(() => {
        userAllMenu();
    }, []);

    useEffect(() => {
        AuthUserMenu();
    }, [userId]);


    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        maxHeight: 600,
        overflow: "auto",
        color: "black",
        bgcolor: 'background.paper',
        border: 'none',
        borderRadius: "10px",
        boxShadow: 24,
        p: 4,
    };


    //1. 현재 각 유저별 보여지고있는 메뉴별 id 추출
    const idList = [];
    for (let i = 0; i < userMenu.length; i++) {
        idList.push(userMenu[i].id);
    }


    //2. 추출 이후 현재값을 보여주던 boolean을 true -> false 로 변경하고
    //3. 현재 체크값과 수정된 체크값을 확인해서 데이터를 변동시킨다.
    const handleCheck = (checked, id) => {
        if (checked) {
            setCheckItem(prev => [...prev, id]);

        } else {
            setCheckItem(checkItem.filter((el) => el !== id))

        }
    };

    const [replay, setReplay] = useState(false);

    return (
        <div>
            <Modal
                open={open}
                onClose={()=>{
                    handleClose();
                    setReplay(false);
                }}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        <BsFilePerson/>  권한설정 『{userId}』
                    </Typography>


                    {
                        replay === false ?  <Button variant="contained" fullWidth color={"secondary"} sx={{marginTop: 1}} onClick={() => {
                            setReplay(true);
                        }}>
                            재 설정 <MdRotateRight/>
                        </Button> : null
                    }



                    <Menu style={{marginTop: "2vh"}}>

                        {
                            replay === false ? <>

                                {
                                    userMenu && userMenu.map(function (a, i) {
                                        return (
                                            <div>
                                                <div className="auth-user">
                                                    <ul>
                                                        <li>{a.text}</li>
                                                    </ul>
                                                </div>
                                            </div>

                                        )
                                    })
                                }

                            </> : <>

                                {
                                    allMenu?.map((b, i) => (
                                        <>
                                            <SubMenu label={b.text} icon={<Checkbox type="checkbox" className="station-checkbox"
                                                                               id={`${b.id}`}
                                                                               name={`select-${b.id}`}
                                                                               onChange={(e) => {handleCheck(e.target.checked, b.id)}}
                                                                               checked={checkItem.includes(b.id)}
                                                                               size="small"/>} key={b.id} style={{marginTop: 5}}>
                                            </SubMenu>
                                        </>
                                    ))
                                }

                            </>
                        }



                    </Menu>


                    <br/>

                    {
                        replay === true ?  <Box>
                            <Button fullWidth variant="outlined" onClick={() => {
                                if (window.confirm('권한설정을 수정하시겠습니까?')) {
                                    UserAuthCheckPost();
                                    setReplay(false);
                                    setCheckItem([]);
                                    alert('수정이 완료 되었습니다.');
                                }
                            }}>
                                수정완료
                            </Button>
                        </Box> : null
                    }



                </Box>
            </Modal>
        </div>
    )
}

export default UserAuth;