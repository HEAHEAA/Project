const http = require('http');
const api = require('../data/apiPort');
const logger = require('../log/logger');

let insertValue = []; //insert 데이터
exports.yeonsu = () => {
    //로그인 GET
    http.request('http://49.50.160.241', { setHost: true, headers: { host: 'mons.envors.com' } }, (res) => {
        let data = ''
        res.on('data', chunk => data += chunk)
        res.on('end', () => {

            const param = new URLSearchParams();
            param.set('appid', 'user.login');
            param.set('user_id', 'yeonsu');
            param.set('user_pass', 'yeonsu');

            // 로그인 POST
            const req = http.request('http://49.50.160.241/server/index.php', {
                setHost: true,
                method: 'POST',
                timeout: 10000,
                headers: {
                    "Accept": "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript, */*; q=0.01",
                    "Content-Type": "application/x-www-form-urlencoded",
                    "Host": 'mons.envors.com',
                    "Cookie": res.headers['set-cookie'][0].replace('; path=/', ''),
                    "Origin": 'http://mons.envors.com',
                    "Referer": "http://mons.envors.com/mapov.php"
                }
            }, (res0) => {
                logger.info(`yeonsu : 로그인 완료`);

                let data02 = ''
                res0.on('data', chunk1 => data02 += chunk1)
                res0.on('end', async () => {

                    const bodys = "applist=%5B%7B%22appid%22%3A%22sens.data.last2%22%2C%22param%22%3A%7B%22siteids%22%3A%5B1%2C2%2C3%2C4%2C5%2C6%2C7%2C8%5D%7D%7D%2C%7B%22appid%22%3A%22pz.log.recent%22%2C%22param%22%3A%7B%22idx%22%3A1%2C%22deviceids%22%3A%5B161%2C162%2C163%2C164%2C165%2C166%2C505%2C506%5D%7D%7D%5D";
                    const req2 = http.request('http://49.50.160.241/server/index.php', {
                        setHost: true,
                        method: 'POST',
                        timeout: 10000,
                        headers: {
                            "Accept": "application/json; charset=utf-8",
                            "Content-Type": "application/x-www-form-urlencoded",
                            "Host": 'mons.envors.com',
                            "Cookie": res.headers['set-cookie'][0].replace('; path=/', ''),
                            "Origin": 'http://mons.envors.com',
                            "Referer": 'http://mons.envors.com/mapov.php'
                        }
                    }, (res1) => {
                        let data03 = ''
                        res1.on('data', chunk2 => data03 += chunk2)
                        res1.on('end', async () => {
                            let dataParse = JSON.parse(data03);
                            let fetchData = dataParse.rsSensDataLast2.rows;
                            let dataValue = []; //데이터정리



                            fetchData.map((el, index) => {
                                dataValue.push({
                                    dt_net_raw_id: index + 1, //시리얼
                                    sys_net_service_id: 1, //고정값
                                    sys_net_region_id: 28185, //연수구 고정값
                                    sys_net_group_id: 28185, //연수구 고정값
                                    sys_net_node_id: el.siteid, //지점번호
                                    raw_remote_addr: '127.0.0.1', //고정값
                                    raw_trans_id: 0,  //고정
                                    raw_data_type: 0, //고정
                                    raw_timestamp: el.dt,
                                    data: [
                                        { name: "미세먼지", number: 23040, value: el.s3 },
                                        { name: "황화수소", number: 20736, value: el.s4 },
                                        { name: "암모니아", number: 20480, value: el.s5 },
                                        { name: "총휘발성유기화합물", number: 22784, value: el.s11 },
                                        { name: "온도", number: 8192, value: el.s9 },
                                        { name: "습도", number: 8448, value: el.s10 },
                                        { name: "복합악취", number: 36864, value: el.ou },
                                        { name: "풍향", number: 28672, value: el.wd },
                                        { name: "풍속", number: 28928, value: el.ws },
                                    ],

                                });
                            });

                            logger.info(`yeonsu 데이터 : ${dataValue.length}`);

                            dataValue.map((data) => {
                                data.data.map((array) => {

                                    insertValue.push({
                                        dt_net_raw_id: 1,
                                        sys_net_service_id: data.sys_net_service_id,
                                        sys_net_region_id: data.sys_net_region_id,
                                        sys_net_group_id: data.sys_net_group_id,
                                        sys_net_node_id: data.sys_net_node_id,
                                        raw_remote_addr: data.raw_remote_addr,
                                        raw_trans_id: data.raw_trans_id,
                                        raw_data_type: data.raw_data_type,
                                        raw_mem_addr: array.number,
                                        raw_mem_value: array.value,
                                        raw_timestamp: data.raw_timestamp
                                    });

                                });
                            });

                           

                            for (let i = 0; i < insertValue.length; i++) {
                                await new Promise((resolve, reject) => {
                                    fetch(`http://${api.apiUrl}/api/crawling/raw`, {
                                        method: "POST",
                                        headers: { 'Content-Type': 'application/json' },
                                        body: JSON.stringify({
                                            sys_net_region_id: insertValue[i].sys_net_region_id,
                                            sys_net_group_id: insertValue[i].sys_net_group_id,
                                            sys_net_node_id: insertValue[i].sys_net_node_id,
                                            raw_mem_addr: insertValue[i].raw_mem_addr,
                                            raw_mem_value: insertValue[i].raw_mem_value,
                                            raw_timestamp: insertValue[i].raw_timestamp
                                        })
                                    }).then((res) => { return res.json() }).then(res => {
                                        
                                        resolve();
                                    }).catch((err) => {
                                        logger.error(`yeonsu.js_125 : ${err}`);
                                        resolve();
                                    })
                                })

                            }

                        });
                    })
                    req2.write(bodys);
                    req2.on('timeout', () => {
                        logger.error(`yeonsu : 타임아웃`);
                        req.abort();
                    });
                    req2.on('error', (error) => {
                        logger.error(`yeonsu.js_140 : ${error}`);
                    });
                    req2.end();
                    logger.info(`yeonsu 데이터 :insert 성공`);
                });
            });
            req.write(param.toString());
            req.on('timeout', () => {
                console.error('연수구 서버요청 타임아웃');
                req.abort();
            });
            req.on('error', (error) => {
                logger.error(`yeonsu.js_151 : ${error}`);
            });
            req.end();
        })
    }).end();

}