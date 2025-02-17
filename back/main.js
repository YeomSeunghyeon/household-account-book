const express = require('express')   ;
const app = express()    ;
const cors = require('cors');
const { createProxyMiddleware } = require('http-proxy-middleware');

app.use(cors({
    origin: 'http://localhost:3000', // React 앱 도메인
    credentials: true,
}));
app.set('views',__dirname + '/views');
app.set('view engine','ejs');

//사용자 정의 모듈

const recordRouter=require('./router/recordRouter')
const categoryRouter=require('./router/categoryRouter')
const addRouter=require('./router/addRouter')
// 세션 모듈, 세션 DB 저장 모듈
var session = require('express-session'); 
var MySqlStore = require('express-mysql-session')(session);
var options = {
    host : 'localhost',
    user : 'root',
    password : 'yhg331228',
    database : 'account'
    };
var sessionStore = new MySqlStore(options);

app.use(session({
    secret : 'keyboard cat',
    resave : false,
    saveUninitialized : true,
    store : sessionStore
 }));
 app.use('/public', express.static('public'));
// body 파서 모듈 
var bodyParser = require('body-parser');
app.use(bodyParser.json());

// 라우터 호출

app.use('/record',recordRouter);

app.use('/category',categoryRouter);

app.use('/add',addRouter);
  
app.listen(3001, () => console.log('Example app listening on port 3001'))  