// need to load the required module named express
//this returns a function ,store it in a const need express
const express = require('express');

//you need to call this function and it returns an object
const app = express();

 
//express.json method is called to create a middleware that will be used in the req pipeline
app.use(express.json());

//this object has many useful methods
// this method takes 2 arugements - path ie url or http to represent root of website
//2nd is call back function which again has 2 argmuents with a code block
app.get('/', (req,res) =>{
    res.send('Hello World!!! ');
});


const books = [
    {book_id:1, book_name: 'Automic Habits', author: 'James Clear'},
    {book_id:2, book_name: 'The Secret', author: 'Rhonda Brynes'},
    {book_id:3, book_name: 'Harry Potter and the Chamber of Secrets', author: 'J K Rowling'}
];



app.get('/api/books',(req, res)=>{
    res.send(books);
});

app.get('/api/books/:book_id', (req,res) => {
    let id = parseInt(req.params.book_id)
    //res.send(`This handler has received the value ${req.params.book_id} for ID`);
    let book = books.find(c => c.book_id === id);
    if (!book) res.status(404).send(`The book with id ${id} is NOT found`);
    res.send(book);
})

app.post('/api/books',(req,res)=>{
    //joi can be used for validation
    // if ((!req.body.book_name) || (req.body.book_name.length < 3) )
    //     res.status(400).send(`Book name NOT provided or less than 3 charactes `)
    //     return;
    const book = {
        book_id: books.length + 1,
        book_name: req.body.book_name,
        author: req.body.author
    };
    books.push(book);
    res.send(book);
});

app.put('/api/books/:book_id',(req,res)=>{
    let id = parseInt(req.params.book_id);
    const book = books.find(c => c.book_id === id);
    if (!book) res.status(404).send(`The book with id ${id} is NOT found`);

    
    book.book_name = req.body.book_name,
    book.author = req.body.author
    
    res.send(book);

});

app.delete('/api/books/:book_id', (req,res)=>{
    let id = parseInt(req.params.book_id);
    const book = books.find(c => c.book_id === id);
    if (!book) res.status(404).send(`The book with id ${id} is NOT found`);

    const index = books.indexOf(book);
    console.log(index);
    books.splice(index,1);
    res.send(books);

});



//need to use an environment variable for the port
//this is done using a process obj
const port = process.env.PORT || 8080
app.listen(port,() => console.log(`Listening on port ${port}..`));

