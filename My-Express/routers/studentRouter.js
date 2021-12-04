const express = require('express');
const router = express.Router();
const db = require('../db');

const studentList = (request, response) => {
    db.getDbStudents()
        .then(students => {
            response.send(students);
        })
}

const addNewStudent = (request, response) => {
    const student = request.body;
    db.getDbStudents()
        .then(students => {
            students.push(student);
            db.insertDbStudents(students)
                .then(data => {
                    response.send(data);
                })
        })
}

const searchStudent = (request, response) => {
    const id = parseInt(request.params.id);
    db.getDbStudents()
        .then(students => {
            const student = students.find(s => s.id === id);
            if (!student) {
                response.status(404).send("No data found with this id");
            }
            else {
                response.send(student);
            }

        })
}

const updateStudent = (request, response) => {
    const id = parseInt(request.params.id);
    const updatedData = request.body;
    db.getDbStudents()
        .then(students => {
            const i = students.findIndex(s => s.id === id);
            const student = students.find(s => s.id === id);
            students[i] = updatedData;
            db.insertDbStudents(students)
                .then(data => {
                    if (!student) {
                        response.status(404).send("No data found with this id");
                    }
                    else {
                        response.send(students);
                    }
                })
        })
}

const deleteStudent = (request, response) => {
    const id = parseInt(request.params.id);
    db.getDbStudents()
        .then(students => {
            const student = students.find(s => s.id === id);
            const updatedStudents = students.filter(s => s.id !== id);
            db.insertDbStudents(updatedStudents)
                .then(data => {
                    if (!student) {
                        response.status(404).send("No data found with this id");
                    }
                    else {
                        response.send(students);
                    }
                })
        })
}

router.route('/')
    .get(studentList)
    .post(addNewStudent)

router.route('/:id')
    .get(searchStudent)
    .put(updateStudent)
    .delete(deleteStudent)


module.exports = router;