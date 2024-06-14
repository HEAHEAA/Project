const winston = require('winston');
const { createLogger, transports, format } = winston;
const { combine, timestamp, printf } = format;
const DailyRotateFile = require('winston-daily-rotate-file');
const moment = require('moment-timezone')

// 한국시간 설정
const koreanTimeFormat = () => {
    return moment().tz('Asia/Seoul').format('YYYY-MM-DD HH:mm:ss');
};

// 로그 출력 형식
const logFormat = printf(({ level, message }) => {
    return `${koreanTimeFormat()} ${level}: ${message}`;
});

// 로거파일 생성
const logger = createLogger({
    format: combine(
        timestamp(),
        logFormat
    ),
    transports: [
        new transports.Console(),
        new transports.File({ filename: './log_file/sms_error.log', level: 'error' }),
        new DailyRotateFile({
            filename: './log_file/date_log/sms_log_-%DATE%.log',
            datePattern: 'YYYY-MM-DD',
            zippedArchive: true,
            maxSize: '20m',
            maxFiles: '14d'
        })
    ]
});

module.exports = logger;