const client = require("./database/connect");
const express = require("express");
const routes = require("./routes");
require("dotenv/config");
const app = express();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { verifyToken } = require("./middlewares/auth.middleware");
const { JWT_SECRET } = process.env;

app.use(express.json());

app.use(routes);

const port = process.env.PORT_RUNNING;

app.listen(port, console.log(`Server Running in port ${port} 👽`));



app.post("/login", async (req, res) => {
    const usuario = req.body;
  try {
    const response = await client.query(
      `SELECT * FROM usuarios WHERE user_email = '${usuario.email}'`
    );
    if (response.rows.length === 0) {
      return res.status(400).json({ message: "Falha na autenticação." });
    }
    if (response.rowCount) {
      bcrypt.compare(
        usuario.senha,
        response.rows[0].user_senha,
        (err, result) => {
          if (err) {
            return res.status(401).json({
              error: "Falha na autenticação.",
            });
          }
          if (result) {
            const token = jwt.sign({ usuario }, JWT_SECRET, {
              expiresIn: "1800s",
            });
            return res.status(200).json({ token });
          } else {
            return res.status(401).json({
              error: "Falha na autenticação.",
            });
          }
        }
      );
    }
  } catch (error) {
    return res.status(400).json(error.message);
  }
});
