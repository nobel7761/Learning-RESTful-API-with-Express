const express = require('express');
const app = express();
const studentRouter = require('./routers/studentRouter');

app.use(express.json());
app.use('/api/students', studentRouter);

app.get('/', (request, response) => {
    response.send("Hello from express world!");
})



const port = 3000;
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})