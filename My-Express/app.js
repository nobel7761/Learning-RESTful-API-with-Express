const express = require('express');
const fs = require('fs');
const app = express();

app.use(express.json());

app.get('/', (request, response) => {
    response.send("Hello from express world!");
})

app.get('/api/students', (request, response) => {
    fs.readFile('./db.json', 'utf-8', (err, data) => {
        response.send(data);
    })
})

app.post('/api/students', (request, response) => {
    const student = request.body;
    fs.readFile('./db.json', 'utf-8', (err, data) => {
        const students = JSON.parse(data);
        students.students.push(student);
        fs.writeFile('./db.json', JSON.stringify(students), (err) => {
            response.send(student);
        })
    })
})

const port = 3000;
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})