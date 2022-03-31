const express = require('express');
const connect = require('./schemas');
const app = express();
const port = 3000;

connect();

const postsRouter = require('./routes/posts');

const requestMiddleware = (req, res, next) => {
    console.log('Request URL:', req.originalUrl, ' - ', new Date());
    next();
};
app.use(express.static('static'));
app.use(express.json());
app.use(requestMiddleware);

app.use('/api', express.urlencoded({ extended: false }), postsRouter);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/static/index.html');
});

app.get('/register', (req, res) => {
    res.sendFile(__dirname + '/static/register.html');
});

app.get('/post', (req, res) => {
    res.sendFile(__dirname + '/static/post.html');
});

app.get('/detail', (req, res) => {
    res.sendFile(__dirname + '/static/detail.html');
});

app.get('/revise', (req, res) => {
    res.sendFile(__dirname + '/static/revise.html');
});

app.get('/main', (req, res) => {
    res.sendFile(__dirname + '/static/main.html');
});

app.listen(port, () => {
    console.log(port, '포트로 서버가 켜졌어요!');
});
