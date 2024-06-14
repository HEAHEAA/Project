const db = require('../db/pool');
const sql = require('../sql/query');

let getData = {
    title: '',
    success: false,
    message: '',
    data: [],
    total: 0
}

//사이트 정보
exports.GetSiteInfo = async (req, res) => {
    await db.query(sql.selectSiteInfo, (err, data) => {
        if (err) {
            console.log(err);
            res.status(500).send('500 Error Server site_info');
        } else {
            getData = {
                title: '사이트 정보',
                success: true,
                message: 'ok',
                data: data.rows,
                total: data.rows.length
            }
            res.send(getData);
        }
    });
}


//로그인 이력
exports.GetLoginInfo = async(req, res) => {
    await db.query(sql.selectLoginInfo, (err, data) => {
        if (err) {
            console.log(err);
            res.status(500).send('500-Error Server login_info');
        } else {
            getData = {
                title: '로그인 로그 정보',
                success: true,
                message: 'ok',
                data: data.rows,
                total: data.rows.length
            }
            res.send(getData);
        }
    });
}




//id 별 로그인 날짜 조회 받아오기
exports.GetLoginDateByIdInfo = async (req,res) => {
    let start = req.query.start;
    let end = req.query.end;
    let id= req.query.id;

    await db.query(sql.selectLoginDateInfoByIdQuery, [start,end,id], function (err,data) {
        if(err) {
            console.log(err);
            res.send(500).send('500');
        }else {
            getData = {
                title: `${id}번 ${start} ~ ${end} data get Success`,
                success: true,
                message: 'ok',
                data: data.rows,
                total: data.rows.length
            }
            res.send(getData);
        }
    });
}

//날짜별 전체 데이터 가져오기
exports.GetLoginDateAllInfo = async (req,res) => {
    let start = req.query.start;
    let end = req.query.end;

    await db.query(sql.selectLoginDateInfoAllQuery, [start,end], function (err,data) {
        if(err) {
            console.log(err);
            res.send(500).send('날짜별 전체 데이터 가져오지 못함-500');
        }else {
            getData = {
                title: `${start} ~ ${end} data get Success`,
                success: true,
                message: 'ok',
                data: data.rows,
                total: data.rows.length
            }
            res.send(getData);
        }
    })
}



//로그인 라스트 값 받아오기
exports.GetLastLoginInfo = async (req,res) => {
    await db.query(sql.selectLoginLastInfo, (err, data) => {
        if(err) {
            console.log(err);
            res.status(500).send('500-Error Server login Last Data');
        } else {
            getData = {
                title: '로그인 라스트 데이터 로그 정보',
                success: true,
                message: 'ok',
                data: data.rows,
                total: data.rows.length
            }
            res.send(getData);
        }
    })
}

//로그인 오늘 시간별 평균값
exports.GetTodayAvgInfo = async (req,res) => {
    let start = req.query.start;
    let end = req.query.end;

    await db.query(sql.selectAvgTodayQuery, [start,end], (err,data) => {
        if(err){
            console.log(err);
            res.status(500).send('500-Error Server AVG Cannot submit Data');
        } else {
            getData = {
                title: '평균 차트 데이터',
                success: true,
                message: 'ok',
                data: data.rows,
                total: data.rows.length
            }
            res.send(getData);
        }
    })
}


exports.UpdateLoginInfo = async(req,res) => {
    try{
        const {site_id} = req.params;
        const {login_success, login_data_success, login_bigo, login_timestamp} = req.body;

        await db.query(
            sql.loginUpdateQuery,
            [login_success, login_data_success, login_bigo, site_id, login_timestamp]
        );

        getData = {
            title: `${site_id}번 site Update Success`,
            success: true,
            message: 'ok',
            data: [],
            total: 1
        }
        res.send(getData);

    }catch(err) {
        console.log(err);
        req.status(500).send('500 Error Cannot LoginInfo Update Server');
    }
}



//에러 이력
exports.GetErrInfo = async(req, res) => {
    await db.query(sql.selectErrorInfo, (err, data) => {
        if (err) {
            console.log(err);
            res.status(500).send('500-Error Server Error_info');
        } else {
            getData = {
                title: '에러 로그 정보',
                success: true,
                message: 'ok',
                data: data.rows.reverse(),
                total: data.rows.length
            }
            res.send(getData);
        }
    });
}

//에러 id값 별 이력
exports.GetErrInfoId = async(req, res) => {
    await db.query(sql.selectErrorInfo, (err, rows) => {
        if (err) {
            console.log(err);
            res.status(500).send('500-Error Server Error_info');
        } else {
            const errIdRow = rows.rows.find(errs => errs.error_id === parseInt(req.params.error_id));
            getData = {
                title: `${req.params.error_id}번 에러로그`,
                success: true,
                message: 'ok',
                data: errIdRow,
                total: 1
            }

            if (!errIdRow) {
                return res.status(404).send("ID가 없습니다.")
            }
            res.send(getData);
        }
    });
}

//에러 날짜 별 전체 이력
exports.GetErrDateInfo = async (req,res) => {
    let start = req.query.start;
    let end = req.query.end;

    await db.query(sql.selectErrDateAllQuery, [start,end], function (err,data) {
        if(err){
            console.log(err);
            res.status(500).send('500-에러정보 못가져옴');
        } else {
            getData = {
                title: `${start} ~ ${end} data get Success`,
                success: true,
                message: 'ok',
                data: data.rows,
                total: data.rows.length
            }
            res.send(getData);
        }
    })
}

//에러 날짜별 id별 이력
exports.GetErrDateByIdInfo = async (req,res) => {
    let start = req.query.start;
    let end = req.query.end;
    let id = req.query.id;

    await db.query(sql.selectErrDateByIdQuery, [start,end,id], function (err,data) {
        if(err) {
            console.log(err);
            res.status(500).send('500-에러정보 못가져옴');
        } else {
            getData = {
                title: `${start} ~ ${end} , ${id}번 에러정보 data get Success`,
                success: true,
                message: 'ok',
                data: data.rows,
                total: data.rows.length
            }
            res.send(getData);
        }
    })
}


//Update 에러 값
exports.UpdateErrInfoId = async (req, res) => {
    try {
        const { error_id } = req.params;
        const { site_idx, error_state, error_break_date, error_renew_date, error_update_check, error_reason, error_reason_user } = req.body;

        await db.query(
            sql.errorUpdateQuery,
            [site_idx, error_state, error_break_date, error_renew_date, error_update_check, error_reason, error_reason_user, error_id]
        );

        getData = {
            title: `${site_idx}번 site Update Success`,
            success: true,
            message: 'ok',
            data: req.body,
            total: 1
        }

        res.send(getData);

    } catch (err) {
        console.log(err);
        req.status(500).send('500 Error Cannot Update Server');
    }
}

