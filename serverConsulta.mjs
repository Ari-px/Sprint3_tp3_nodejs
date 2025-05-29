import express from 'express';

const app = express();
const PORT = 3000;

app.get('/profile', (req,res) =>
{
    const edad = req.query.edad;
    console.log(`Edad Recibida: ${edad}`);
    res.send(`Edad del perfil:${edad}`);
});

app.listen(PORT,()=>
{
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});