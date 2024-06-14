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

exports.namdongMinute = () => {
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

            const req =  http.request({
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
            req.on('error', (err) => logger.error(`namdongMinute.js_84 : ${err}`));
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
            req.on('error', (err) => logger.error(`namdongMinute.js_121 : ${err}`));
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
            })
            req.on('error', (err) => logger.error(`namdongMinute.js_158 : ${err}`));
            req.end();
        });
    };


    const minuteData = (session, url) => {
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
            },(res) => {
                res.on('data', data => jsonData += data);
                res.on('end', ()=> resolve(jsonData));
                res.on('error', (e) => console.log(e));
            })
            req.write("onlyOver=false&onlyWarning=false&eType=0");
            req.on('error', (err) => {
                resolve("[]");
                logger.error(`namdongMinute.js_186 : ${err}`)
            });
            req.end();
        })
    }

    const run = async () => {
        let session;
        session = await loadLogin();
        logger.info(`namdongMinute : 로그인 페이지 진입`);
        await execLogin(session.id, session.csrf, 'admin', 'ndgc1234!');
        logger.info(`namdongMinute : 로그인 성공`);

        let privUrl;
        privUrl = new URL(loginUrl.origin + '/monitoring');
        session = await loadCsrf(session.id, privUrl);
        logger.info(`namdongMinute : 모니터링 페이지 진입`);

        privUrl = new URL(loginUrl.origin + '/ajaxmonitoring');
        logger.info(`namdongMinute : 데이터 불러오는 중`);
        session = await minuteData(session, privUrl)
       
        let minuteDatas = JSON.parse(session);

        
      
        let smell = [];
        let SmellData = [];
        let smellInsert = [];
        if(minuteDatas.length !== 0) {
            arrayDefaultData.map((el, indx) => {
                smell.push(minuteDatas.chartDataList[`${el.id}`]);
            });
           
            console.log(smell);



            for (let i = 0; i < smell.length; i++) {
                for (let j = 0; j < smell[i].length; j++) {
                    SmellData.push({
                        name: smell[i][j].name,
                        node_id: smell[i][j].absoluteId,
                        time: smell[i][j].time,
                        value: smell[i][j].values
                    });
                }
            }

            SmellData.map((el, inx) => {
                let timeSlice = el.time.slice(0, 96);
                let valueSlice = el.value.slice(0, 96);
                timeSlice.map((time, inx) => {
                    if (time.slice(4, 5) === '0' || time.slice(4, 5) === '5') {
                        smellInsert.push({
                            sys_net_region_id: 28200,
                            sys_net_group_id: 28200,
                            sys_net_node_id: parseInt(el.node_id),
                            raw_mem_addr: el.name === 'MOS' ? 24320 : (
                                el.name === 'TOD' ? 36864 : (
                                    el.name === 'NH3' ? 20480 : (
                                        el.name === 'H2S' ? 20736 : (
                                            el.name === 'VOC' ? 22784 : null
                                        )
                                    )
                                )
                            ),
                            raw_mem_value: valueSlice[inx],
                            raw_timestamp: Nows + ' ' + time + ':00'
                        })
                    }
                })
            });
            logger.info(`namdongMinute Data: ${smellInsert.length} 개`);
            

            for (let i = 0; i < smellInsert.length; i++) {
                await new Promise((resolve, reject) => {
                    fetch(`http://${api.apiUrl}/api/crawling/raw`, {
                        method: "POST",
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            sys_net_region_id: smellInsert[i].sys_net_region_id,
                            sys_net_group_id: smellInsert[i].sys_net_group_id,
                            sys_net_node_id: smellInsert[i].sys_net_node_id,
                            raw_mem_addr: smellInsert[i].raw_mem_addr,
                            raw_mem_value: smellInsert[i].raw_mem_value,
                            raw_timestamp: smellInsert[i].raw_timestamp
                        })
                    }).then((res) => {return res.json()}).then(()=>{
                        resolve();
                    }).catch((err)=>{
                        logger.error(`namdongMinute.js_273 : ${err}`)
                        resolve();
                    })
                });
            }
            logger.info(`namdongMinute: 남동구 5분 간격 데이터 성공`) 

        }else{
            logger.info(`namdongMinute: 남동구 5분 간격 데이터 0개`);
        }
        return true;
    }

    run().catch((reason) => {
        logger.error(`namdongMinute.js_286 : ${reason}`)
        return null;
    });
}