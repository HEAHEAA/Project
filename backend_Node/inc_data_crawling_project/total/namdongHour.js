const http = require('http');
const api = require('../data/apiPort');
const logger = require('../log/logger');

let arrayDefaultData = [
    { id: 1, name: "인천송천고등학교" },
    { id: 2, name: "논현유승한내들" },
    { id: 3, name: "고잔근린공원" },
    { id: 4, name: "후이즈스마트타워" },
    { id: 5, name: "논현휴먼시아1단지" },
    { id: 6, name: "인천인력개발원" },
    { id: 7, name: "남동근린공원" },
    { id: 8, name: "논현꿈에그린6단지" },
    { id: 9, name: "사리울초등학교" },
    { id: 10, name: "물빛공원" },
    { id: 11, name: "고잔경로당" },
    { id: 12, name: "인천산림조합" },
    { id: 13, name: "선학아파트" },
    { id: 14, name: "이마트연수점" },
    { id: 15, name: "저어새생태학습관" },
    { id: 16, name: "유수지근린공원" },
    { id: 17, name: "음식물폐기물자원화시설" },
    { id: 18, name: "승기근린공원" },
    { id: 19, name: "염골근린공원" },
    { id: 20, name: "남동제1호공원" },
    { id: 21, name: "복지근린공원" },
    { id: 22, name: "갯골공원" },
];

let dustPm10Insert = [];
let dustPm2p5Insert = [];
let OTHInsert = [];
let OTTInsert = [];
let OWDInsert = [];
let OWSInsert = [];

