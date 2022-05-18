const { Router } = require("express");
const labItensRoute = Router();
const LabItens = require("../models/LabItens");
const {verifyToken} = require("../middlewares/auth.middleware");

labItensRoute.get("/", verifyToken, async (req, res) => {
  return LabItens.lista(res);
});
labItensRoute.get("/:id", verifyToken, async (req, res) => {
  const { id } = req.params;
  return LabItens.listarUm(id, res);
});
labItensRoute.post("/", verifyToken, async (req, res) => {
  const labItens = req.body;
  return LabItens.cadastrar(labItens, res);
});
labItensRoute.put("/:id", verifyToken, async (req, res) => {
  const { id } = req.params;
  const labItens = req.body;
  return LabItens.atualizar(id, labItens, res);
});
labItensRoute.delete("/:id", verifyToken, (req, res) => {
  const { id } = req.params;
  return LabItens.deletar(id, req, res);
})

module.exports = labItensRoute;
