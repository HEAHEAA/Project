const siteController = require('./controller/siteController');
const layoutController = require('./controller/layoutController');
const express = require('express');
const app = express();
const port = 8180;

app.use(express.json());

app.get('/api/siteInfo', siteController.GetSiteInfo);

app.get('/api/loginInfo', siteController.GetLoginInfo);

app.get('/api/loginInfo/last', siteController.GetLastLoginInfo);

app.get('/api/login', siteController.GetLoginDateByIdInfo);

app.get('/api/login/all', siteController.GetLoginDateAllInfo);

app.get('/api/today/avg', siteController.GetTodayAvgInfo);

app.put('/api/loginInfo/update/:site_id', siteController.UpdateLoginInfo);

app.get('/api/errInfo', siteController.GetErrInfo);

app.get('/api/errInfo/:error_id', siteController.GetErrInfoId);

app.get('/api/err/all', siteController.GetErrDateInfo);

app.get('/api/err', siteController.GetErrDateByIdInfo);

app.put('/api/errInfo/update/:error_id', siteController.UpdateErrInfoId);


app.get('/api/layout', layoutController.GetLayout);

app.put('/api/layout/update/:lay_id', layoutController.UpdateLayout);



app.listen(port, () => {
    console.log(`Server Running ${port}`);
});
