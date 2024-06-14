const query = {
    selectCheckLsmd: "select * from pyeongtaek_crawling.pyeongtaek_lsmd_check" +
    " where lsmd_jibun similar to '(%%전|%% 전|%%전%%|%%답|%% 답|%%답%%|%%과|%% 과|%%과%%)' and lsmd_lsmd_check = false and not lsmd_bigo='요청 데이터 없음'" +
    "order by lsmd_no limit 1 offset $1",
    UpdatecheckLsmdTrue: "UPDATE pyeongtaek_crawling.pyeongtaek_lsmd_check " +
    "SET lsmd_pnu_code=$1, lsmd_jibun=$2, lsmd_lsmd_check=$3 , lsmd_bigo=$4" +
    "WHERE lsmd_no=$5",
    InsertAllowLsmd: "INSERT INTO pyeongtaek_crawling.pyeongtaek_lsmd_allow "+
    "(allow_pnu_code, allow_year, allow_datetime, allow_type, allow_pnu_nm, allow_acid, allow_vldpha," +
    " allow_vldsia, allow_om, allow_posi_mg, allow_posi_k, allow_posi_ca, allow_selc, allow_soil_data_check, allow_reg_date) " +
    "VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)"
}

module.exports = query;