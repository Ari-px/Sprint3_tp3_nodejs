import express from 'express';
import SuperHero from './modeloheroe.mjs';

const router = express.Router();

// lista de superheroes
router.get('/heroes', async(req,res) =>   
{
    try{
        const todosSuperheroes = await SuperHero.find({});
        res.send(todosSuperheroes);
    } catch (error) {
    res.status(500).send({ message: 'Error al obtener todos los superhéroes' });
  }
});

// insertar superheroe
router.post('/heroes',async(req,res) =>   
{
    try{
        const nuevoHeroe = new SuperHero(req.body);
        await nuevoHeroe.save();
        res.send(`Nuevo Superheroe creado: ${nuevoHeroe}`);

        console.log(nuevoHeroe);

    } catch (error) {
        
        console.log(error);
    res.status(500).send({ message: 'Error al crear un superheroe' });
  }
});

// actualizar superheroe
router.put('/heroes/:id',async(req,res) =>   
{
    try{
        const {id} = req.params;
        const heroActualizado = await SuperHero.findByIdAndUpdate(id, req.body, { new: true });
        res.send(`Superheroe con ID: ${id} ha sido actualizado : ${heroActualizado}`);
    } catch (error) {
    res.status(500).send({ message: 'Error al actualizar un superheroe' });
  }
});

// eliminar super por id
router.delete('/heroes/:id',async(req,res) =>   
{
    try{

    const {id} = req.params;
    const heroEliminadoporId = await SuperHero.findByIdAndDelete(id);

    if (!heroEliminadoporId) {
      res.status(404).send({ message: `No se encontró un superhéroe con ID: ${id}` });
    } else {
      res.send(`Superheroe con ID: ${id} ha sido eliminado`);
    }

    } catch (error) {
    res.status(500).send({ message: 'Error al crear un superheroe' });
  }
});

// eliminar super por nombre
router.delete('/heroes/nombre/:nombreSuperHeroe',async(req,res) =>   
{
    try {

    const {nombreSuperHeroe} = req.params;
    const heroEliminadoporNombre = await SuperHero.findOneAndDelete({ nombreSuperHeroe: nombreSuperHeroe });

    if (!heroEliminadoporNombre) {
      res.status(404).send({ message: `No se encontró un superhéroe con nombre: ${nombreSuperHeroe}` });
    } else {
      res.send(`El superheroe ${nombreSuperHeroe} ha sido eliminado`);
    }

    } catch (error) {
    res.status(500).send({ message: 'Error al crear un superheroe' });
    }
});

export default router;