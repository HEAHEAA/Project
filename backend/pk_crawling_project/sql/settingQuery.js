const query = {
    selectPNUTable: "select * from pyeongtaek_crawling.pyeongtaek_lsmd where jibun similar to '(%%전|%% 전|%%전%%|%%답|%% 답|%%답%%|%%과|%% 과|%%과%%)' order by id",
    CheckTableDefaultInsert: 'INSERT INTO pyeongtaek_crawling.pyeongtaek_lsmd_check'+
    '(lsmd_pnu_code, lsmd_jibun, lsmd_lsmd_check, lsmd_bigo)' +
    'VALUES($1, $2, $3, $4);'
}

module.exports = query;