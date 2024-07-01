const express     = require('express');
const orderSchema = require('../../../src/models/orderSchema');
const router      = express.Router();

//creamos orders
router.post('/orders', (req, res) => {
    const user = orderSchema(req.body);

    user.save()
        .then((data) => res.json(data))
        .catch((err) => res.json(err));
})

//obtener todos las orders
router.get('/orders', (req, res) => {
    orderSchema.find()
        .then((data) => res.json(data))
        .catch((err) => res.json(err));
})

//obtener un order
router.get('/orders/:id', (req, res) => {
    const { id } = req.params;

    orderSchema.findById(id)
        .then((data) => res.json(data))
        .catch((err) => res.json(err));
})

//actualizar una order
router.put('/orders/:id', (req, res) => {
    const { id } = req.params;
    const { products, customer } = req.body;

    orderSchema.updateOne({ _id: id }, { $set: { products, customer } })
        .then((data) => res.json(data))
        .catch((err) => res.json(err));
})

//eliminar una order
router.delete('/orders/:id', (req, res) => {
    const { id } = req.params;

    orderSchema.deleteOne({ _id: id })
        .then((data) => res.json(data))
        .catch((err) => res.json(err));
})

module.exports = router;