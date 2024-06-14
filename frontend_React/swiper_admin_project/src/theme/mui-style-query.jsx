//Dashboard-Display- 우수사원
export const MediaCard = {
    screen: {
        minWidth: 350,
        marginLeft: 1
    },
    HubMax: {
        minWidth: 230,
        marginLeft: 1
    }
}

export const MediaCardStyle = () => {
    if (1300 < window.innerWidth) {
        return MediaCard.screen
    } else if (1100 < window.innerWidth) {
        return MediaCard.HubMax
    }
}


//모바일 버전 메뉴 - 스타일
export const MediaBottom = {
    bottomBar01: {
        width: "100%",
        position: "fixed",
        bottom: 55,
        left: 0,
        right: 0,
    },
    bottomBar02: {
        width: "100%",
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
    }
}

//모달 스타일
const ModalStyle = {
    pcModal: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        maxHeight: "80vh",
        overflow: "auto",
        bgcolor: 'background.paper',
        borderRadius: 5,
        boxShadow: 24,
        p: 4,
    },
    MobileModal: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: "100%",
        maxHeight: "400px",
        overflow: 'auto',
        bgcolor: 'background.paper',
        borderRadius: 5,
        boxShadow: 24,
        p: 4,
    }
}


export const ModalStyles = () => {
    if (1300 < window.innerWidth) {
        return ModalStyle.pcModal
    } else if (480 < window.innerWidth) {
        return ModalStyle.MobileModal
    }
}


//테이블 가로 스크롤 스타일
export const TableContainerStyle = {
    MobileTableContainer: {
        "&::-webkit-scrollbar": {
            width: 10
        },
        "&::-webkit-scrollbar-track": {
            backgroundColor: "#cbcdd3",
        },
        "&::-webkit-scrollbar-thumb": {
            backgroundColor: "grey",
            borderRadius: 2
        }
    },
    MobileTable: {
        width: 800
    },
}

export const TableContainerStyles = () => {
    if (480 > window.innerWidth) {
        return TableContainerStyle.MobileTableContainer
    }
}

export const TableStyles = () => {
    if (480 > window.innerWidth) {
        return TableContainerStyle.MobileTable
    }
}

