const http = require('http');

let userCountHome = 0;
let userCountAbout = 0;

const server = http.createServer((req, res) => {

    if (req.url === '/') {
        userCountHome++;
        res.writeHead(200, {'Content-Type' : 'text/html; charset=UTF-8'});
        res.write('<h1>Корневая страница</h1>');
        res.write('Количество просмотров:' + userCountHome);
        res.end('<a href="/about">Ссылка на страницу /about</a>');
    } else if (req.url === '/about') {
        userCountAbout++;
        res.writeHead(200, {'Content-Type' : 'text/html; charset=UTF-8'});
        res.write('<h1><h1>Страница about</h1>');
        res.write('Количество просмотров:' + userCountAbout);
        res.end('<a href="/">Ссылка на страницу /</a>');
    } else {
        res.writeHead(404, {'Content-Type' : 'text/html; charset=UTF-8'});
        res.write('<h1><h1>Ошибка! Страница 404...</h1>')
        res.end('<a href="/">Вернуться на главную страницу</a>');    
    }
});

const port = 3000;

server.listen(port);