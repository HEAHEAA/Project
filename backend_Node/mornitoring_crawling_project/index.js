const TelegramBot = require('node-telegram-bot-api');
require('dotenv').config();
const siteList = require('./data/site_list');
const postgres = require("./db/pool");
const sql = require('./sql/query');
const http = require('http');
const axios = require('axios');


const mornitoring = async () => {
    // ------------ 텔레그램 봇 인스턴스 생성 -------------//
    const token = process.env.TELEGRAM_BOT_TOKEN;
    const bot = new TelegramBot(token, { polling: true });

    bot.onText('/start', (msg) => { //응답
        const chatId = msg.chat.id;
        console.log(msg);
        bot.sendMessage(chatId, '안녕하세요. 영진기술 모니터링 점검 알림봇 입니다.');
    });


    // let userAlarm = [
    //     {id: '5797513945'},
    //     {id: '-791956774'}
    // ]

    const sendAlarm = async (mess) => { // 알람
        // for(let i =0; i<userAlarm.length; i++){
          
        // }
        // const chatId = userAlarm[i].id;
        chatId = '5797513945'
        const message = mess;
        bot.sendMessage(chatId, message, console.log('Send Ok'));
    };
    // ------------ 텔레그램 봇 인스턴스 생성 -------------//

    // ------------ 1분마다 현재 시간을 확인하고, 매 정시에 printAtHourly 함수를 호출 -------------//
    function printAtHourly() {
        const now = new Date();
        const currentHour = now.getHours();

        // 현재 시간이 정시일 경우에만 출력
        if (currentHour % 1 === 0) {
            checkRun();
        }
    }

    setInterval(() => {
        const now = new Date();
        const minutes = now.getMinutes();

        if (minutes === 0) {
            printAtHourly();
        }
    }, 60 * 1000);
    // ------------ 1분마다 현재 시간을 확인하고, 매 정시에 printAtHourly 함수를 호출 -------------//


    // ------------ 실시간 데이터 전송 -----------//
    const server = http.createServer((req, res) => {
        if (req.method === 'POST' && req.url === '/data/ws') {
            let data = '';

            // 데이터 수신
            req.on('data', chunk => {
                data += chunk;
            });

            // 데이터 수신 완료
            req.on('end', () => {
                const receivedData = JSON.parse(data);

                if (receivedData.message === "call_data") {
                    console.log('Received data:', receivedData);
                    console.log("ok let's go");

                    checkRun();
                    // sendAlarm('실시간 크롤링을 시작합니다. -영진기술 알림봇-');

                } else {
                    console.log("데이터 불러오기 실패");
                }

                // 클라이언트에 응답 전송
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: 'Data received by server' }));
            });
        } else {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('Not Found');
        }
    });
    const port = 3003;
    server.listen(port, () => {
        console.log(`Server running at http://43.200.45.232:${port}`);
    });



    // ------------ 모니터링 점검 시작 -------------//
    const checkRun = () => {
        const utcNow = new Date();
        const koreaTime = new Date(utcNow.getTime() + (9 * 60 * 60 * 1000));
        const isoString = koreaTime.toISOString();
        const Nows = isoString.replace("T", " ").substring(0, 19);

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


        for (let i = 0; i < siteList.length; i++) {


            if (siteList[i].cwlType === "csrf") {
                const loginUrl = new URL(siteList[i].url);
                const chn = async () => {
                    return new Promise((resolve, reject) => {
                        let result = { success: true, id: undefined, csrf: undefined, location: undefined, name: siteList[i].region, idx: siteList[i].id, error: undefined };
                        let body = '';

                        const parseCsrf = () => {
                            const regex = /name="_csrf" value="(?<csrf>[^\\"]+)"/;
                            const match = regex.exec(body);
                            if (match && match.groups) {
                                result.csrf = match.groups['csrf'];
                                resolve(result);
                            } else {
                                resolve(result);
                            }
                        };

                        const req = http.request({
                            hostname: loginUrl.hostname,
                            port: loginUrl.port,
                            path: loginUrl.pathname,
                            method: 'GET',
                            headers: { 'Content-Type': 'application/json' },
                            timeout: 5000 // 5초 후에 타임아웃 발생
                        }, (res) => {
                            if (res.statusCode === 200 || res.statusCode === 302 || res.statusCode === 304) {
                                result.success = true;
                                result.error = res.statusCode;
                                result.id = extractJSession(res.headers);
                                result.location = res.headers['location'];
                            } else {
                                result.success = false;
                                result.error = res.statusCode;
                            }
                            res.on('data', data => body += data);
                            res.on('end', () => parseCsrf());
                            res.on('error', () => console.log(e));
                        });

                        // 타임아웃이 발생하면 요청 중단
                        req.on('timeout', () => {
                            req.abort();
                            process.on('uncaughtException', (error) => {
                                let result = { success: false, id: undefined, location: undefined, name: siteList[i].region, idx: siteList[i].id, error: 503 };
                                resolve(result);
                            });
                        });
                        req.on('error', () => {
                            let result = { success: false, id: undefined, location: undefined, name: siteList[i].region, idx: siteList[i].id, error: 500 };
                            resolve(result);
                        });
                        req.end();
                    });
                }


                const loginPost = async (session, csrf, username, password) => {
                    return new Promise((resolve, reject) => {
                        let result = { success: true, 'id': undefined, 'csrf': undefined, location: undefined, name: siteList[i].region, idx: siteList[i].id, error: undefined };

                        let body = '';
                        const params = new URLSearchParams();

                        params.append('_csrf', csrf);
                        params.append('username', username);
                        params.append('password', password);

                        const req = http.request({
                            hostname: loginUrl.hostname,
                            port: loginUrl.port,
                            path: loginUrl.pathname,
                            location: siteList[i].location,
                            method: 'POST',
                            headers: {
                                'Cookie': 'JSESSIONID=' + session,
                                'Content-Type': 'application/x-www-form-urlencoded',
                            },
                            timeout: 5000 // 5초 후에 타임아웃 발생
                        }, (res) => {
                            result.id = extractJSession(res.headers);
                            result.location = res.headers['location'];

                            if (res.headers['location'] === '/login?state=fail') {
                                result.success = false;
                                result.error = 401;
                            } else {
                                result.success = true;
                                result.error = res.statusCode;
                            }

                            res.on('data', data => body += data);
                            res.on('end', () => resolve(result));
                            res.on('error', () => console.log("로그인 에러입미당"));
                        });
                        req.on('error', () => {
                            let result = { success: false, id: undefined, location: undefined, name: siteList[i].region, idx: siteList[i].id, error: 500 };
                            resolve(result);
                        });
                        req.on('timeout', () => {
                            req.abort();
                            process.on('uncaughtException', (error) => {
                                let result = { success: false, id: undefined, location: undefined, name: siteList[i].region, idx: siteList[i].id, error: 401 };
                                resolve(result)
                            });
                        });

                        req.write(params.toString());
                        req.end();
                    })
                }


                let session;
                const cwl = async () => {
                    //1. 사이트 접속
                    session = await chn();
                    //1-1.사이트 접속 불가 시 바로 에러 db전송
                    if (session.success === false) {

                        console.log(session);
                    } else {
                        //1-2. 사이트 접속 가능시 로그인 접속 확인
                        session = await loginPost(session.id, session.csrf, siteList[i].user_id, siteList[i].user_pw);//로그인 접속
                    }
                }

                cwl().catch((e) => {
                    console.log(`${siteList[i].region} 에러발생 로드불가`)
                }).finally(async () => {
                    console.log(session);

                    if (session.success === true) {
                        console.log(session);

                        //login_info insert
                        let InsertValue = [
                            siteList[i].id,
                            session.success,
                            Nows,
                            session.success,
                            null
                        ];
                        postgres.query(sql.login_info, InsertValue, function (err, row, fields) {
                            if (err) return console.log(err);
                            console.log("Data Insert");
                        });

                    } else if (session.success === false) {
                        sendAlarm(`※사이트 오류※ \n 사이트 명 : ${siteList[i].region} | ${siteList[i].name} \n URL: ${siteList[i].url} \n 상태값 : 상태 값 :${session.error} \n 담당자는 긴급히 조취 부탁드립니다. \n -영진기술 모니터링 알림봇-`);


                        //login_info 로그인 테이블 insert
                        let InsertValue = [
                            siteList[i].id,
                            session.success,
                            Nows,
                            false,
                            null
                        ];
                        postgres.query(sql.login_info, InsertValue, function (err, row, fields) {
                            if (err) return console.log(err);
                            console.log("Data Insert");
                        });

                        //error_info 에러 테이블insert
                        let ErrorValue = [
                            siteList[i].id,
                            session.error,
                            Nows,
                            null,
                            false,
                            null
                        ];
                        postgres.query(sql.error_info, ErrorValue, function (err, row, fields) {
                            if (err) return console.log(err);
                            console.log("Data Insert");
                        });
                        // sendAlarm(`${siteList[i].region} : fail`);
                    }
                });
            }
            else if (siteList[i].cwlType === "cookie") {
                const loginUrl = new URL(siteList[i].url);

                const loginGet = async () => {
                    return new Promise((resolve, reject) => {
                        let result = { success: true, id: undefined, location: undefined, name: siteList[i].region, idx: siteList[i].id, error: undefined };
                        let body = '';

                        const req = http.request({
                            hostname: loginUrl.hostname,
                            port: loginUrl.port,
                            path: loginUrl.pathname,
                            method: 'GET',
                            headers: { 'Content-Type': 'application/json' },
                            timeout: 5000 // 5초 후에 타임아웃 발생
                        }, (res) => {
                            if (res.statusCode === 200 || res.statusCode === 302 || res.statusCode === 304) {
                                result.success = true;
                            } else {
                                result.success = false;
                            }

                            result.error = res.statusCode;
                            res.on('data', data => body += data);
                            res.on('end', () => resolve(result));
                            res.on('error', (e) => console.log(e));
                        });

                        // 타임아웃이 발생하면 요청 중단
                        req.on('timeout', () => {
                            req.abort();
                            process.on('uncaughtException', (error) => {
                                let result = { success: false, id: undefined, location: undefined, name: siteList[i].region, idx: siteList[i].id, error: 503 };
                                resolve(result)
                            });
                        });
                        req.on('error', () => {
                            let result = { success: false, id: undefined, location: undefined, name: siteList[i].region, idx: siteList[i].id, error: 500 };
                            resolve(result);
                        })
                        req.end();
                    });

                }

                const loginPost = async (session, username, password) => {
                    return new Promise((resolve, reject) => {
                        let result = { success: true, 'id': undefined, location: undefined, name: siteList[i].region, idx: siteList[i].id, error: undefined };
                        let body = '';

                        const params = new URLSearchParams();
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
                            },
                            timeout: 5000 // 5초 후에 타임아웃 발생
                        }, (res) => {
                            result.id = session;
                            result.location = res.headers['location'];

                            res.on('data', data => body += data);
                            res.on('end', () => resolve(result));
                            res.on('error', (e) => console.log(e));
                        });

                        req.on('timeout', () => {
                            req.abort();
                            process.on('uncaughtException', (error) => {
                                let result = { success: false, id: undefined, location: undefined, name: siteList[i].region, idx: siteList[i].id, error: 401 };
                                resolve(result)
                            });
                        });
                        req.write(params.toString());
                        req.on('error', () => {
                            let result = { success: false, id: undefined, location: undefined, name: siteList[i].region, idx: siteList[i].id, error: 500 };
                            resolve(result);
                        })
                        req.end();
                    })
                }

                const loadData = async (session, url) => {
                    return new Promise((resolve, reject) => {
                        let result = { success: true, 'id': session, name: siteList[i].region, idx: siteList[i].id, response: undefined, error: undefined };
                        const req = http.request({
                            hostname: url.hostname,
                            port: url.port,
                            path: url.pathname,
                            method: 'GET',
                            headers: {
                                'Cookie': 'JSESSIONID=' + session,
                            },
                            timeout: 5000 // 5초 후에 타임아웃 발생
                        }, (res) => {
                            result.error = res.statusCode;
                            res.on('data', (data) => { result.response = JSON.parse(data); });
                            res.on('end', () => { resolve(result) });
                            res.on('error', () => { console.log("에러에러") });
                        });

                        req.on('timeout', () => {
                            req.abort();
                            process.on('uncaughtException', (error) => {
                                result.error = 500;
                                let result = { success: false, id: undefined, location: undefined, name: siteList[i].region, idx: siteList[i].id, error: 500 };
                                resolve(result)
                            });
                        });

                        req.on('error', () => {
                            let result = { success: false, id: undefined, location: undefined, name: siteList[i].region, idx: siteList[i].id, error: 500 };
                            resolve(result);
                        })
                        req.end();

                    });
                }

                let session;
                const cwl = async () => {
                    session = await loginGet(); //사이트 접속

                    if (session.success === false) {
                        // console.log(session);
                    } else {
                        session = await loginPost(session.id, siteList[i].user_id, siteList[i].user_pw);
                        let privUrl;
                        privUrl = new URL(loginUrl.origin + siteList[i].res_url);
                        session = await loadData(session.id, privUrl);

                    }
                }

                cwl().catch(() => {
                    console.log(`${siteList[i].region} 에러발생 !`)
                }).finally(async () => {
                    if (session.success === true) {
                        //성공 테이블 insert
                        let InsertValue = [
                            siteList[i].id,
                            session.success,
                            Nows,
                            session.success,
                            null
                        ];
                        postgres.query(sql.login_info, InsertValue, function (err, row, fields) {
                            if (err) return console.log(err);
                            console.log("Data Insert");
                        });


                    }
                    else if (session.session === false) {
                        console.log(session);
                        sendAlarm(`※사이트 오류※ \n 사이트 명 : ${siteList[i].region} | ${siteList[i].name} \n URL: ${siteList[i].url} \n 상태값 : 상태 값 :${session.error} \n 담당자는 긴급히 조취 부탁드립니다. \n -영진기술 모니터링 알림봇-`);

                        //login_info 테이블 insert
                        let InsertValue = [
                            siteList[i].id,
                            session.success,
                            Nows,
                            session.success,
                            null
                        ];
                        postgres.query(sql.login_info, InsertValue, function (err, row, fields) {
                            if (err) return console.log(err);
                            console.log("Data Insert");
                        });

                        //error_info 테이블 insert
                        let ErrorValue = [
                            siteList[i].id,
                            session.error,
                            Nows,
                            null,
                            false,
                            null
                        ];
                        postgres.query(sql.error_info, ErrorValue, function (err, row, fields) {
                            if (err) return console.log(err);
                            console.log("Data Insert");
                        });
                    }
                });
            }
            else if (siteList[i].cwlType === "json") {
                const loginUrl = new URL(siteList[i].url);
                let body = '';

                const params = new URLSearchParams();
                params.append('passwd', siteList[i].passwd);
                params.append('userid', siteList[i].userid);

                const loginPost = () => {
                    return new Promise(async (resolve, reject) => {

                        let req = http.request({
                            hostname: loginUrl.hostname,
                            port: loginUrl.port,
                            path: loginUrl.pathname,
                            method: "POST",
                            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                        }, (res) => {
                            res.on('data', data => body += data);
                            res.on('end', () => resolve(body));
                            res.on('error', () => console.log(`error`))
                        });
                        req.write(params.toString());
                        req.on('error', () => {
                            let result = { success: false, id: undefined, location: undefined, name: siteList[i].region, idx: siteList[i].id, error: 500 };
                            resolve(result);
                        });
                        req.on('error', () => {
                            let result = { success: false, id: undefined, location: undefined, name: siteList[i].region, idx: siteList[i].id, error: 500 };
                            resolve(result);
                        });
                        req.end();
                    })
                }

                let session;
                const run = async () => {
                    session = await loginPost();
                    let parse = JSON.parse(session);


                    if (Object.keys(parse[0]).length > 1) {
                        let InsertValue = [
                            siteList[i].id,
                            true,
                            Nows,
                            true,
                            null
                        ];
                        postgres.query(sql.login_info, InsertValue, function (err, row, fields) {
                            if (err) return console.log(err);
                            console.log("Data Insert");
                        });


                    } else {

                        sendAlarm(`※사이트 오류※ \n 사이트 명 : ${siteList[i].region} | ${siteList[i].name} \n URL: ${siteList[i].url} \n 상태값 : 상태 값 : 500 \n 담당자는 긴급히 조취 부탁드립니다. \n -영진기술 모니터링 알림봇-`);

                        let InsertValue = [
                            siteList[i].id,
                            false,
                            Nows,
                            false,
                            null
                        ];
                        postgres.query(sql.login_info, InsertValue, function (err, row, fields) {
                            if (err) return console.log(err);
                            console.log("Data Insert");
                        });


                        let ErrorValue = [
                            siteList[i].id,
                            500,
                            Nows,
                            null,
                            false,
                            null
                        ];
                        postgres.query(sql.error_info, ErrorValue, function (err, row, fields) {
                            if (err) return console.log(err);
                            console.log("Data Insert");
                        });
                    }

                }
                run().catch((err) => { console.log('에러다') });
            }
            else if (siteList[i].cwlType === "cookie2") {
                const loginGetUrl = new URL('http://isu.yjrnd.com/user/loginView');
                const loginPostUrl = new URL('http://isu.yjrnd.com/user/login');

                //로그인 페이지 가져오기
                const loginGet = async () => {
                    return new Promise((resolve, reject) => {
                        let result = { success: true, id: undefined, location: undefined, name: siteList[i].region, idx: siteList[i].id, error: undefined };
                        let body = '';
                        const req = http.request({
                            hostname: loginGetUrl.hostname,
                            port: loginGetUrl.port,
                            path: loginGetUrl.pathname,
                            method: 'GET',
                            headers: { 'Accept': 'text/html', 'Content-Type': 'text/html' },
                        }, (res) => {
                            if (res.statusCode === 200 || res.statusCode === 302 || res.statusCode === 304) {
                                result.success = true;
                                result.error = res.statusCode;
                                result.id = extractJSession(res.headers);
                            } else {
                                result.success = false;
                                result.error = res.statusCode;
                            }

                            res.on('data', data => body += data);
                            res.on('end', () => resolve(result));
                            res.on('error', (err) => console.log(err));
                        })
                        req.on('error', () => {
                            let result = { success: false, id: undefined, location: undefined, name: siteList[i].region, idx: siteList[i].id, error: 500 };
                            resolve(result);
                        });
                        req.end();
                    });
                }

                const loginPost = (session) => {
                    return new Promise(async (resolve, reject) => {
                        let result = { success: true, 'id': undefined, location: undefined, name: siteList[i].region, idx: siteList[i].id, error: undefined, response: undefined };
                        let body = '';
                        const params = new URLSearchParams();
                        params.append('appPass1', 'system');
                        params.append('appPass2', 'c3lzdGVt');

                        let req = http.request({
                            hostname: loginPostUrl.hostname,
                            port: loginPostUrl.port,
                            path: loginPostUrl.pathname,
                            method: "POST",
                            headers: {
                                'Cookie': 'JSESSIONID=' + session,
                                'Content-Type': 'application/x-www-form-urlencoded'
                            },
                        }, (res) => {
                            res.on('data', data => body += data);
                            res.on('end', () => resolve(body));
                            res.on('error', () => console.log('error'))
                        })
                        req.write(params.toString());
                        req.on('error', () => {
                            let result = { success: false, id: undefined, location: undefined, name: siteList[i].region, idx: siteList[i].id, error: 500 };
                            resolve(result);
                        });
                        req.end();
                    });
                }


                let session;
                const run = async () => {
                    session = await loginGet();
                    session = await loginPost(session.id);
                    let parse = JSON.parse(session);

                    if (parse.error === false) {

                        let InsertValue = [
                            siteList[i].id,
                            true,
                            Nows,
                            true,
                            null
                        ];
                        postgres.query(sql.login_info, InsertValue, function (err, row, fields) {
                            if (err) return console.log(err);
                            console.log("Data Insert");
                        });


                    } else {
                        sendAlarm(`※사이트 오류※ \n 사이트 명 : ${siteList[i].region} | ${siteList[i].name} \n URL: ${siteList[i].url} \n 상태값 : 상태 값 500 \n 담당자는 긴급히 조취 부탁드립니다. \n -영진기술 모니터링 알림봇-`);

                        let InsertValue = [
                            siteList[i].id,
                            false,
                            Nows,
                            false,
                            null
                        ];
                        postgres.query(sql.login_info, InsertValue, function (err, row, fields) {
                            if (err) return console.log(err);
                            console.log("Data Insert");
                        });


                        let ErrorValue = [
                            siteList[i].id,
                            500,
                            Nows,
                            null,
                            false,
                            null
                        ];
                        postgres.query(sql.error_info, ErrorValue, function (err, row, fields) {
                            if (err) return console.log(err);
                            console.log("Data Insert");
                        });
                    }
                }
                run().catch((err) => { console.log("에러 :", err); })

            }
            else if (siteList[i].cwlType === "cookie3") {
                const loginGetUrl = new URL(siteList[i].url);
                const loginPostUrl = new URL(siteList[i].login_url);

                const loginGet = () => {
                    return new Promise((resolve, reject) => {
                        let result = { success: true, id: undefined, location: undefined, name: siteList[i].region, idx: siteList[i].id, error: undefined };
                        let body = '';
                        const req = http.request({
                            hostname: loginGetUrl.hostname,
                            port: loginGetUrl.port,
                            path: loginGetUrl.pathname,
                            method: 'GET',
                            headers: { 'Accept': 'text/html', 'Content-Type': 'text/html' },
                        }, (res) => {
                            if (res.statusCode === 200 || res.statusCode === 302 || res.statusCode === 304) {
                                result.success = true;
                                result.error = res.statusCode;
                                result.id = extractJSession(res.headers);
                            } else {
                                result.success = false;
                                result.error = res.statusCode;
                            }
                            res.on('data', data => body += data);
                            res.on('end', () => resolve(result));
                            res.on('error', (err) => console.log(err));
                        });
                        req.on('error', () => {
                            let result = { success: false, id: undefined, location: undefined, name: siteList[i].region, idx: siteList[i].id, error: 500 };
                            resolve(result);
                        });
                        req.end();
                    })
                }


                const loginPost = (session) => {
                    return new Promise((resolve, reject) => {
                        let result = { success: true, id: session, location: undefined, name: siteList[i].region, idx: siteList[i].id, error: undefined };
                        let body = '';
                        const params = new URLSearchParams();
                        params.append('appPass1', 'system');
                        params.append('appPass2', 'c3lzdGVt');

                        let req = http.request({
                            hostname: loginPostUrl.hostname,
                            port: loginPostUrl.port,
                            path: loginPostUrl.pathname,
                            method: "POST",
                            headers: {
                                'Cookie': 'JSESSIONID=' + session,
                                'Content-Type': 'application/x-www-form-urlencoded'
                            }
                        }, (res) => {
                            res.on('data', data => body += data);
                            res.on('end', () => resolve(body));
                            res.on('error', () => console.log('error'))
                        })
                        req.write(params.toString());
                        req.on('error', () => {
                            let result = { success: false, id: undefined, location: undefined, name: siteList[i].region, idx: siteList[i].id, error: 500 };
                            resolve(result);
                        });
                        req.end();
                    })
                }


                let session;
                const run = async () => {
                    session = await loginGet();
                    console.log(session.id);
                    session = await loginPost(session.id);

                    if (session.length === 0) { //성공
                        let InsertValue = [
                            siteList[i].id,
                            true,
                            Nows,
                            true,
                            null
                        ];
                        postgres.query(sql.login_info, InsertValue, function (err, row, fields) {
                            if (err) return console.log(err);
                            console.log("Data Insert");
                        });


                    } else {

                        sendAlarm(`※사이트 오류※ \n 사이트 명 : ${siteList[i].region} | ${siteList[i].name} \n URL: ${siteList[i].url} \n 상태값 : 상태 값 500 \n 담당자는 긴급히 조취 부탁드립니다. \n -영진기술 모니터링 알림봇-`);
                        let InsertValue = [
                            siteList[i].id,
                            false,
                            Nows,
                            false,
                            null
                        ];
                        postgres.query(sql.login_info, InsertValue, function (err, row, fields) {
                            if (err) return console.log(err);
                            console.log("Data Insert");
                        });


                        let ErrorValue = [
                            siteList[i].id,
                            500,
                            Nows,
                            null,
                            false,
                            null
                        ];
                        postgres.query(sql.error_info, ErrorValue, function (err, row, fields) {
                            if (err) return console.log(err);
                            console.log("Data Insert");
                        });
                    }
                }
                run().catch((err) => { console.log(err); })
            }
            else if (siteList[i].cwlType === "gis") {
                const url = siteList[i].url;
                const data = { user_id: siteList[i].user_id, user_pwd: siteList[i].user_pw };

                axios.post(url, data).then(response => {
                    let InsertValue = [
                        siteList[i].id,
                        true,
                        Nows,
                        true,
                        null
                    ];
                    postgres.query(sql.login_info, InsertValue, function (err, row, fields) {
                        if (err) return console.log(err);
                        console.log("Data Insert");
                    });

                }).catch(() => {
                    sendAlarm(`※사이트 오류※ \n 사이트 명 : ${siteList[i].region} | ${siteList[i].name} \n URL: ${siteList[i].url} \n 상태값 : 상태 값 :500 \n 담당자는 긴급히 조취 부탁드립니다. \n -영진기술 모니터링 알림봇-`);
                    let InsertValue = [
                        siteList[i].id,
                        false,
                        Nows,
                        false,
                        null
                    ];
                    postgres.query(sql.login_info, InsertValue, function (err, row, fields) {
                        if (err) return console.log(err);
                        console.log("Data Insert");
                    });


                    let ErrorValue = [
                        siteList[i].id,
                        500,
                        Nows,
                        null,
                        false,
                        null
                    ];
                    postgres.query(sql.error_info, ErrorValue, function (err, row, fields) {
                        if (err) return console.log(err);
                        console.log("Data Insert");
                    });
                });
            }
        }
    }
    // setInterval(()=>checkRun(), 10000);
    // checkRun();
}

mornitoring();
