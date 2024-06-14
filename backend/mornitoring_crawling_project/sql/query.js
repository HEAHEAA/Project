const query = {
    site_info: 'INSERT INTO site_crawling.site_info(site_name, site_url, site_region) VALUES ' +
        '($1, $2, $3) RETURNING *',
    login_info: 'INSERT INTO site_crawling.login_info(site_idx, login_success, login_timestamp, login_data_success, login_bigo) VALUES ' +
        '($1, $2, $3, $4, $5) RETURNING *',
    error_info: 'INSERT INTO site_crawling.error_info(' +
        'site_idx, error_state, error_break_date, error_renew_date, error_update_check, error_reason) VALUES ' +
        '($1, $2, $3, $4, $5, $6) RETURNING *'
}

module.exports = query;