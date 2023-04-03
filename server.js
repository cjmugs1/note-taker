const express = require('express');
const routes = require('./routes/index.js')
const path = require("path");


const PORT = process.env.PORT || 3001;
const app = express();

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use(routes)

// app.get('/', (req, res) =>
//     res.sendFile(path.join(__dirname, '/public/index.html'))
// );

// app.get('/notes', (req, res) =>
//     res.sendFile(path.join(__dirname, '/public/notes.html'))
// )

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);
