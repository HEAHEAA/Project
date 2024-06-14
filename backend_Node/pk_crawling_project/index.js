const convert = require('xml-js');
const postgres = require('./db/pool');
const sql = require('./sql/checkingQuery');
const token = require('./default/serviceKey');

// let textKey = 'eulom0mk9uEcx%2BLZZcfT3mHx0oP7ZFv7pqUdBLx3Ov%2Bez9Fyu%2BF4KJkO4lXgJONFe4SEVDuUQMfHkWzleXQP%2FQ%3D%3D';
const run = () => {
    let keyIndex = 0;
    let totalCount = 0;
    let dataCount = 0;

    setInterval(()=> checking(), 5000);

    const checking = () => {
        // const now = new Date()
        // const utcNow = now.getTime() + now.getTimezoneOffset() * 60 * 1000
        // const koreaTimeDiff = 9 * 120 * 60 
        // const koreaNow = new Date(utcNow + koreaTimeDiff).toISOString()
        // const update = koreaNow.replaceAll('T', ' ')
        // const Nows = update.replaceAll('Z', ' ').substring(0, 10);


        const utcNow = new Date();
        const koreaTime = new Date(utcNow.getTime() + (9 * 60 * 60 * 1000));
        const isoString = koreaTime.toISOString();
        const Nows = isoString.replace("T", " ").substring(0, 10);
       




        postgres.query(sql.selectCheckLsmd, [0], function (err, row, fields) {
            if (err) console.log(err);

            //체킹 
            for (let i = 0; i < row.rows.length; i++) {
                fetch(`http://apis.data.go.kr/1390802/SoilEnviron/SoilExam/getSoilExam?serviceKey=${token[keyIndex].key}&PNU_Code=${row.rows[i].lsmd_pnu_code}`,{
                    method: 'GET',
                    headers: { 'Content-Type': 'application/xml' }
                }).then((res) => {return res.text()}).then(xml => {
                    const res_xml = convert.xml2json(xml, { compact: true, spaces: 4 });
                    let res_json = JSON.parse(res_xml);

                    totalCount ++;
                    dataCount ++

                    // api 100개 호출이 되면 key index++ 
                    if(dataCount === 101){
                        keyIndex ++;
                        dataCount = 0;
                    }
                     // key index 8이 되면 setInterval 멈추기
                    if(keyIndex === 8){
                        clearInterval(intervalId);
                        console.log('setInterval이 멈추었습니다.');
                    }


                    // ------- API 호출 ------ //
                    if (Object.keys(res_json)[0] === 'response') {
                         //호출 성공시
                         if (Object.keys(res_json.response).length > 1) {
                            console.log("호출성공");
                            console.log(res_json.response);

                            //Check Table
                            let successValue = [
                                row.rows[i].lsmd_pnu_code,
                                row.rows[i].lsmd_jibun,
                                true,
                                '',
                                row.rows[i].lsmd_no,
                            ];

                            postgres.query(sql.UpdatecheckLsmdTrue, successValue, function (err, row, fields) {
                                if (err) console.log("err")
                                console.log("Check Table Update Success !");
                            });


                            //Allow Table
                            let allowValue = [
                                res_json.response.body.items.item.PNU_Code._text,
                                res_json.response.body.items.item.Any_Year._text,
                                res_json.response.body.items.item.Exam_Day._text,
                                res_json.response.body.items.item.Exam_Type._text,
                                res_json.response.body.items.item.PNU_Nm._text,
                                parseFloat(res_json.response.body.items.item.ACID._text),
                                parseInt(res_json.response.body.items.item.VLDPHA._text),
                                res_json.response.body.items.item.Exam_Type._text !== 1 ? null : parseInt(res_json.response.body.items.item.VLDSIA._text),
                                parseInt(res_json.response.body.items.item.OM._text),
                                parseFloat(res_json.response.body.items.item.POSIFERT_MG._text),
                                parseFloat(res_json.response.body.items.item.POSIFERT_K._text),
                                parseFloat(res_json.response.body.items.item.POSIFERT_CA._text),
                                parseFloat(res_json.response.body.items.item.SELC._text),
                                false,
                                Nows + ' 00:00:00'
                            ];

                            postgres.query(sql.InsertAllowLsmd, allowValue, function (err, row, fields) {
                                if (err) console.log(err);
                                console.log("Allow Table Insert Success !");
                            });
                         }else{
                            console.log("Fail");

                            let failValue = [
                                row.rows[i].lsmd_pnu_code,
                                row.rows[i].lsmd_jibun,
                                false,
                                '요청 데이터 없음',
                                row.rows[i].lsmd_no,
                            ]
                            postgres.query(sql.UpdatecheckLsmdTrue, failValue, function (err, row, fields) {
                                if (err) console.log("err")
                                console.log("Check Table 요청 데이터 없음");
                            });
                         }
                    } 
                    else if(Object.keys(res_json)[0] === 'OpenAPI_ServiceResponse') {
                        //호출 실패시
                        let failValue = [
                            row.rows[i].lsmd_pnu_code,
                            row.rows[i].lsmd_jibun,
                            false,
                            '트래픽 초과',
                            row.rows[i].lsmd_no,
                        ];
                        postgres.query(sql.UpdatecheckLsmdTrue, failValue, function (err, row, fields) {
                            if (err) console.log("err")
                            console.log("Check Table 트래픽 초과");
                        });
                    }
                });
                console.log("----------------------------------------------------")
                console.log("토큰 순서 (keyIndex) :", keyIndex);
                console.log("데이터 순서 :", dataCount);
                console.log("총 데이터 :", totalCount);
            }
        })
    }
}
// setInterval(()=> run(), 60000 * 60 * 8);
run();