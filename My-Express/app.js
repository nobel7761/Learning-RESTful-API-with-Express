const express = require('express');

const app = express();

app.get('/', (request, response) => {
    response.send('Hello Express World!');
})

app.get('/another', (request, response) => {
    response.send('Hello from another world!');
})

app.get('/courses', (request, response) => {
    response.send(JSON.stringify(["Habibur", "Nobel"]));
})

const port = 3000;
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})