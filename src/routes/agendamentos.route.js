const { Router } = require("express");
const agendamentoRoute = Router();
const Agendamentos = require("../models/Agendamentos");
const {verifyToken} = require("../middlewares/auth.middleware");
const res = require("express/lib/response");

agendamentoRoute.get("/",verifyToken, async (req, res) => {
  return Agendamentos.lista(res);
});


agendamentoRoute.get("/:id", verifyToken, async (req, res) => {
  const { id } = req.params;
  return Agendamentos.listarUm(id, res);
});
agendamentoRoute.post("/", verifyToken, async (req, res) => {
  const agendamento = req.body;
  return Agendamentos.cadastrar(agendamento, res);
});

agendamentoRoute.put("/:id", verifyToken, async (req, res) => {
  const { id } = req.params;
  const agendamento = req.body;
  return Agendamentos.atualizar(id, agendamento, res);
});

agendamentoRoute.delete("/:id", verifyToken, (req, res) => {
  const {id} = req.params;
  return Agendamentos.deletar(id, req, res);
});

module.exports = agendamentoRoute;
