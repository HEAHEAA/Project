module.exports = {
    selectSiteInfo: `SELECT * FROM site_crawling.site_info order by site_id`,

    selectLoginInfo: `SELECT ` +
        `login_id, site_idx, login_success, login_timestamp::text, login_data_success, login_bigo` +
        ` FROM site_crawling.login_info ` + `ORDER BY site_idx DESC, login_timestamp DESC`,

    selectLoginDateInfoByIdQuery: `SELECT login_id, site_idx, login_success, login_timestamp::text, login_data_success, login_bigo` +
        ` FROM site_crawling.login_info where login_timestamp ` +
        `between to_timestamp($1, 'YYYY-MM-DD HH24:MI:SS') and ` +
        `to_timestamp($2, 'YYYY-MM-DD HH24:MI:SS') and ` +
        `site_idx = $3 order by login_timestamp desc`,


    selectLoginDateInfoAllQuery: `SELECT login_id, site_idx, login_success, login_timestamp::text, login_data_success, login_bigo` +
        ` FROM site_crawling.login_info where login_timestamp ` +
        `between to_timestamp($1, 'YYYY-MM-DD HH24:MI:SS') and ` +
        `to_timestamp($2, 'YYYY-MM-DD HH24:MI:SS') ` +
        `order by login_timestamp desc`,


    selectLoginLastInfo: `select login_id, site_idx, login_success, login_timestamp::text, login_data_success, login_bigo ` +
        `from site_crawling.login_info where (site_idx,login_timestamp) in ` +
        `(select site_idx, max(login_timestamp) as login_timestamp from site_crawling.login_info group by` +
        ` site_idx )order by login_timestamp desc , site_idx asc`,

    selectAvgTodayQuery : `select login_timestamp::text, count(*)` +
        `from site_crawling.login_info ` +
        `WHERE login_timestamp BETWEEN to_timestamp($1, 'YYYY-MM-DD HH24:MI:SS') `+
        `AND to_timestamp($2, 'YYYY-MM-DD HH24:MI:SS') AND login_success = true ` +
        `GROUP BY login_timestamp ORDER BY login_timestamp`,

    loginUpdateQuery: `UPDATE site_crawling.login_info SET` +
        ` login_success= $1,` +
        ` login_data_success= $2,` +
        ` login_bigo= $3` +
        ` WHERE site_idx= $4 AND login_timestamp= $5`,

    selectErrorInfo: `SELECT ` +
        `error_id, site_idx, error_state, error_break_date::text, error_renew_date::text, error_update_check, error_reason, error_reason_user` +
        ` FROM site_crawling.error_info order by error_id`,

    selectErrDateAllQuery: `SELECT error_id, site_idx, error_state, error_break_date::text, error_renew_date::text, error_update_check, error_reason, error_reason_user ` +
        `FROM site_crawling.error_info where (site_idx, error_break_date) in (SELECT site_idx, MAX(error_break_date) ` +
        `FROM site_crawling.error_info WHERE error_break_date BETWEEN to_timestamp($1, 'YYYY-MM-DD HH24:MI:SS')  AND to_timestamp($2, 'YYYY-MM-DD HH24:MI:SS') ` +
        `GROUP BY site_idx) ORDER BY error_break_date DESC` ,

    selectErrDateByIdQuery: `SELECT error_id, site_idx, error_state, error_break_date::text, error_renew_date::text, error_update_check, error_reason, error_reason_user ` +
        `FROM site_crawling.error_info where error_break_date ` +
        `between to_timestamp($1, 'YYYY-MM-DD HH24:MI:SS') and ` +
        `to_timestamp($2, 'YYYY-MM-DD HH24:MI:SS') and site_idx=$3 order by error_break_date desc`,


    errorUpdateQuery: `UPDATE site_crawling.error_info SET` +
        ` site_idx= $1,` +
        ` error_state= $2,` +
        ` error_break_date= $3,` +
        ` error_renew_date= $4,` +
        ` error_update_check= $5,` +
        ` error_reason= $6,` +
        ` error_reason_user= $7` +
        ` WHERE error_id= $8`,

    selectLayoutInfo: `select * from site_crawling.layout_info order by lay_id`,
    updateLayoutInfo: `update site_crawling.layout_info set ` +
    `i=$1, x=$2, y=$3, w=$4, h=$5 where lay_id=$6`,

};
