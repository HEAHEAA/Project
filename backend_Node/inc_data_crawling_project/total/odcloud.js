const http = require('http');
const apis = require('../data/apiPort');
const key = require('../data/key');
const logger = require('../log/logger');

let APICall = [
    { id: 1, value: "PM25" },
    { id: 2, value: "PM10" },
    { id: 3, value: "o3" },
]

exports.odclouds = async () => {
    //한국 날짜 계산
    const now = new Date()
    const utcNow = now.getTime() + now.getTimezoneOffset() * 60 * 1000
    const koreaTimeDiff = 9 * 120 * 60 * 1000
    const koreaNow = new Date(utcNow + koreaTimeDiff).toISOString()
    const update = koreaNow.replaceAll('T', ' ')
    const Nows = update.replaceAll('Z', ' ').substring(0, 10);


    //뱀스용
    // const now = new Date()
    // const utcNow = now.getTime() + now.getTimezoneOffset() * 60 * 1000
    // const koreaTimeDiff = 9 * 120 * 60
    // const koreaNow = new Date(utcNow + koreaTimeDiff).toISOString()
    // const update = koreaNow.replaceAll('T', ' ')
    // const Nows = update.replaceAll('Z', ' ').substring(0, 10);

    let Data = [];
    let PM25 = [];
    let PM10 = [];
    let O3 = [];
    let promises = [];
    for (let i = 0; i < APICall.length; i++) {
        const url = `http://223.130.169.165/api/MinuDustFrcstDspthSvrc/v1/getMinuDustFrcstDspth?serviceKey=${key.serviceKey}&returnType=json&informCode=${APICall[i].value}&searchDate=${Nows}`;

        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Host': 'api.odcloud.kr'
            }
        };

        const promise = new Promise((resolve, reject) => {
            const req = http.request(url, options, (res) => {
                let data = '';
                res.on('data', (chunk) => {
                    data += chunk;
                });
                res.on('end', () => {
                    let ParseData = JSON.parse(data);
                    let response = ParseData.response.body.items;

                    for (let j = 0; j < response.length; j++) {
                        let SplitGrade = response[j].informGrade.split(",");
                        for (let k = 0; k < SplitGrade.length; k++) {
                            if (SplitGrade[k].includes("인천")) {
                                Data.push({
                                    informCode: response[j].informCode,
                                    informCause: response[j].informCause,
                                    informData: response[j].informData,
                                    informOverall: response[j].informOverall,
                                    informGrade: SplitGrade[k],
                                    dataTime: response[j].dataTime,
                                    imageUrl1: response[j].imageUrl1,
                                    imageUrl2: response[j].imageUrl2,
                                    imageUrl3: response[j].imageUrl3,
                                    imageUrl4: response[j].imageUrl4,
                                    imageUrl5: response[j].imageUrl5,
                                    imageUrl6: response[j].imageUrl6,
                                    actionKnack: response[j].actionKnack
                                })
                            }
                        }
                    }

                    if (Data.length !== 0) {
                        for (let i = 0; i < Data.length; i++) {
                            // PM25일때
                            if (Data[i].informCode === "PM25") {
                                PM25.push(Data[i]);
                            }
                            //PM10 일때
                            else if (Data[i].informCode === "PM10") {
                                PM10.push(Data[i]);
                            }
                            //O3 일때
                            else if (Data[i].informCode === "O3") {
                                O3.push(Data[i]);
                            }
                        }
                    }
                   
                    resolve();
                });
            });
            req.on('error', (err) => {
                logger.error(`odcloud_err : ${err}`);
            })
            req.end();
        });
        promises.push(promise);
    }
    Promise.all(promises)
        .then(async () => {
            logger.info(`미세먼지 데이버 불러오기 성공 : 초 미세먼지 - ${PM25.length} 개 , 미세먼지- ${PM10.length} 개, 오존- ${O3.length} 개`);
            //PM25
            await fetch(`http://${apis.apiUrl}/api/dust/forecast/PM25`, {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(PM25)
            }).then(res => res.json()).then(()=>{
                logger.info(`odcloud 초미세먼지 데이터 : ${PM25.length} 개`);
            }).catch((err) => {
                logger.error(`odcloud_초미세먼지_err : ${err}`);
            });

            //PM10
            await fetch(`http://${apis.apiUrl}/api/dust/forecast/PM10`, {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(PM10)
            }).then(res => res.json()).then(()=>{
                logger.info(`odcloud 미세먼지 데이터 : ${PM10.length} 개`);
            }).catch((err) => {
                logger.error(`odcloud_미세먼지_err: ${err}`);
            });


            //O3
            await fetch(`http://${apis.apiUrl}/api/dust/forecast/O3`, {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(O3)
            }).then(res => res.json()).then(()=>{
                logger.info(`odcloud 오존 데이터 : ${PM10.length} 개`);
            }).catch((err) => {
                logger.error(`odcloud_초미세먼지_err : ${err}`);
            });

        }).catch((err) => {
            logger.error(`odcloud_error: ${err}`);
        });   
}