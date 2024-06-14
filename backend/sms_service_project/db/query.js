exports.updateQuery = `
UPDATE MEDIST.dbo.SMS_CONTENT
SET SENDER = @sender, 
    RECEIVER = @receiver, 
    SMS_TXT = @smsTxt, 
    SMS_STATE = @smsState, 
    ALARM_TYPE = @alarmType, 
    REG_DATE = @regDate
WHERE SMS_IDX = @smsIdx;
`;