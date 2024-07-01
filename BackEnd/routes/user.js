require("dotenv").config();
const express = require("express");
const jwt = require("jsonwebtoken");
const userSchema = require("../../../src/models/userSchema");
const bcrypt = require("bcrypt");

const router = express.Router();
const secretKey = process.env.JWT_SECRET;

if (!secretKey) {
  console.error(
    "No se encontró la clave secreta. Asegúrate de configurar la variable de entorno JWT_SECRET."
  );
  process.exit(1);
}

// Crear usuario y generar token
router.post("/registro", async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const newUser = new userSchema({
      name,
      email,
      password,
      role: role || "user",
    });
    await newUser.save();

    // Generar token para el nuevo usuario
    const token = jwt.sign({ email, role: newUser.role }, secretKey, {
      expiresIn: "1h",
    });

    res.json({ token });

    console.log("Usuario registrado exitosamente");
    console.log("Token generado:", token);
  } catch (error) {
    console.error("Error al registrar usuario:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
});

// Inicio de sesión
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userSchema.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: "Contraseña incorrecta" });
    }

    const token = jwt.sign({ userId: user._id, role: user.role }, secretKey, {
      expiresIn: "1h",
    });

    if (user.role === "admin") {
      console.log("Inicio de sesión exitoso para el administrador", user);
    }

    res.status(200).json({
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({ error: "Error en el inicio de sesión" });
  }
});

router.get("/user-details", async (req, res) => {
  try {
    // Verificar el token del encabezado de autorización
    const token = req.headers.authorization.split("Bearer ")[1];
    const decodedToken = jwt.verify(token, secretKey);
    const userId = decodedToken.userId;

    const user = await userSchema.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    res.status(200).json({ user });
  } catch (error) {
    console.error("Error al obtener detalles del usuario:", error);
    res
      .status(500)
      .json({ error: "Error al obtener detalles del usuario", error });
  }
});

// Rutas protegidas para el panel de administración
router.post("/admin-only-route", isAdmin, (req, res) => {
  res.json({ message: "Acceso permitido para administradores" });
});

// Verificar la autenticación inicial
router.post("/verify-auth", async (req, res) => {
  try {
    const token = req.headers.authorization.split("Bearer ")[1];
    const decodedToken = jwt.verify(token, secretKey);

    const user = await userSchema.findById(decodedToken.userId);

    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    // Devolver detalles del usuario
    res.status(200).json({
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Error al verificar la autenticación inicial:", error);
    res
      .status(500)
      .json({ error: "Error al verificar la autenticación inicial" });
  }
});

// Ruta para actualizar los detalles del usuario
router.put("/update-user-details", async (req, res) => {
  try {
    const token = req.headers.authorization.split("Bearer ")[1];
    const decodedToken = jwt.verify(token, secretKey);
    const userId = decodedToken.userId;

    // Verifica si el usuario existe
    const user = await userSchema.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    const { name, email } = req.body;

    user.name = name;
    user.email = email;

    // Guarda los cambios en la base de datos
    await user.save();

    res
      .status(200)
      .json({ message: "Detalles del usuario actualizados exitosamente" });
  } catch (error) {
    console.error("Error al actualizar detalles del usuario:", error);
    res.status(500).json({
      error: "Error interno del servidor al actualizar detalles del usuario",
    });
  }
});

// Middleware para verificar si el usuario es un administrador
function isAdmin(req, res, next) {
  const token = req.headers.authorization.split("Bearer ")[1];
  const decodedToken = jwt.verify(token, secretKey);

  if (decodedToken.role === "admin") {
    next();
  } else {
    res.status(403).json({ error: "Acceso no autorizado" });
  }
}

module.exports = router;
