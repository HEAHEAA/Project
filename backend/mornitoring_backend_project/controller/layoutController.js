const db = require('../db/pool');
const sql = require('../sql/query');

let getData = {
    title: '',
    success: false,
    message: '',
    data: [],
    total: 0
}

//레이아웃 정보
exports.GetLayout = async (req, res) => {
    await db.query(sql.selectLayoutInfo, (err,data) => {
        if(err){
            console.log(err);
            res.status(500).send('500 Error Server layout_info');
        } else {
            getData = {
                title: '레이아웃 정보',
                success: true,
                message: 'ok',
                data: data.rows,
                total: data.rows.length
            }
            res.send(getData);
        }
    });
}


//레이아웃 정보 수정하기
exports.UpdateLayout = async (req, res) => {
    try {
        const {lay_id} = req.params;
        const {i, x, y, w, h} = req.body;

        await db.query(sql.updateLayoutInfo, [i,x,y,w,h, lay_id]);

        getData = {
            title: `${lay_id}번 site Update Success`,
            success: true,
            message: 'ok',
            data: [i,x,y,w,h, lay_id],
            total: 1
        }
        res.send(getData);

    }catch (e) {
        console.log(e);
        req.status(500).send('500 Error Cannot layout Update Server');
    }
}
