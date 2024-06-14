const http = require('http');
const api = require('../data/apiPort');
const logger = require('../log/logger');

exports.westSmell = () => {
    const now = new Date()
    const utcNow = now.getTime() + now.getTimezoneOffset() * 60 * 1000
    const koreaTimeDiff = 9 * 120 * 60 * 1000
    const koreaNow = new Date(utcNow + koreaTimeDiff).toISOString()
    const update = koreaNow.replaceAll('T', ' ')
    const date = update.replaceAll('Z', ' ').substring(0, 10);
    let smellBody = `start=0&end=10&sort=date&ord=desc&sdate=${date} 00:00:00&edate=${date} 23:59:59&date=date_5minute&d[0].n=1&d[0].s=20480&d[0].c=m1_20480&d[1].n=1&d[1].s=20736&d[1].c=m1_20736&d[2].n=1&d[2].s=22784&d[2].c=m1_22784&d[3].n=1&d[3].s=36864&d[3].c=m1_36864&d[4].n=2&d[4].s=20480&d[4].c=m2_20480&d[5].n=2&d[5].s=20736&d[5].c=m2_20736&d[6].n=2&d[6].s=22784&d[6].c=m2_22784&d[7].n=2&d[7].s=36864&d[7].c=m2_36864&d[8].n=3&d[8].s=20480&d[8].c=m3_20480&d[9].n=3&d[9].s=20736&d[9].c=m3_20736&d[10].n=3&d[10].s=22784&d[10].c=m3_22784&d[11].n=3&d[11].s=36864&d[11].c=m3_36864&d[12].n=4&d[12].s=20480&d[12].c=m4_20480&d[13].n=4&d[13].s=20736&d[13].c=m4_20736&d[14].n=4&d[14].s=22784&d[14].c=m4_22784&d[15].n=4&d[15].s=36864&d[15].c=m4_36864&d[16].n=5&d[16].s=20480&d[16].c=m5_20480&d[17].n=5&d[17].s=20736&d[17].c=m5_20736&d[18].n=5&d[18].s=22784&d[18].c=m5_22784&d[19].n=5&d[19].s=36864&d[19].c=m5_36864&d[20].n=6&d[20].s=20480&d[20].c=m6_20480&d[21].n=6&d[21].s=20736&d[21].c=m6_20736&d[22].n=6&d[22].s=22784&d[22].c=m6_22784&d[23].n=6&d[23].s=36864&d[23].c=m6_36864&d[24].n=7&d[24].s=20480&d[24].c=m7_20480&d[25].n=7&d[25].s=20736&d[25].c=m7_20736&d[26].n=7&d[26].s=22784&d[26].c=m7_22784&d[27].n=7&d[27].s=36864&d[27].c=m7_36864&d[28].n=8&d[28].s=36864&d[28].c=m8_36864&d[29].n=8&d[29].s=22272&d[29].c=m8_22272&d[30].n=8&d[30].s=22528&d[30].c=m8_22528&d[31].n=8&d[31].s=22277&d[31].c=m8_22277&d[32].n=9&d[32].s=36864&d[32].c=m9_36864&d[33].n=9&d[33].s=22272&d[33].c=m9_22272&d[34].n=9&d[34].s=22528&d[34].c=m9_22528&d[35].n=9&d[35].s=22277&d[35].c=m9_22277&d[36].n=10&d[36].s=20480&d[36].c=m10_20480&d[37].n=10&d[37].s=20736&d[37].c=m10_20736&d[38].n=10&d[38].s=22784&d[38].c=m10_22784&d[39].n=10&d[39].s=36864&d[39].c=m10_36864&d[40].n=11&d[40].s=20480&d[40].c=m11_20480&d[41].n=11&d[41].s=20736&d[41].c=m11_20736&d[42].n=11&d[42].s=22784&d[42].c=m11_22784&d[43].n=11&d[43].s=36864&d[43].c=m11_36864&d[44].n=12&d[44].s=20480&d[44].c=m12_20480&d[45].n=12&d[45].s=20736&d[45].c=m12_20736&d[46].n=12&d[46].s=22784&d[46].c=m12_22784&d[47].n=12&d[47].s=36864&d[47].c=m12_36864&d[48].n=13&d[48].s=20480&d[48].c=m13_20480&d[49].n=13&d[49].s=20736&d[49].c=m13_20736&d[50].n=13&d[50].s=22784&d[50].c=m13_22784&d[51].n=13&d[51].s=36864&d[51].c=m13_36864&d[52].n=14&d[52].s=20480&d[52].c=m14_20480&d[53].n=14&d[53].s=20736&d[53].c=m14_20736&d[54].n=14&d[54].s=22784&d[54].c=m14_22784&d[55].n=14&d[55].s=36864&d[55].c=m14_36864&d[56].n=15&d[56].s=20480&d[56].c=m15_20480&d[57].n=15&d[57].s=20736&d[57].c=m15_20736&d[58].n=15&d[58].s=22784&d[58].c=m15_22784&d[59].n=15&d[59].s=36864&d[59].c=m15_36864&d[60].n=16&d[60].s=20480&d[60].c=m16_20480&d[61].n=16&d[61].s=20736&d[61].c=m16_20736&d[62].n=16&d[62].s=22784&d[62].c=m16_22784&d[63].n=16&d[63].s=36864&d[63].c=m16_36864&d[64].n=17&d[64].s=20480&d[64].c=m17_20480&d[65].n=17&d[65].s=20736&d[65].c=m17_20736&d[66].n=17&d[66].s=22784&d[66].c=m17_22784&d[67].n=17&d[67].s=36864&d[67].c=m17_36864&d[68].n=100&d[68].s=20480&d[68].c=m100_20480&d[69].n=100&d[69].s=20736&d[69].c=m100_20736&d[70].n=100&d[70].s=22784&d[70].c=m100_22784&d[71].n=100&d[71].s=36864&d[71].c=m100_36864&d[72].n=201&d[72].s=36864&d[72].c=m201_36864&d[73].n=203&d[73].s=36864&d[73].c=m203_36864&d[74].n=204&d[74].s=36864&d[74].c=m204_36864&d[75].n=205&d[75].s=36864&d[75].c=m205_36864&d[76].n=207&d[76].s=36864&d[76].c=m207_36864&d[77].n=208&d[77].s=36864&d[77].c=m208_36864&d[78].n=209&d[78].s=36864&d[78].c=m209_36864&d[79].n=211&d[79].s=36864&d[79].c=m211_36864&d[80].n=212&d[80].s=36864&d[80].c=m212_36864&d[81].n=213&d[81].s=36864&d[81].c=m213_36864`


    const cookieCsrf = async () => {
        return new Promise((resolve, reject) => {
            let req = http.get("http://119.197.244.110:8080/login", async (res) => {

                const csrf = await new Promise((resolve, reject) => {
                    let cookie = res.headers["set-cookie"]
                    let data = ''
                    res.on('data', (c) => data += c)
                    res.on('end', () => {
                        const regex = /name="_csrf" value="(?<csrf>[^\\"]+)"/
                        resolve({
                            csrf: regex.exec(data).groups['csrf'],
                            cookie: cookie[0],
                        });
                    });

                });
                resolve(csrf);
                req.end();
            });
        })
    }

    const GetData = async (csrf, cookie) => {
        return new Promise((resolve, reject) => {
            let body = '';
            let dataUrl = new URL('http://119.197.244.110:8080/getReportList');
            const req = http.request({
                hostname: dataUrl.hostname,
                port: dataUrl.port,
                path: dataUrl.pathname,
                timeout: 10000,
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Cookie': cookie,
                    'X-CSRF-Token': csrf,
                    'Content-Type': 'application/x-www-form-urlencoded',
                }
            }, (res) => {
                res.on('data', data => body += data);
                res.on('end', () => resolve(body));
                res.on('error', () => reject(null));
            });
            req.write(smellBody);
            req.on('error', (err) => logger.error(`westSmell.js_60 :  ${err}`));
            req.on('timeout', (timout) => { logger.error(`westWeather 타임아웃 ${timout}`); });
            req.end();
        })
    }


    const westSmellValue = (keyData, valueData, dataDate) => {
        return new Promise((resolve, reject) => {
            let InsertValue = [];
            for (let i = 0; i < keyData.length; i++) {
                let replace = keyData[i].replace('m', '').split('_');
                InsertValue.push({
                    sys_net_region_id: 28260,
                    sys_net_group_id: 28260,
                    sys_net_node_id: parseInt(replace[0]),
                    raw_mem_addr: parseInt(replace[1]),
                    raw_mem_value: valueData[i],
                    raw_timestamp: dataDate
                });
            }
            resolve(InsertValue);
        })
    }

    const westSmellPost = async (data) => {
        return new Promise(async (resolve, reject) => {
            for (let i = 0; i < data.length; i++) {
                await fetch(`http://${api.apiUrl}/api/crawling/raw`, {
                    method: "POST",
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data[i])
                }).then((res) => { return res.json() }).then((res) => {
                    resolve(res);
                }).catch((error) => {
                    logger.error(`westSmell.js_95 : ${error}`);
                    resolve();
                });
            }
        })
    }



    let session;
    const run = async () => {
        session = await cookieCsrf();
        logger.info(`westSmell cookie&csrf success`);

        session = await GetData(session.csrf, session.cookie);
        logger.info(`westWeather data get success`);

        let jsonData = JSON.parse(session);
        console.log(jsonData);

        if (jsonData.data.length !== 0) {
            let dataDate = jsonData.data[0]?.date;
            let dataValue = jsonData.data[0];

            delete dataValue.date;
            delete dataValue.RNUM;

            let KeyData = Object.keys(dataValue);
            let ValueData = Object.values(dataValue);

            session = await westSmellValue(KeyData, ValueData, dataDate);
            logger.info(`westSmell data posting`);
            session = await westSmellPost(session);
            logger.info(`westSmell 데이터 전송 성공`);
        } else {
            logger.info(`westSmell.js 데이터 0개`);
        }
    }

    run().catch((reason) => {
        logger.error(`westSmell.js : ${reason}`);
        return null;
    });
}

