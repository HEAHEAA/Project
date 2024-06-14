const winston = require('winston');
const { createLogger, transports, format } = winston;
const { combine, timestamp, printf } = format;
const DailyRotateFile = require('winston-daily-rotate-file');
const moment = require('moment-timezone')

// 한국시간으로 출력하긔
const koreanTimeFormat = () => {
    return moment().tz('Asia/Seoul').format('YYYY-MM-DD HH:mm:ss');
};

// 로그 출력 형식
const logFormat = printf(({ level, message }) => {
    return `${koreanTimeFormat()} ${level}: ${message}`;
});


// 로거를 생성
const logger = createLogger({
    format: combine(
        timestamp(),
        logFormat
    ),
    transports: [
        new transports.Console(),
        new transports.File({ filename: './logger_file/error.log', level: 'error' }), // 에러 로그만
        new transports.File({ filename: './logger_file/crawling_all.log' }),
        new DailyRotateFile({
            filename: './logger_file/date_logger/crawling-%DATE%.log',
            datePattern: 'YYYY-MM-DD',
            zippedArchive: true,
            maxSize: '20m',
            maxFiles: '14d'
        })
    ]
});

module.exports = logger;