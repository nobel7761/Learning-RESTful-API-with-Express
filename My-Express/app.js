const express = require('express');
const app = express();
const db = require('./db');

app.use(express.json());

app.get('/', (request, response) => {
    response.send("Hello from express world!");
})

app.get('/api/students', (request, response) => {
    db.getDbStudents()
        .then(students => {
            response.send(students);
        })
})

app.post('/api/students', (request, response) => {
    const student = request.body;
    db.getDbStudents()
        .then(students => {
            students.push(student);
            db.insertDbStudent(students)
                .then(data => {
                    response.send(data)
                })
        })
})

app.get('/api/students/:id', (request, response) => {
    const id = parseInt(request.params.id);
    db.getDbStudents()
        .then(students => {
            const student = students.find(s => s.id === id);
            if (!student) {
                response.status(404).send('No Student found with this ID');
            }
            else {
                response.send(student);
            }
        })
})

const port = 3000;
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})