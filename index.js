const http = require('http');
const {v4} = require('uuid');
const getBodydata = require('./util');
// 
let books = [
    {
        id: "1",
        title: 'Kitob nomi',
        pages: 150,
        author: 'Utkirbek'
    }
]

const server = http.createServer( async (req, res) => {
    if(req.url === '/books' && req.method === 'GET'){
        res.writeHead(200, {
            'Content-Type': 'application/json charset=utf8'
        })
        const resp = {
            status: "ok",
            books
        }
        res.end(JSON.stringify(resp));
    }
    else if(req.url === '/books' && req.method === 'POST'){
        const data = await getBodydata(req)
        const {title, pages, author } =  JSON.parse(data)
        // console.log(body);
        const newBooks = {
            id: v4(),
            title,
            pages,
            author
        }
        books.push(newBooks);
        const resp = {
            statust: "Yangi loyiha",
            book: newBooks
        }
        res.writeHead(200, {
            'Content-Type': 'application/json charset=utf8'
        })
        res.end(JSON.stringify(resp))
        // console.log(newBooks);
    }else if(req.url.match(/\/books\/\w+/) && req.method === 'GET'){
        const id = req.url.split('/')[2];
        const book = books.find(b => b.id === id)
            res.writeHead(200, {
                'Content-Type': 'application/json charset=utf8'
            })
            const resp = {
                statust: "Okey",
                book
            }
            res.end(JSON.stringify(resp))
    }else if(req.url.match(/\/books\/\w+/) && req.method === 'PUT'){
        const id = req.url.split('/')[2];
        const data = await getBodydata(req)
        const {title, pages, author } =  JSON.parse(data)
        const idx = books.findIndex(b => b.id === id)
        const changedBooks = {
            id: books[idx].id,
            title: title || books[idx].title,
            pages: pages || books[idx].pages,
            author: author || books[idx].author
        }
        books[idx] = changedBooks
        res.writeHead(200, {
            'Content-Type': 'application/json charset=utf8'
        })
        const resp = {
            statust: "Okey",
            book: changedBooks
        }
        res.end(JSON.stringify(resp))
    }else if(req.url.match(/\/books\/\w+/) && req.method === 'DELETE'){
        const id = req.url.split('/')[2];
        books = books.filter(b => b.id !== id)
        res.writeHead(200, {
            'Content-Type': 'application/json charset=utf8'
        })
        const resp = {
            statust: "DELETED"
        }
        res.end(JSON.stringify(resp))
    }
})

server.listen(3000, () => console.log("Server ishga tushiramiz: 3000 port"));