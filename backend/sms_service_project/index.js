const http = require('http');
const FormData = require('form-data');
const ms = require('./db/msSql');
const msQuery = require('./db/query');
const api = require('./port/api');
const logger = require('./logger/logger');

//데이터 받아오기
const getTimeDataUrl = new URL(`${api.apiUrl}/api/sms/content`);
const sms_data = () => {
    return new Promise((resolve, reject) => {
        let smsData = '';
        const req = http.request({
            hostname: getTimeDataUrl.hostname,
            port: getTimeDataUrl.port,
            path: getTimeDataUrl.pathname,
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }, (res) => {
            res.on('data', data => smsData += data);
            res.on('end', () => resolve(smsData));
            res.on('error', () => console.log('데이터 에러'));
        });
        req.on('error', (err) => {
            logger.error('index.js_25 : 데이터 받아오지 못함.');
        })
        req.end();
    })
}

const smsUrl = new URL(api.aligo);
const sms_send = (sms) => {
    return new Promise((resolve, reject) => {

        for (let i = 0; i < sms.length; i++) {
            let sms_result = [];
            const formData = new FormData();
            formData.append('key', 'key');
            formData.append('user_id', 'name');
            formData.append('sender', 'phone'); //발신번호 등록된 사람만 보낼 수 있음.
            formData.append('receiver', sms[i].receiver);
            formData.append('msg-type', 'SMS');
            formData.append('sms_type', 'L');
            formData.append('msg', sms[i].sms_txt);
            formData.append('testmode_yn', 'Y');

            const options = {
                hostname: 'apis.aligo.in',
                port: smsUrl.port,
                path: smsUrl.pathname,
                method: 'POST',
                headers: formData.getHeaders() // form-data의 헤더 설정
            }
    
            const req = http.request(options, (res) => {
                res.on('data', (data) => sms_result += data);
                res.on('end', () => resolve(sms_result));
            });
            formData.pipe(req);
            req.on('error', () => {
                logger.error('index.js_65 : SMS 전송 실패');
            });
            req.end();
        }

    });
}


const msSqlUpdate = (resultData) => {
    return new Promise(async (resolve, reject) => {
        try {
            let pool = await ms.sql.connect(ms.config);
            let updateValue = [];

            for (let i = 0; i < resultData.length; i++) {
                updateValue.push(
                    pool.request()
                        .input('sender', resultData[i].sender)
                        .input('receiver', resultData[i].receiver)
                        .input('smsTxt', resultData[i].sms_txt)
                        .input('smsState', 1)
                        .input('alarmType', resultData[i].alarm_type)
                        .input('regDate', resultData[i].reg_date)
                        .input('smsIdx', resultData[i].sms_idx)
                        .query(msQuery.updateQuery)
                );
            }

            const results = await Promise.all(updateValue);
            results.forEach((result, index) => {
                resolve(`${resultData.length}개 update ok`);
            });
        } catch (err) {
            logger.error('index.js_97 : DB Update 실패');
        }
    });
};

let data;
let sendData;
const run = async () => {
    const now = new Date();
    const second = now.getSeconds(); // 현재 시간 초

    if (second === 30 || second === 0) {
        data = await sms_data();
        logger.info('WEB API SERVER CONNECT SUCCESS!');

        jsonData = JSON.parse(data);
        if (jsonData.length !== 0) {
            sendData = await sms_send(jsonData);
            console.log(sendData);
            logger.info('SMS SEND SUCCESS!');

            sendData = await msSqlUpdate(jsonData);
            logger.info('MSSQL UPDATE SUCCESS!');
        } else {
            logger.info('발송 할 데이터 없음');
        }
    }
}
setInterval(() => run(), 1000);
// run();
