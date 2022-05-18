const { Router } = require("express");
const labRoute = Router();
const Labs = require("../models/Labs");
const {verifyToken} = require("../middlewares/auth.middleware");

labRoute.get("/", verifyToken, async (req, res) => {
  return Labs.lista(res);
});
labRoute.get("/:id", verifyToken, async (req, res) =>{
  const { id } = req.params;
  return Labs.listarUmLaboratorio(id, res);
})
labRoute.post("/", verifyToken, async (req, res) => {
  const laboratorio = req.body;
  return Labs.cadastrar(laboratorio, res);
});
labRoute.put("/:id", verifyToken, async (req, res) => {
  const {id} = req.params;
  const laboratorio = req.body;
  return Labs.atualizar(id,laboratorio, res);
});
labRoute.delete("/:id", verifyToken, (req, res) => {
  const { id } = req.params;
  return Labs.deletar(id, req, res);
});

module.exports = labRoute;
