const http = require('http');
const api = require('../data/apiPort');
const logger = require('../log/logger');

exports.westWeather = () => {
    const now = new Date()
    const utcNow = now.getTime() + now.getTimezoneOffset() * 60 * 1000
    const koreaTimeDiff = 9 * 120 * 60 * 1000
    const koreaNow = new Date(utcNow + koreaTimeDiff).toISOString()
    const update = koreaNow.replaceAll('T', ' ')
    const date = update.replaceAll('Z', ' ').substring(0, 10);
    let bodyData = `start=0&end=10&sort=date&ord=desc&sdate=${date} 00:00:00&edate=${date} 23:59:59&date=date_5minute&d[0].n=1&d[0].s=8192&d[0].c=m1_8192&d[1].n=1&d[1].s=8448&d[1].c=m1_8448&d[2].n=1&d[2].s=28672&d[2].c=m1_28672&d[3].n=1&d[3].s=28928&d[3].c=m1_28928&d[4].n=1&d[4].s=29184&d[4].c=m1_29184&d[5].n=1&d[5].s=29696&d[5].c=m1_29696&d[6].n=2&d[6].s=8192&d[6].c=m2_8192&d[7].n=2&d[7].s=8448&d[7].c=m2_8448&d[8].n=2&d[8].s=28672&d[8].c=m2_28672&d[9].n=2&d[9].s=28928&d[9].c=m2_28928&d[10].n=2&d[10].s=29184&d[10].c=m2_29184&d[11].n=2&d[11].s=29696&d[11].c=m2_29696&d[12].n=3&d[12].s=8192&d[12].c=m3_8192&d[13].n=3&d[13].s=8448&d[13].c=m3_8448&d[14].n=3&d[14].s=28672&d[14].c=m3_28672&d[15].n=3&d[15].s=28928&d[15].c=m3_28928&d[16].n=3&d[16].s=29184&d[16].c=m3_29184&d[17].n=3&d[17].s=29696&d[17].c=m3_29696&d[18].n=4&d[18].s=8192&d[18].c=m4_8192&d[19].n=4&d[19].s=8448&d[19].c=m4_8448&d[20].n=4&d[20].s=28672&d[20].c=m4_28672&d[21].n=4&d[21].s=28928&d[21].c=m4_28928&d[22].n=4&d[22].s=29184&d[22].c=m4_29184&d[23].n=4&d[23].s=29696&d[23].c=m4_29696&d[24].n=5&d[24].s=8192&d[24].c=m5_8192&d[25].n=5&d[25].s=8448&d[25].c=m5_8448&d[26].n=5&d[26].s=28672&d[26].c=m5_28672&d[27].n=5&d[27].s=28928&d[27].c=m5_28928&d[28].n=5&d[28].s=29184&d[28].c=m5_29184&d[29].n=5&d[29].s=29696&d[29].c=m5_29696&d[30].n=6&d[30].s=8192&d[30].c=m6_8192&d[31].n=6&d[31].s=8448&d[31].c=m6_8448&d[32].n=6&d[32].s=28672&d[32].c=m6_28672&d[33].n=6&d[33].s=28928&d[33].c=m6_28928&d[34].n=6&d[34].s=29184&d[34].c=m6_29184&d[35].n=6&d[35].s=29696&d[35].c=m6_29696&d[36].n=7&d[36].s=8192&d[36].c=m7_8192&d[37].n=7&d[37].s=8448&d[37].c=m7_8448&d[38].n=7&d[38].s=28672&d[38].c=m7_28672&d[39].n=7&d[39].s=28928&d[39].c=m7_28928&d[40].n=7&d[40].s=29184&d[40].c=m7_29184&d[41].n=7&d[41].s=29696&d[41].c=m7_29696&d[42].n=8&d[42].s=8192&d[42].c=m8_8192&d[43].n=8&d[43].s=8448&d[43].c=m8_8448&d[44].n=8&d[44].s=28672&d[44].c=m8_28672&d[45].n=8&d[45].s=28928&d[45].c=m8_28928&d[46].n=9&d[46].s=8192&d[46].c=m9_8192&d[47].n=9&d[47].s=8448&d[47].c=m9_8448&d[48].n=9&d[48].s=28672&d[48].c=m9_28672&d[49].n=9&d[49].s=28928&d[49].c=m9_28928&d[50].n=10&d[50].s=8192&d[50].c=m10_8192&d[51].n=10&d[51].s=8448&d[51].c=m10_8448&d[52].n=10&d[52].s=28672&d[52].c=m10_28672&d[53].n=10&d[53].s=28928&d[53].c=m10_28928&d[54].n=10&d[54].s=29184&d[54].c=m10_29184&d[55].n=10&d[55].s=29696&d[55].c=m10_29696&d[56].n=11&d[56].s=8192&d[56].c=m11_8192&d[57].n=11&d[57].s=8448&d[57].c=m11_8448&d[58].n=11&d[58].s=28672&d[58].c=m11_28672&d[59].n=11&d[59].s=28928&d[59].c=m11_28928&d[60].n=12&d[60].s=8192&d[60].c=m12_8192&d[61].n=12&d[61].s=8448&d[61].c=m12_8448&d[62].n=12&d[62].s=28672&d[62].c=m12_28672&d[63].n=12&d[63].s=28928&d[63].c=m12_28928&d[64].n=13&d[64].s=8192&d[64].c=m13_8192&d[65].n=13&d[65].s=8448&d[65].c=m13_8448&d[66].n=13&d[66].s=28672&d[66].c=m13_28672&d[67].n=13&d[67].s=28928&d[67].c=m13_28928&d[68].n=14&d[68].s=8192&d[68].c=m14_8192&d[69].n=14&d[69].s=8448&d[69].c=m14_8448&d[70].n=14&d[70].s=28672&d[70].c=m14_28672&d[71].n=14&d[71].s=28928&d[71].c=m14_28928&d[72].n=15&d[72].s=8192&d[72].c=m15_8192&d[73].n=15&d[73].s=8448&d[73].c=m15_8448&d[74].n=15&d[74].s=28672&d[74].c=m15_28672&d[75].n=15&d[75].s=28928&d[75].c=m15_28928&d[76].n=16&d[76].s=8192&d[76].c=m16_8192&d[77].n=16&d[77].s=8448&d[77].c=m16_8448&d[78].n=16&d[78].s=28672&d[78].c=m16_28672&d[79].n=16&d[79].s=28928&d[79].c=m16_28928&d[80].n=17&d[80].s=8192&d[80].c=m17_8192&d[81].n=17&d[81].s=8448&d[81].c=m17_8448&d[82].n=17&d[82].s=28672&d[82].c=m17_28672&d[83].n=17&d[83].s=28928&d[83].c=m17_28928&d[84].n=100&d[84].s=8192&d[84].c=m100_8192&d[85].n=100&d[85].s=8448&d[85].c=m100_8448&d[86].n=100&d[86].s=28672&d[86].c=m100_28672&d[87].n=100&d[87].s=28928&d[87].c=m100_28928&d[88].n=100&d[88].s=29184&d[88].c=m100_29184&d[89].n=100&d[89].s=29696&d[89].c=m100_29696&d[90].n=201&d[90].s=8192&d[90].c=m201_8192&d[91].n=201&d[91].s=8448&d[91].c=m201_8448&d[92].n=201&d[92].s=28672&d[92].c=m201_28672&d[93].n=201&d[93].s=28928&d[93].c=m201_28928&d[94].n=202&d[94].s=8192&d[94].c=m202_8192&d[95].n=202&d[95].s=28672&d[95].c=m202_28672&d[96].n=202&d[96].s=28928&d[96].c=m202_28928&d[97].n=203&d[97].s=8192&d[97].c=m203_8192&d[98].n=203&d[98].s=8448&d[98].c=m203_8448&d[99].n=203&d[99].s=28672&d[99].c=m203_28672&d[100].n=203&d[100].s=28928&d[100].c=m203_28928&d[101].n=204&d[101].s=8192&d[101].c=m204_8192&d[102].n=204&d[102].s=8448&d[102].c=m204_8448&d[103].n=204&d[103].s=28672&d[103].c=m204_28672&d[104].n=204&d[104].s=28928&d[104].c=m204_28928&d[105].n=205&d[105].s=8192&d[105].c=m205_8192&d[106].n=205&d[106].s=8448&d[106].c=m205_8448&d[107].n=205&d[107].s=28672&d[107].c=m205_28672&d[108].n=205&d[108].s=28928&d[108].c=m205_28928&d[109].n=206&d[109].s=8192&d[109].c=m206_8192&d[110].n=206&d[110].s=28672&d[110].c=m206_28672&d[111].n=206&d[111].s=28928&d[111].c=m206_28928&d[112].n=207&d[112].s=8192&d[112].c=m207_8192&d[113].n=207&d[113].s=8448&d[113].c=m207_8448&d[114].n=207&d[114].s=28672&d[114].c=m207_28672&d[115].n=207&d[115].s=28928&d[115].c=m207_28928&d[116].n=208&d[116].s=8192&d[116].c=m208_8192&d[117].n=208&d[117].s=8448&d[117].c=m208_8448&d[118].n=208&d[118].s=28672&d[118].c=m208_28672&d[119].n=208&d[119].s=28928&d[119].c=m208_28928&d[120].n=209&d[120].s=8192&d[120].c=m209_8192&d[121].n=209&d[121].s=8448&d[121].c=m209_8448&d[122].n=209&d[122].s=28672&d[122].c=m209_28672&d[123].n=209&d[123].s=28928&d[123].c=m209_28928&d[124].n=210&d[124].s=8192&d[124].c=m210_8192&d[125].n=210&d[125].s=28672&d[125].c=m210_28672&d[126].n=210&d[126].s=28928&d[126].c=m210_28928&d[127].n=211&d[127].s=8192&d[127].c=m211_8192&d[128].n=211&d[128].s=8448&d[128].c=m211_8448&d[129].n=211&d[129].s=28672&d[129].c=m211_28672&d[130].n=211&d[130].s=28928&d[130].c=m211_28928&d[131].n=212&d[131].s=8192&d[131].c=m212_8192&d[132].n=212&d[132].s=8448&d[132].c=m212_8448&d[133].n=212&d[133].s=28672&d[133].c=m212_28672&d[134].n=212&d[134].s=28928&d[134].c=m212_28928&d[135].n=213&d[135].s=8192&d[135].c=m213_8192&d[136].n=213&d[136].s=8448&d[136].c=m213_8448&d[137].n=213&d[137].s=28672&d[137].c=m213_28672&d[138].n=213&d[138].s=28928&d[138].c=m213_28928&d[139].n=401&d[139].s=8192&d[139].c=m401_8192&d[140].n=401&d[140].s=8448&d[140].c=m401_8448&d[141].n=401&d[141].s=28672&d[141].c=m401_28672&d[142].n=401&d[142].s=28928&d[142].c=m401_28928&d[143].n=401&d[143].s=29696&d[143].c=m401_29696&d[144].n=402&d[144].s=8192&d[144].c=m402_8192&d[145].n=402&d[145].s=8448&d[145].c=m402_8448&d[146].n=402&d[146].s=28672&d[146].c=m402_28672&d[147].n=402&d[147].s=28928&d[147].c=m402_28928&d[148].n=402&d[148].s=29696&d[148].c=m402_29696&d[149].n=403&d[149].s=8192&d[149].c=m403_8192&d[150].n=403&d[150].s=8448&d[150].c=m403_8448&d[151].n=403&d[151].s=28672&d[151].c=m403_28672&d[152].n=403&d[152].s=28928&d[152].c=m403_28928&d[153].n=403&d[153].s=29696&d[153].c=m403_29696&d[154].n=403&d[154].s=29952&d[154].c=m403_29952&d[155].n=404&d[155].s=8192&d[155].c=m404_8192&d[156].n=404&d[156].s=8448&d[156].c=m404_8448&d[157].n=404&d[157].s=28672&d[157].c=m404_28672&d[158].n=404&d[158].s=28928&d[158].c=m404_28928&d[159].n=404&d[159].s=29696&d[159].c=m404_29696&d[160].n=405&d[160].s=8192&d[160].c=m405_8192&d[161].n=405&d[161].s=8448&d[161].c=m405_8448&d[162].n=405&d[162].s=28672&d[162].c=m405_28672&d[163].n=405&d[163].s=28928&d[163].c=m405_28928&d[164].n=405&d[164].s=29696&d[164].c=m405_29696`

    const req = http.get("http://119.197.244.110:8080/login", async (res) => {
        let cookie = res.headers["set-cookie"]
        let csrfVal = [];
        const csrf = await new Promise((resolve, reject) => {
            let data = ''
            res.on('data', (c) => data += c)
            res.on('end', () => {
                const regex = /name="_csrf" value="(?<csrf>[^\\"]+)"/
                resolve(regex.exec(data).groups['csrf'])
            })
        });
        csrfVal.push(csrf);


        try{
            fetch('http://119.197.244.110:8080/getReportList', {
                method: "POST",
                headers: {
                    "Accept": "application/json, text/javascript, */*; q=0.01",
                    "Accept-Encoding": "gzip, deflate",
                    "Accept-Language": "ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7",
                    "Connection": "keep-alive",
                    "Content-Length": "7287",
                    "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
                    "Cookie": cookie[0],
                    "Host": "119.197.244.110:8080",
                    "Origin": "http://119.197.244.110:8080",
                    "Referer": "http://119.197.244.110:8080/weather/list?cate=1573022417941&subcate=1573022438378",
                    "User-Agent": "Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Mobile Safari/537.36",
                    "X-CSRF-Token": csrfVal[0],
                    "X-Requested-With": "XMLHttpRequest"
                },
                body: bodyData  
            }).then((res0) => {return res0.json()}).then(async(res) => {
                if (res.data.length === 0) {
                    logger.info(`westWeather 기상 success`);
                    return null;
                } else {
                    let dataDate = res.data[0].date;
                    let data = res.data[0];
                    delete data.date;
                    delete data.RNUM;

                    let KeyData = Object.keys(data);
                    let ValueData = Object.values(data);

                    let InsertValue = [];
                    
                    for (let i = 0; i < KeyData.length; i++) {
                        let replace = KeyData[i].replace('m', '').split('_');

                        InsertValue.push({
                            sys_net_region_id: 28260,
                            sys_net_group_id: 28260,
                            sys_net_node_id: parseInt(replace[0]),
                            raw_mem_addr: parseInt(replace[1]),
                            raw_mem_value: ValueData[i] === '북' ? 0 : (
                                ValueData[i] === '북북동' ? 22.5 : (
                                    ValueData[i] === '북동' ? 45 : (
                                        ValueData[i] === '동북둥' ? 67.5 : (
                                            ValueData[i] === '동' ? 90 : (
                                                ValueData[i] === '동남동' ? 112.5 : (
                                                    ValueData[i] === '남동' ? 135 : (
                                                        ValueData[i] === '남남동' ? 157.5 : (
                                                            ValueData[i] === '남' ? 180 : (
                                                                ValueData[i] === '남남서' ? 202.5 : (
                                                                    ValueData[i] === '남서' ? 225 : (
                                                                        ValueData[i] === '서남서' ? 247.5 : (
                                                                            ValueData[i] === '서' ? 270 : (
                                                                                ValueData[i] === '서북서' ? 292.5 : (
                                                                                    ValueData[i] === '북서' ? 315 : (
                                                                                        ValueData[i] === '북북서' ? 337.5 : ValueData[i]
                                                                                    )
                                                                                )
                                                                            )
                                                                        )
                                                                    )
                                                                )
                                                            )
                                                        )
                                                    )
                                                )
                                            )
                                        )
                                    )
                                )
                            ),
                            raw_timestamp: dataDate
                        });
                    }

                    logger.info(`westWeather 기상 데이터: ${InsertValue.length} 개`);
                    //DB Insert 할 API 연동
                    for (let i = 0; i < InsertValue.length; i++) {
                        await new Promise((resolve, reject) => {
                            fetch(`http://${api.apiUrl}/api/crawling/raw`, {
                                method: "POST",
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({
                                    sys_net_region_id: InsertValue[i].sys_net_region_id,
                                    sys_net_group_id: InsertValue[i].sys_net_group_id,
                                    sys_net_node_id: InsertValue[i].sys_net_node_id,
                                    raw_mem_addr: InsertValue[i].raw_mem_addr,
                                    raw_mem_value: InsertValue[i].raw_mem_value,
                                    raw_timestamp: InsertValue[i].raw_timestamp
                                })
                            }).then((res)=>{return res.json()}).then(()=>{
                                
                                resolve();
                            }).catch((err)=>{
                                logger.error(`westWeather : ${err}`);
                                resolve();
                            })
                        })
                    }

                }
            })
        }catch(err){
            logger.error(`westWeather.js_133 : ${err}`);
            return null;
        }
    })
    req.on('timeout', () => {
        logger.error(`westWeather.js_139 : 타임아웃 `);
        req.abort();
    });
    req.on('error', (err) => {
        logger.error(`westWeather.js_142 : ${err}`);
    });
    req.end();
    logger.info(`westWeather 기상 insert success`);
}
