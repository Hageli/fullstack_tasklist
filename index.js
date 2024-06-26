/*
const http = require('http');
const path = require('path');
const fs = require('fs');

const server = http.createServer((req, res) => {
    /*
    if(req.url ===  '/') {
        fs.readFile(
            path.join(__dirname, 'public', 'index.html'), 
            (err, content) => {
                if (err) throw err;
                res.writeHead(200, {'Content-Type': 'text/html'});
                res.end(content);
            }
        );
    }

    if(req.url ===  '/api/users') {
       const users = [
        {name: "Miro Hagelberg", age: 45},
        {name: "Orim Greblegah", age: 54}
       ];
       res.writeHead(200, {'Content-Type': 'application/json'});
       res.end(JSON.stringify(users));
    }
   let filepath = path.join(
        __dirname,
        'public', 
        req.url === '/' ? 'index.html' : req.url
    );
    
    let extname = path.extname(filepath);
    let contentType = 'text/html';
    switch(extname) {
        case '.js':
            contentType = 'text/javascript';
            break;
        case '.css':
            contentType = 'text/css';
            break;
        case '.json':
            contentType = 'application/json';
            break;
        case '.png':
            contentType = 'image/png';
            break;
        case '.jpg':
            contentType = 'image/jpg';
            break;
    }

    fs.readFile(filepath, (err, content) => {
        if(err) {
            if(err.code == 'ENOENT') {
                // PAGE NOT FOUND
                fs.readFile(
                    path.join(__dirname, 'public', '404.html'), 
                    (err, content) => {
                        if (err) throw err;
                        res.writeHead(200, {'Content-Type': 'text/html'});
                        res.end(content, 'utf8');
                });
            } else {
                // OTHER ERROR
                res.writeHead(500);
                res.end(`Server Error: ${err.code}`);
            }
        } else {
            // SUCCESS
            res.writeHead(200, {'Content-Type': contentType});
            res.end(content, 'utf8');
        }
    })
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

*/

const express = require('express');
const path = require('path');
const logger = require('./middleware/logger');
const exphbs = require('express-handlebars');
const Members = require('./Members');

const app = express();
const PORT = process.env.PORT || 5000;
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// app.use(logger);
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');


app.get('/', (req, res) => res.render('index', {
    title: "Members App",
    Members
}));

// STATIC FILES
app.use(express.static(path.join(__dirname, 'public')));

//ROUTERS
app.use('/api/members', require('./routes/api/members'));

app.listen(PORT, () => console.log(`Server running on ${PORT}`));