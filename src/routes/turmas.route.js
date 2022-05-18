const { Router } = require("express");
const turmaRoute = Router();
const Turmas = require("../models/Turmas");
const {verifyToken} = require("../middlewares/auth.middleware");

turmaRoute.get("/", verifyToken, async (req, res) => {
  return Turmas.lista(res);
});
turmaRoute.get("/:id", verifyToken, async (req, res) => {
  const { id } = req.params;
  return Turmas.listarUm(id, res);
});
turmaRoute.post("/", verifyToken, async (req, res) => {
  const turma = req.body;
  return Turmas.cadastrar(turma, res);
});
turmaRoute.put("/:id", verifyToken, async (req, res) => {
  const { id } = req.params;
  const turma = req.body;
  return Turmas.atualizar(id, turma, res);
});
turmaRoute.delete("/:id", verifyToken, (req, res) => {
  const { id } = req.params;
  return Turmas.deletar(id, req, res);
});

module.exports = turmaRoute;