exports.namdongHour = () => {
    const loginUrl = new URL('http://121.137.142.108:8089/login');
   
    const now = new Date()
    const utcNow = now.getTime() + now.getTimezoneOffset() * 60 * 1000
    const koreaTimeDiff = 9 * 120 * 60 * 1000
    const koreaNow = new Date(utcNow + koreaTimeDiff).toISOString()
    const update = koreaNow.replaceAll('T', ' ')
    const Nows = update.replaceAll('Z', ' ').substring(0, 10);



    //bems 용
    // const now = new Date()
    // const utcNow = now.getTime() + now.getTimezoneOffset() * 60 * 1000
    // const koreaTimeDiff = 9 * 120 * 60
    // const koreaNow = new Date(utcNow + koreaTimeDiff).toISOString()
    // const update = koreaNow.replaceAll('T', ' ')
    // const Nows = update.replaceAll('Z', ' ').substring(0, 10);



    //헤더값 추출
    const extractJSession = (headers) => {
        const cookies = headers['set-cookie'];
        const regex = /JSESSIONID=(?<jsessionid>[^;]+)/;
        if (Array.isArray(cookies)) {
            for (let cookie of cookies) {
                const match = regex.exec(cookie);
                if (match && match.groups) {
                    return match.groups['jsessionid'];
                }
            }
        }
        return undefined;
    };

    //로그인 값 읽어오기
    const loadLogin = async () => {
        return new Promise((resolve, reject) => {
            let result = { success: true, id: undefined, csrf: undefined, location: undefined };
            let body = '';
            const parseCsrf = () => {
                const regex = /name="_csrf" value="(?<csrf>[^\\"]+)"/;
                const match = regex.exec(body);
                if (match && match.groups) {
                    result.csrf = match.groups['csrf'];
                    resolve(result);
                }
                else {
                    reject({ success: false });
                }
            };

            const req = http.request({
                hostname: loginUrl.hostname,
                port: loginUrl.port,
                path: loginUrl.pathname,
                method: 'GET',
                headers: { "Accept": "text/html" }
            }, (res) => {
                result.id = extractJSession(res.headers);
                res.on('data', data => body += data);
                res.on('end', () => parseCsrf());
                res.on('error', () => reject({ success: false }));
            });
            req.on('error', (err) => logger.error(`namdongHour.js_93 :${err}`));
            req.end();
        });
    };


    //로그인 값 보내기
    const execLogin = async (session, csrf, username, password) => {
        return new Promise((resolve, reject) => {
            let result = { success: true, id: undefined, csrf: undefined, location: undefined };
            let body = '';

            const params = new URLSearchParams();
            params.append('_csrf', csrf);
            params.append('username', username);
            params.append('password', password);
            const req = http.request({
                hostname: loginUrl.hostname,
                port: loginUrl.port,
                path: loginUrl.pathname,
                method: 'POST',
                headers: {
                    'Cookie': 'JSESSIONID=' + session,
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'X-Csrf-Token': csrf
                }
            }, (res) => {
                result.id = extractJSession(res.headers);
                result.location = res.headers['location'];

                // connection = closed
                // 응답 302 Found여서 data가 없는것으로 보임
                // location 주소에서 csrf를 로딩
                res.on('data', data => body += data);
                res.on('end', () => resolve(result));
                res.on('error', () => reject({ success: false }));
            });
            req.write(params.toString());
            req.on('error', (err) => logger.error(`namdongHour.js_131 : ${err}`));
            req.end();
        })
    };


    //모니터링 url 연결
    const loadCsrf = async (session, url) => {
        return new Promise((resolve, reject) => {
            let result = { success: true, 'id': session, 'csrf': undefined, location: undefined };
            let body = '';
            const parseCsrf = () => {
                const regex = /name="_csrf" content="(?<csrf>[^\\"]+)"/;
                const match = regex.exec(body);
                if (match && match.groups) {
                    result.csrf = match.groups['csrf'];
                    resolve(result);
                }
                else {
                    reject({ success: false });
                }
            };

           const req = http.request({
                hostname: url.hostname,
                port: url.port,
                path: '/login',
                method: 'GET',
                headers: {
                    'Accept': 'text/html',
                    'Cookie': 'JSESSIONID=' + session,
                }
            }, (res) => {
                res.on('data', data => body += data);
                res.on('end', () => parseCsrf());
                res.on('error', () => reject({ success: false }));
            });
            req.on('error', (err) => logger.error(`namdongHour.js_168 : ${err}`));
            req.end();
        });
    };


    const hoursData = (session, url) => {
        return new Promise((resolve, reject) => {
            let jsonData = '';
            const req = http.request({
                hostname: url.hostname,
                port: url.port,
                path: url.pathname,
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
                    "x-csrf-token": session.csrf,
                    'Cookie': "JSESSIONID=" + session.id,
                }
            }, (res) => {
                res.on('data', data => jsonData += data);
                res.on('end', () => resolve(jsonData));
                res.on('error', (e) => console.log(e));
            })
            req.write("onlyOver=false&onlyWarning=false&eType=0");
            req.on('error', (err) => {
                resolve("[]");
                logger.error(`namdongHour.js_196 : ${err}`);
            });
            req.end();
        })
    }


    let dust = [];
    let weather = [];
    const run = async () => {
        let session;
        session = await loadLogin();
        logger.info(`namdongHour : 로그인 페이지 진입`);
        await execLogin(session.id, session.csrf, 'admin', 'ndgc1234!');
        logger.info(`namdongHour : 로그인 성공`);

        let privUrl;
        privUrl = new URL(loginUrl.origin + '/monitoring');
        session = await loadCsrf(session.id, privUrl);
        logger.info(`namdongHour : 모니터링 페이지 진입`);
    
        privUrl = new URL(loginUrl.origin + '/ajaxmonitoring');
        logger.info(`namdongHour : 데이터 불러오는중`);
        session = await hoursData(session, privUrl);
        logger.info(`namdongHour : 데이터 불러오기 완료`);
        

        // await new Promise(resolve => setTimeout(resolve, 60000 * 15)); 
        let hoursDatas = JSON.parse(session);

        
        arrayDefaultData.map((el, indx) => {
            dust.push(hoursDatas.dustData[`${el.id}`]);
            weather.push(hoursDatas.weatherData[`${el.id}`]);
        });


        let dustNode = [];

 
        dust.map((item, index01) => {
            dustNode.push([...item, { node_id: index01 + 1 }]);
            let Time = (dustNode[index01][0].DataDateTime).slice(5, 6);
            let pm10 = (dustNode[index01][1].PM10).slice(5, 6);
            let pm2p5 = (dustNode[index01][2].PM2p5).slice(5, 6);
            let node_id = dustNode[index01][3].node_id

            Time.map((item02, index02) => {
                dustPm10Insert.push({
                    sys_net_region_id: 28200,
                    sys_net_group_id: 28200,
                    sys_net_node_id: node_id,
                    raw_mem_addr: 23040,
                    raw_mem_value: pm10[index02] === '-' ? 0 : pm10[index02],
                    raw_timestamp: Nows + ' ' + item02 + ":00:00"
                });

                dustPm2p5Insert.push({
                    sys_net_region_id: 28200,
                    sys_net_group_id: 28200,
                    sys_net_node_id: node_id,
                    raw_mem_addr: 23296,
                    raw_mem_value: pm2p5[index02] === '-' ? 0 : pm2p5[index02],
                    raw_timestamp: Nows + ' ' + item02 + ":00:00"
                })
            })
        });



       
        let weatherNode = [];

        console.log(weatherNode);
        weather.map((item01, index01) => {
            weatherNode.push([...item01, { node_id: index01 + 1 }]);
            let Time = (weatherNode[index01][0].DataDateTime).slice(5, 6);
            let OTH = (weatherNode[index01][1].OTH).slice(5, 6);
            let OTT = (weatherNode[index01][2].OTT).slice(5, 6);
            let OWD = (weatherNode[index01][3].OWD).slice(5, 6);
            let OWS = (weatherNode[index01][4].OWS).slice(5, 6);
            let node_id = weatherNode[index01][6].node_id;

            Time.map((item02, index02) => {
                OTHInsert.push({
                    sys_net_region_id: 28200,
                    sys_net_group_id: 28200,
                    sys_net_node_id: node_id,
                    raw_mem_addr: 8448,
                    raw_mem_value: OTH[index02] === '-' ? 0 : parseInt(OTH[index02]),
                    raw_timestamp: Nows + ' ' + item02 + ":00"
                });
                OTTInsert.push({
                    sys_net_region_id: 28200,
                    sys_net_group_id: 28200,
                    sys_net_node_id: node_id,
                    raw_mem_addr: 8192,
                    raw_mem_value: OTT[index02] === '-' ? 0 : parseInt(OTT[index02]),
                    raw_timestamp: Nows + ' ' + item02 + ":00"
                });
                OWDInsert.push({
                    sys_net_region_id: 28200,
                    sys_net_group_id: 28200,
                    sys_net_node_id: node_id,
                    raw_mem_addr: 28672,
                    raw_mem_value: OWD[index02] === '-' ? 0 : parseInt(OWD[index02]),
                    raw_timestamp: Nows + ' ' + item02 + ":00"
                });
                OWSInsert.push({
                    sys_net_region_id: 28200,
                    sys_net_group_id: 28200,
                    sys_net_node_id: node_id,
                    raw_mem_addr: 28672,
                    raw_mem_value: OWS[index02] === '-' ? 0 : parseInt(OWS[index02]),
                    raw_timestamp: Nows + ' ' + item02 + ":00"
                });
            })
        })
        logger.info(`namdongHour: 기상데이터- ${dust.length} 개 / 악취데이터- ${weatherNode.length} 개`);

        //미세먼지
        for (let i = 0; i < dustPm10Insert.length; i++) {
            await new Promise((resolve, reject) => {
                fetch(`http://${api.apiUrl}/api/crawling/raw`, {
                    method: "POST",
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        sys_net_region_id: dustPm10Insert[i].sys_net_region_id,
                        sys_net_group_id: dustPm10Insert[i].sys_net_group_id,
                        sys_net_node_id: dustPm10Insert[i].sys_net_node_id,
                        raw_mem_addr: dustPm10Insert[i].raw_mem_addr,
                        raw_mem_value: dustPm10Insert[i].raw_mem_value,
                        raw_timestamp: dustPm10Insert[i].raw_timestamp
                    })
                }).then((res) => { return res.json() }).then(() => {
                    resolve()
                }).catch((err) => {
                    logger.error(`namdongHour.js_329 : ${err}`);
                    resolve()
                });
            });
        }
        logger.info(`namdongHour:fetch 미세먼지  success`);

        //초미세먼지
        for (let i = 0; i < dustPm2p5Insert.length; i++) {
            await new Promise((resolve, reject) => {
                fetch(`http://${api.apiUrl}/api/crawling/raw`, {
                    method: "POST",
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        sys_net_region_id: dustPm2p5Insert[i].sys_net_region_id,
                        sys_net_group_id: dustPm2p5Insert[i].sys_net_group_id,
                        sys_net_node_id: dustPm2p5Insert[i].sys_net_node_id,
                        raw_mem_addr: dustPm2p5Insert[i].raw_mem_addr,
                        raw_mem_value: dustPm2p5Insert[i].raw_mem_value,
                        raw_timestamp: dustPm2p5Insert[i].raw_timestamp
                    })
                }).then((res) => { return res.json() }).then(() => {
                    resolve();
                }).catch((err) => {
                    logger.error(`namdongHour.js_353 : ${err}`);
                    resolve();
                });
            })
        }
        logger.info(`namdongHour:fetch 초미세먼지  success`);

        //습도
        for (let i = 0; i < OTHInsert.length; i++) {
            await new Promise((resolve, reject) => {
                fetch(`http://${api.apiUrl}/api/crawling/raw`, {
                    method: "POST",
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        sys_net_region_id: OTHInsert[i].sys_net_region_id,
                        sys_net_group_id: OTHInsert[i].sys_net_group_id,
                        sys_net_node_id: OTHInsert[i].sys_net_node_id,
                        raw_mem_addr: OTHInsert[i].raw_mem_addr,
                        raw_mem_value: OTHInsert[i].raw_mem_value,
                        raw_timestamp: OTHInsert[i].raw_timestamp
                    })
                }).then((res) => { return res.json() }).then(() => {
                    resolve();
                }).catch((err) => {
                    logger.error(`namdongHour.js_371 : ${err}`);
                    resolve();
                });
            })
        }
        logger.info(`namdongHour:fetch 습도  success`);

        //온도
        for (let i = 0; i < OTTInsert.length; i++) {
            await new Promise((resolve, reject) => {
                fetch(`http://${api.apiUrl}/api/crawling/raw`, {
                    method: "POST",
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        sys_net_region_id: OTTInsert[i].sys_net_region_id,
                        sys_net_group_id: OTTInsert[i].sys_net_group_id,
                        sys_net_node_id: OTTInsert[i].sys_net_node_id,
                        raw_mem_addr: OTTInsert[i].raw_mem_addr,
                        raw_mem_value: OTTInsert[i].raw_mem_value,
                        raw_timestamp: OTTInsert[i].raw_timestamp
                    })
                }).then((res) => { return res.json() }).then(() => {
                    resolve();
                }).catch((err) => {
                    logger.error(`namdongHour.js_401 : ${err}`);
                    resolve();
                });
            })
        }
        logger.info(`namdongHour:fetch 온도  success`);

        //풍향
        for (let i = 0; i < OWDInsert.length; i++) {
            await new Promise((resolve, reject) => {
                fetch(`http://${api.apiUrl}/api/crawling/raw`, {
                    method: "POST",
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        sys_net_region_id: OWDInsert[i].sys_net_region_id,
                        sys_net_group_id: OWDInsert[i].sys_net_group_id,
                        sys_net_node_id: OWDInsert[i].sys_net_node_id,
                        raw_mem_addr: OWDInsert[i].raw_mem_addr,
                        raw_mem_value: OWDInsert[i].raw_mem_value,
                        raw_timestamp: OWDInsert[i].raw_timestamp
                    })
                }).then((res) => { return res.json() }).then(() => {
                    resolve()
                }).catch((err) => {
                    logger.error(`namdongHour.js_425 : ${err}`);
                    resolve()
                });
            })
        }
        logger.info(`namdongHour:fetch 풍향  success`);

        //풍속
        for (let i = 0; i < OWSInsert.length; i++) {
            await new Promise((resolve, reject) => {
                fetch(`http://${api.apiUrl}/api/crawling/raw`, {
                    method: "POST",
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        sys_net_region_id: OWSInsert[i].sys_net_region_id,
                        sys_net_group_id: OWSInsert[i].sys_net_group_id,
                        sys_net_node_id: OWSInsert[i].sys_net_node_id,
                        raw_mem_addr: OWSInsert[i].raw_mem_addr,
                        raw_mem_value: OWSInsert[i].raw_mem_value,
                        raw_timestamp: OWSInsert[i].raw_timestamp
                    })
                }).then((res) => { return res.json() }).then(() => {
                    resolve()
                }).catch((err) => {
                   logger.error(`namdongHour.js_449 : ${err}`);
                    resolve()
                });
            })
        }
        logger.info(`namdongHour:fetch 풍속  success`);

        return true;
    }

    run().catch((reason) => {
        logger.error(`namdongHour.js_459 : ${reason}`);
        return null;
    });
}


