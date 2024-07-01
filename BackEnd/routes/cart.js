const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const userSchema = require("../../../src/models/userSchema");

// Middleware para verificar el token del usuario
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split("Bearer ")[1];
  if (!token) return res.status(401).json({ error: "Token no proporcionado" });

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ error: "Token inválido" });
    req.userId = decoded.userId;
    next();
  });
};

// Agregar producto al carrito
router.post("/", verifyToken, async (req, res) => {
  try {
    const userId = req.userId;
    const product = req.body.product;

    const user = await userSchema.findByIdAndUpdate(
      userId,
      { $push: { cart: product } },
      { new: true }
    );

    res.json({ user });
  } catch (error) {
    console.error("Error al agregar producto al carrito:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

// Limpiar el carrito
router.post("/clean", verifyToken, async (req, res) => {
  try {
    const userId = req.userId;

    const user = await userSchema.findByIdAndUpdate(
      userId,
      { $set: { cart: [] } },
      { new: true }
    );

    res.json({ user });
  } catch (error) {
    console.error("Error al limpiar el carrito:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

module.exports = router;
