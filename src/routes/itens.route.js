const { Router } = require("express");
const itensRoute = Router();
const Itens = require("../models/Itens");
const {verifyToken} = require("../middlewares/auth.middleware");

itensRoute.get("/", verifyToken, async (req, res) => {
  return Itens.lista(res);
});
itensRoute.get("/:id", verifyToken, async (req, res)=> {
  const {id} = req.params;
  return Itens.listarUmItem(id, res);
});
itensRoute.post("/", verifyToken, async (req, res) => {
  const itens = req.body;
  return Itens.cadastrar(itens, res);
});
itensRoute.put("/:id", verifyToken, async (req, res) => {
  const {id} = req.params;
  const itens = req.body;
  return Itens.atualizar(id,itens, res);
});
itensRoute.delete("/:id", verifyToken, (req, res) => {
  const {id} = req.params;
  return Itens.deletar(id, req, res);
});
module.exports = itensRoute;
