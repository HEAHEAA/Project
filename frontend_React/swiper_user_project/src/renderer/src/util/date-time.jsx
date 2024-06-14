// 현재 시간 계산하기
const now = new Date()
const utcNow = now.getTime() + now.getTimezoneOffset() * 60 * 1000
const koreaTimeDiff = 9 * 120 * 60 * 1000
const koreaNow = new Date(utcNow + koreaTimeDiff)?.toISOString()
const update = koreaNow.replaceAll('T', ' ')
export const Nows = update.replaceAll('Z', ' ')?.substring(0, 10)
export const DataTime = update.replaceAll('Z', ' ')?.substring(0, 16)



const utcNow01 = now.getTime() + now.getTimezoneOffset()  * 60 * 1000 - 601000000
const koreaTimeDiff01 = 9 * 120 * 60 * 1000
const koreaNow01 = new Date(utcNow01 + koreaTimeDiff01).toISOString()
const update01 = koreaNow01.replaceAll('T', ' ')
export const Week = update01.replaceAll('Z', ' ').substring(0, 10)
