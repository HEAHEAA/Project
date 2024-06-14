const westDust = require('./total/westDust');
const westSmell = require('./total/westSmell');
const westWeather = require('./total/westWeather');
const yeonsu = require('./total/yeonsu');
const namdongFive = require('./total/namdongMinute');
const namdongHour = require('./total/namdongHour');
const odcloud = require('./total/odcloud');
const logger = require('./log/logger');


//시작 로그

logger.info(`================ crawling logger start =================`);


setInterval(()=>westDust.westDust(), 60000 * 5);
setInterval(()=>westSmell.westSmell(), 60000 * 5);
setInterval(()=>westWeather.westWeather(), 60000 * 5);
setInterval(()=>yeonsu.yeonsu(), 60000 * 5);
setInterval(()=>odcloud.odclouds(), 60000 * 30);
setInterval(()=>namdongFive.namdongMinute(), 60000 * 30);
setInterval(()=>namdongHour.namdongHour(), 60000 * 30);


// westDust.westDust();
// westSmell.westSmell();
// westWeather.westWeather();
// yeonsu.yeonsu();
// odcloud.odclouds();
// namdongFive.namdongMinute();
// namdongHour.namdongHour();

