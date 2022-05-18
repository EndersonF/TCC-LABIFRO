const { Router, response } = require("express");
const { database } = require("pg/lib/defaults");
const { atualizarUm, lista, atualizar } = require("../models/Usuarios");
const usuarioRoute = Router();
const Usuarios = require("../models/Usuarios");
const {verifyToken} = require("../middlewares/auth.middleware");

usuarioRoute.get("/",verifyToken, async (req, res) => {
  return Usuarios.lista(res);
});
usuarioRoute.get("/:id",verifyToken, async (req, res) => {
  const { id } = req.params;
  return Usuarios.listarUm(id, res);
});
usuarioRoute.post("/",verifyToken, async (req, res) => {
  const usuario = req.body;
  return Usuarios.cadastrar(usuario, res);
});
usuarioRoute.put("/:id",verifyToken, async (req, res) => {
  const { id } = req.body;
  if (!id) {
    return res.status(400).json("Id é Obrigatório. Verifique o campo!");
  }
  const usuario = req.body;
  return Usuarios.atualizar(id, usuario, res);
});
usuarioRoute.delete("/:id",verifyToken, (req, res) => {
  const { id } = req.params;
  return Usuarios.deletar(id, req, res);
});
module.exports = usuarioRoute;
