const express = require("express");
const productSchema = require("../../../src/models/productSchema");
const router = express.Router();

//creamos productos
router.post("/products", (req, res) => {
  const user = productSchema(req.body);

  user
    .save()
    .then((data) => res.json(data))
    .catch((err) => res.json(err));
});

//obtener todos los productos
router.get("/products", (req, res) => {
  productSchema
    .find()
    .then((data) => res.json(data))
    .catch((err) => res.json(err));
});

//obtener un producto
router.get("/products/:id", (req, res) => {
  const { id } = req.params;

  productSchema
    .findById(id)
    .then((data) => res.json(data))
    .catch((err) => res.json(err));
});

//actualizar un producto
router.put("/products/:id", (req, res) => {
  const { id } = req.params;
  const { name, description, price } = req.body;

  productSchema
    .updateOne({ _id: id }, { $set: { name, description, price } })
    .then((data) => res.json(data))
    .catch((err) => res.json(err));
});

//eliminar un producto
router.delete("/products/:id", (req, res) => {
  const { id } = req.params;

  productSchema
    .deleteOne({ _id: id })
    .then((data) => res.json(data))
    .catch((err) => res.json(err));
});

module.exports = router;
