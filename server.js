const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Configurar EJS como motor de plantillas
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Servir archivos estáticos (CSS, JS cliente, imágenes)
app.use(express.static(path.join(__dirname, 'public')));

// Rutas individuales para cada sección
app.get(['/', '/mru'], (req, res) => {
    res.render('mru', { activeTab: 'mru', title: 'Movimiento Rectilíneo Uniforme (MRU)' });
});

app.get('/mrua', (req, res) => {
    res.render('mrua', { activeTab: 'mrua', title: 'Movimiento Rectilíneo Uniformemente Acelerado (MRUA)' });
});

app.get('/parabolico', (req, res) => {
    res.render('parabolico', { activeTab: 'parabolico', title: 'Movimiento Parabólico' });
});

app.listen(PORT, () => {
    console.log(`Servidor con EJS ejecutándose en http://localhost:${PORT}`);
});
