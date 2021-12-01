const express = require('express');
const fs = require('fs');
const app = express();

app.get('/', (request, response) => {
    response.send('Hello Express World!');
})

app.get('/api/students', (request, response) => {
    fs.readFile('./db.json', 'utf-8', (err, data) => {
        if (err) {
            console.log(err);
        }
        else {
            const students = JSON.parse(data).students;
            response.send(students);
        }
    })
})



const port = 3000;
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})