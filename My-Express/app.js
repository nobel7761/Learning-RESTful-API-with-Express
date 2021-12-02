const express = require('express');
const app = express();
const db = require('./db');

app.use(express.json());

app.get('/', (request, response) => {
    response.send("Hello from express world!");
})

const studentList = (request, response) => {
    db.getDbStudents()
        .then(students => {
            response.send(students);
        })
}

const newStudent = (request, response) => {
    const student = request.body;
    db.getDbStudents()
        .then(students => {
            students.push(student);
            db.insertDbStudent(students)
                .then(data => {
                    response.send(data)
                })
        })
}

const studentDetails = (request, response) => {
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
}

const studentUpdate = (req, res) => {
    const id = parseInt(req.params.id);
    const updatedData = req.body;
    db.getDbStudents()
        .then(students => {
            const student = students.find(s => s.id === id);
            if (!student) {
                res.status(404).send('No student found with this id');
            }
            else {
                const i = students.findIndex(s => s.id === id);
                students[i] = updatedData;
                db.insertDbStudent(students)
                    .then(data => {
                        res.send(students);
                    })
            }
        })
}

const studentDelete = (req, res) => {
    const id = parseInt(req.params.id);
    db.getDbStudents()
        .then(students => {
            const student = students.find(s => s.id === id);
            if (!student) {
                res.status(404).send('Not Found');
            }
            else {
                const updatedStudents = students.filter(s => s.id !== id);
                db.insertDbStudent(updatedStudents)
                    .then(data => {
                        res.send(student);
                    })
            }
        })

}

app.get('/api/students', studentList)

app.post('/api/students', newStudent)

app.get('/api/students/:id', studentDetails)

app.put('/api/students/:id', studentUpdate)

app.delete('/api/students/:id', studentDelete)

const port = 3000;
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})