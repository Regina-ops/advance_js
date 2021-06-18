// const { a } = require('./func.js');
// const foo = require('./func.js');
// const foo = require('./func/');
// const os = require('os');
const fs = require('fs');
const http = require('http');

const server = http.createServer((req, res) => {
    if (req.url === '/') {
        res.write('Hello World!');
        res.end();
    }
    if (req.url === '/api/users') {
        fs.readFile('db.json', 'utf-8', (err, data) => {
            if (err) {
                res.write('Ошибка');
                res.end();
            }
            else {
                res.write(data);
                res.end();
            }
        });
    }
});

server.listen(5555);
server.on('connection', (socket) => {
    console.log('New connection!');
});
// const moment = require('moment');
// console.log(foo(123));
// console.log(foo.a(123));
// console.log(a(123));
// console.log(os.platform());
// console.log(os.cpus());
// console.log(os.type());
// console.log(moment());

// const users = [{name: 'Ann', age: 20}];
//
// fs.writeFile('db.json', JSON.stringify(users), (err) => {
//     if (err) console.log(err);
//     else console.log('Ok!');
// });

// fs.readFile('db.json', 'utf-8', (err, data) => {
//     if (err) console.log(err);
//     else {
//         const list = JSON.parse(data);
//         list.push({name: 'Vasya', age: 30});
//
//         fs.writeFile('db.json', JSON.stringify(list), (err) => {
//             if (err) console.log(err);
//             else console.log('Ok!');
//         });
//     }
// });
