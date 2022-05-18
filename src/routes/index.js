const { Router } = require("express");
const labRoute = require("./labs.route");
const usuarioRoute = require("./usuarios.route");
const cursoRoute = require("./cursos.route");
const turmaRoute = require("./turmas.route");
const itensRoute = require("./itens.route");
const labItensRoute = require("./lab_itens.route");
const agendamentoRoute = require("./agendamentos.route");




const routes = Router();

routes.use("/labs", labRoute);
routes.use("/usuarios", usuarioRoute);
routes.use("/cursos", cursoRoute);
routes.use("/turmas", turmaRoute);
routes.use("/itens", itensRoute);
routes.use("/lab-itens", labItensRoute);
routes.use("/agendamentos", agendamentoRoute);




module.exports = routes;
