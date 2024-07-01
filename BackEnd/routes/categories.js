const express        = require('express');
const categorySchema = require('../../../src/models/categorySchema');
const router         = express.Router();

//creamos categorias
router.post('/category', (req, res) => {
    const user = categorySchema(req.body);

    user.save()
        .then((data) => res.json(data))
        .catch((err) => res.json(err));
})

//obtener todos las categorias
router.get('/category', (req, res) => {
    categorySchema.find()
        .then((data) => res.json(data))
        .catch((err) => res.json(err));
})

//obtener una categoria
router.get('/category/:id', (req, res) => {
    const { id } = req.params;

    categorySchema.findById(id)
        .then((data) => res.json(data))
        .catch((err) => res.json(err));
})

//actualizar una categoria
router.put('/category/:id', (req, res) => {
    const { id } = req.params;
    const { name } = req.body;

    categorySchema.updateOne({ _id: id }, { $set: { name } })
        .then((data) => res.json(data))
        .catch((err) => res.json(err));
})

//eliminar una categoria
router.delete('/category/:id', (req, res) => {
    const { id } = req.params;

    categorySchema.deleteOne({ _id: id })
        .then((data) => res.json(data))
        .catch((err) => res.json(err));
})

module.exports = router;