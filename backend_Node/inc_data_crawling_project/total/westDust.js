const nodeData = require('../data/dustNodeData');
const api = require('../data/apiPort');
const http = require('http');
const logger = require('../log/logger');

exports.westDust = () => {
    const loginDustUrl = new URL('http://119.197.244.110:8989/login');

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

    //로그인값 읽어오기
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
                hostname: loginDustUrl.hostname,
                port: loginDustUrl.port,
                path: loginDustUrl.pathname,
                method: 'GET',
                timeout: 10000
            }, (res) => {
                result.id = extractJSession(res.headers);
                res.on('data', data => body += data);
                res.on('end', () => parseCsrf());
                res.on('error', () => reject({ success: false }));
            });

            req.on('timeout', () => {
                logger.error(`westDust : 서버 타임아웃`);
                req.abort();
            });
            req.on('error', (error) => {
                logger.error(`westDust.js_59 : ${error}`);
            });

            req.end();


        });
    };


    //로그인 값 보내기
    const execLogin = async (session, csrf, username, password) => {
        return new Promise((resolve, reject) => {
            let result = { success: true, 'id': undefined, 'csrf': undefined, location: undefined };
            let body = '';
            const params = new URLSearchParams();
            params.append('_csrf', csrf);
            params.append('username', username);
            params.append('password', password);
            const req = http.request({
                hostname: loginDustUrl.hostname,
                port: loginDustUrl.port,
                path: loginDustUrl.pathname,
                method: 'POST',
                timeout: 10000,
                headers: {
                    'Cookie': 'JSESSIONID=' + session,
                    'Content-Type': 'application/x-www-form-urlencoded',
                }
            }, (res) => {
                result.id = extractJSession(res.headers);
                result.location = res.headers['location'];

                res.on('data', data => body += data);
                res.on('end', () => resolve(result));
                res.on('error', () => reject({ success: false }));
            });
            req.write(params.toString());
            req.on('timeout', () => {
                console.error('서구 서버요청 타임아웃');
                req.abort();
            });
            req.on('error', (error) => {
                logger.error(`westDust.js_102 : ${error}`);
            });
            req.end();
        });
    };


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
                path: url.pathname,
                method: 'GET',
                timeout: 10000,
                headers: {
                    'Cookie': 'JSESSIONID=' + session,
                }
            }, (res) => {
                res.on('data', data => body += data);
                res.on('end', () => parseCsrf());
                res.on('error', () => reject({ success: false }));
            });
            req.on('timeout', () => {
                logger.error(`westDust 로그인 타임아웃`);
                req.abort();
            });
            req.on('error', (error) => {
                logger.error(`westDust.js_144 : ${error}`);
            });
            req.end();

        });
    };

    const loadNodeList = async (session, url) => {
        return new Promise((resolve, reject) => {
            let body = '';
            const parseNodes = () => {
                const result = [];
                const regex = /<option value="(?<id>[0-9]+)">(?<name>[^<]+)\(사용\)<\/option>/g;
                const matches = [...body.matchAll(regex)];
                for (const match of matches) {
                    if (match.groups) {
                        result.push({ id: match.groups['id'], name: match.groups['name'] });
                    }
                }
                resolve(result);
            };

            const req = http.request({
                hostname: url.hostname,
                port: url.port,
                path: url.pathname,
                timeout: 10000,
                method: 'GET',
                headers: {
                    'Cookie': 'JSESSIONID=' + session,
                }
            }, (res) => {
                res.on('data', data => body += data);
                res.on('end', () => parseNodes());
                res.on('error', () => reject({ success: false }));
            });
            req.on('timeout', () => {
                logger.error(`westDust 서버 타임아웃 `);
                req.abort();
            });
            req.on('error', (error) => {
                logger.error(`westDust.js_185 : ${error}`);
            });
            req.end();


        });
    };

    const readReport = async (session, csrf) => {
        return new Promise((resolve, reject) => {
            let body = '';
            const url = new URL(loginDustUrl.origin + '/getRealTimeSensorDataList');

            const params = new URLSearchParams();
            params.append('_csrf', csrf);
            params.append('start', '0');
            params.append('end', '10');
            params.append('sort', 'time');
            params.append('ord', 'asc');

            const req = http.request({
                hostname: url.hostname,
                port: url.port,
                path: url.pathname,
                timeout: 10000,
                method: 'POST',
                headers: {
                    'Cookie': 'JSESSIONID=' + session,
                    'Content-Type': 'application/x-www-form-urlencoded',
                }
            }, (res) => {
                res.on('data', data => body += data);
                res.on('end', () => resolve(body));
                res.on('error', () => reject(null));
            });
            req.write(params.toString());
            req.on('timeout', () => {
                logger.error(`westDust 타임아웃`);
                req.abort();
            });
            req.on('error', (error) => {
                logger.error(`westDust.js_226 : ${error}`);
            });
            req.end();
        });
    };


    const pm25PostData = async (data) => {
        return new Promise(async (resolve, reject) => {
            for (let i = 0; i < data.length; i++) {
                await fetch(`http://${api.apiUrl}/api/crawling/raw`, {
                    method: "POST",
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data[i])
                }).then((res) => { return res.json() }).then((res) => {
                    resolve(res);
                }).catch((error) => {
                    logger.error(`westDust.js_243 : ${error}`);
                    resolve();
                });
            }
        })
    }

    const pm10PostData = async(data) => {
        return new Promise(async (resolve, reject) => {
            for (let i = 0; i < data.length; i++) {
                await fetch(`http://${api.apiUrl}/api/crawling/raw`, {
                    method: "POST",
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data[i])
                }).then((res) => { return res.json() }).then((res) => {
                    resolve(res);
                }).catch((error) => {
                    logger.error(`westDust.js_260 : ${error}`);
                    resolve();
                });
            }
        })
    }

    const tempPostData = async(data) => {
        return new Promise(async (resolve, reject) => {
            for (let i = 0; i < data.length; i++) {
                await fetch(`http://${api.apiUrl}/api/crawling/raw`, {
                    method: "POST",
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data[i])
                }).then((res) => { return res.json() }).then((res) => {
                    resolve(res);
                }).catch((error) => {
                    logger.error(`westDust.js_277 : ${error}`);
                    resolve();
                });
            }
        })
    }

    const humiPostData = async(data) => {
        return new Promise(async (resolve, reject) => {
            for (let i = 0; i < data.length; i++) {
                await fetch(`http://${api.apiUrl}/api/crawling/raw`, {
                    method: "POST",
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data[i])
                }).then((res) => { return res.json() }).then((res) => {
                    resolve(res);
                }).catch((error) => {
                    logger.error(`westDust.js_293 : ${error}`);
                    resolve();
                });
            }
        })
    }


    const run = async () => {
        let session;
        session = await loadLogin();
        logger.info(`westdust: 로그인 페이지 접속 성공`);

        session = await execLogin(session.id, session.csrf, 'system', 'icwicw');
        logger.info(`westdust: 로그인 성공`);

        let privUrl;
        privUrl = new URL(loginDustUrl.origin + session.location);
        session = await loadCsrf(session.id, privUrl);
        logger.info(`westdust: 모니터링 접속 성공`);


        privUrl = new URL(loginDustUrl.origin + '/real_list');
        await loadNodeList(session.id, privUrl);
        logger.info(`westdust: 실시간 미세먼지 페이지 접속 성공`);

        let dustData = await readReport(session.id, session.csrf);

        dustData = JSON.parse(dustData);
        logger.info(`westdust: 실시간 미세먼지 데이터 불러오기 성공`);

        if (dustData.data.length === 0) {
            logger.info(`westdust: 데이터 0개 `);
            return null;
        } else {
            console.log(dustData.data);
            let Value = [];
            for (let i = 0; i < dustData.data.length; i++) {
                for (let j = 0; j < nodeData.data.length; j++) {
                    if (nodeData.data[j].name === dustData.data[i].name) {
                        Value.push({
                            id: nodeData.data[j].id,
                            NodeName: nodeData.data[j].name,
                            DataName: dustData.data[i].name,
                            time: dustData.data[i].time,
                            result: [
                                { pm25: dustData.data[i].sensor_pm25, time: dustData.data[i].time },
                                { pm10: dustData.data[i].sensor_pm10, time: dustData.data[i].time },
                                { temp: dustData.data[i].sensor_temp, time: dustData.data[i].time },
                                { humi: dustData.data[i].sensor_humi, time: dustData.data[i].time }
                            ]
                        });
                    }
                }
            }


            let pm25Value = [];
            let pm10Value = [];
            let tempValue = [];
            let humiValue = [];
            for (let i = 0; i < Value.length; i++) {
                let pm25 = Value[i].result[0];
                let pm10 = Value[i].result[1];
                let temp = Value[i].result[2];
                let humi = Value[i].result[3];


                pm25Value.push({
                    sys_net_region_id: 28260,
                    sys_net_group_id: 28260,
                    sys_net_node_id: Value[i].id,
                    raw_mem_addr: 23296,
                    raw_mem_value: pm25.pm25,
                    raw_timestamp: Value[i].time
                });

                pm10Value.push({
                    sys_net_region_id: 28260,
                    sys_net_group_id: 28260,
                    sys_net_node_id: Value[i].id,
                    raw_mem_addr: 23040,
                    raw_mem_value: pm10.pm10,
                    raw_timestamp: Value[i].time
                });

                tempValue.push({
                    sys_net_region_id: 28260,
                    sys_net_group_id: 28260,
                    sys_net_node_id: Value[i].id,
                    raw_mem_addr: 8192,
                    raw_mem_value: temp.temp,
                    raw_timestamp: Value[i].time
                });

                humiValue.push({
                    sys_net_region_id: 28260,
                    sys_net_group_id: 28260,
                    sys_net_node_id: Value[i].id,
                    raw_mem_addr: 8448,
                    raw_mem_value: humi.humi,
                    raw_timestamp: Value[i].time
                })
            }

            session = await pm25PostData(pm25Value);
            logger.info(`westDust 초미세먼지 ${pm25Value.length} 개 성공`);
            session = await pm10PostData(pm10Value);
            logger.info(`westDust 미세먼지 ${pm10Value.length} 개 성공`);
            session = await tempPostData(tempValue);
            logger.info(`westDust 온도 ${tempValue.length} 개 성공`);
            session = await humiPostData(humiValue);
            logger.info(`westDust 습도 ${humiValue.length} 개 성공`);
        }
        return true;
    };

    run().catch((reason) => {
        logger.error(`westDust.js_412 : ${reason}`);
        return null;
    });
}