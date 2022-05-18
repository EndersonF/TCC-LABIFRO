const client = require("../database/connect");
const bcrypt = require("bcryptjs");
const res = require("express/lib/response");

class Agendamentos {
  async lista(res) {
    const response = await client.query("SELECT * FROM agendamentos");
    return res.json(response.rows);
  }
  async listarUm(id, res) {
    const response = await client.query(
      `SELECT idagendamentos, horario_inicio, horario_termino, laboratorios_idlaboratorios, usuarios_idusuario, turmas_idturma FROM agendamentos WHERE idagendamentos= '${id}';`
    );
    return res.status(201).json(response.rows);
  }
  async cadastrar(agendamentos, res) {
    try {
      const verificacao = await client.query(
        `SELECT * FROM agendamentos 
        WHERE (horario_inicio BETWEEN '${agendamentos.inicio}' AND  '${agendamentos.termino}'
        OR horario_termino BETWEEN '${agendamentos.inicio}' AND  '${agendamentos.termino}')
        AND laboratorios_idlaboratorios = '${agendamentos.idlaboratorios}'`
      );
      if (verificacao.rowCount) {
        return res.status(401).json({
          error:
            "Já existe um Agendamento nesse horário, verifique e coloque outro horário para realizar o agendamento.",
        });
      }
      const response = await client.query(`INSERT INTO agendamentos
      (idagendamentos, horario_inicio, horario_termino, laboratorios_idlaboratorios, usuarios_idusuario, turmas_idturma)
      VALUES(uuid_generate_v4(), '${agendamentos.inicio}', '${agendamentos.termino}','${agendamentos.idlaboratorios}','${agendamentos.idusuario}','${agendamentos.idturma}');`);
      return res.status(201).send({
        message: "Agendamento cadastrado com Sucesso!"
      });
    } catch (error) {
      return res.status(400).json(error.message);
    }
  }

  async atualizar(id, agendamentos, res) {
    `SELECT * FROM agendamentos 
    WHERE (horario_inicio ' = ${agendamentos.inicio}' AND  horario_termino' = ${agendamentos.termino}`;
    try {
      const verificationID = await client.query(
        `SELECT * FROM agendamentos WHERE idagendamentos = '${id}'`
      )
      if(!verificationID.rowCount){
        return res.status(401).json({
          error: "Não foi possível atualizar a tabela agendamentos, pois o ID não se encontra na base de dados!"
        });
      }
      const verificacaoAgendamento = await client.query(
        `SELECT * FROM agendamentos 
        WHERE 
        horario_inicio = '${agendamentos.inicio}' AND  horario_termino = '${agendamentos.termino}}'`
      );
      if (verificacaoAgendamento.rowCount) {
        return res.status(401).json({
          error: "Já existe um Agendamento nesse horário, verifique e coloque outro horário para realizar o agendamento."
        });
      }
      const response =
        await client.query(`UPDATE public.agendamentos SET horario_inicio='${agendamentos.inicio}', horario_termino='${agendamentos.termino}', laboratorios_idlaboratorios ='${agendamentos.idlaboratorios}', usuarios_idusuario= '${agendamentos.idusuario}', turmas_idturma='${agendamentos.idturma}' WHERE idagendamentos='${id}';
    `);
      return res
        .status(201)
        .json({ Mensagem: "Atualização feita com Sucesso!" });
    } catch (error) {
      return res.status(400).json(error.message);
    }
  }
  async deletar(id, agendamentos, res) {
    `DELETE FROM agendamentos WHERE (idagendamentos = ${id})`;
    try {
      const verification = await client.query(
        `DELETE FROM agendamentos WHERE idagendamentos = '${id}'`
      );
      if (!verification.rowCount) {
        return res.status(404).json({
          error: "Agendamento não encontrado na base de dados. Verifique o ID.",
        });
      }
      const response = await client.query(
        `DELETE FROM agendamentos WHERE idagendamentos = '${id}'`
      );
      return res
        .status(200)
        .json({ Mensagem: "Agendamento encontrado deletado com Sucesso!" });
    } catch (error) {
      return res.status(400).json(error.message);
    }
  }
}
module.exports = new Agendamentos();
