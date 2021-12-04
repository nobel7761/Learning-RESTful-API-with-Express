const express = require('express');
const app = express();
const studentRouter = require('./routers/studentRouter');

app.use(express.json());

app.use((req, res, next) => {
    console.log("I am middleware 1!");
    next();
})

app.use((req, res, next) => {
    console.log("I am middleware 1!");
    next();
})

app.use(express.urlencoded({ extended: true }))
app.use('/api/students', studentRouter);

app.get('/', (request, response) => {
    console.log('I am GET Request Middleware!');
    response.send("Hello from express world!");
})

const port = 3000;
app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
})