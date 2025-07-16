const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

const db = new sqlite3.Database(path.join(__dirname, 'data', 'database.sqlite'));

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/movimientos', (req, res) => {
  db.all('SELECT * FROM movimientos', (err, rows) => {
    if (err) return res.status(500).send("Error al obtener movimientos");
    res.render('movimientos', { movimientos: rows });
  });
});

app.get('/habilidades', (req, res) => {
  db.all('SELECT * FROM habilidades', (err, rows) => {
    if (err) return res.status(500).send("Error al obtener habilidades");
    res.render('habilidades', { habilidades: rows });
  });
});

app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));
