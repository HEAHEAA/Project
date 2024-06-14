const postgres = require('../db/pool');
const sql = require('../sql/settingQuery');

const setting = () => {
    postgres.query(sql.selectPNUTable, function (err, row, fields) {
        if (err) console.log(err);

        for(let i = 0; i<row.rows.length; i++){
            let value = [
                row.rows[i].pnu,
                row.rows[i].jibun,
                false,
                ''
            ];
            postgres.query(sql.CheckTableDefaultInsert, value, function(err, row, fields){
                if(err) console.log(err);
                console.log("Insert Ok");
            }); 
        }
    });
}