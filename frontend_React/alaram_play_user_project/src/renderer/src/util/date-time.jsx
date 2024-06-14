// 현재 시간 계산하기
const now = new Date()
const utcNow = now.getTime() + now.getTimezoneOffset() * 60 * 1000
const koreaTimeDiff = 9 * 120 * 60 * 1000
const koreaNow = new Date(utcNow + koreaTimeDiff)?.toISOString()
const update = koreaNow.replaceAll('T', ' ')
export const Nows = update.replaceAll('Z', ' ')?.substring(0, 16)
export const DataTime = update.replaceAll('Z', ' ')?.substring(10, 16)
