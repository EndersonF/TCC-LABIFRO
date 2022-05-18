const { Router } = require("express");
const cursoRoute = Router();
const Cursos = require("../models/Cursos");
const {verifyToken} = require("../middlewares/auth.middleware");

cursoRoute.get("/",verifyToken, async (req, res) => {
  return Cursos.lista(res);
});
cursoRoute.get("/:id", verifyToken, async (req, res) => {
  const { id } = req.params;
  return Cursos.listarUmCurso(id, res);
});
cursoRoute.post("/", verifyToken, async (req, res) => {
  const curso = req.body;
  return Cursos.cadastrar(curso, res);
});
cursoRoute.put("/:id", verifyToken, async (req, res) => {
  const { id } = req.params;
  const curso = req.body;
  return Cursos.atualizar(id, curso, res);
});
cursoRoute.delete("/:id", verifyToken, (req, res) => {
  const { id } = req.params;
  return Cursos.deletar(id, req, res);
});

module.exports = cursoRoute;
