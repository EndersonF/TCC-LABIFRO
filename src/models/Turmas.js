const client = require("../database/connect");
const bcrypt = require("bcryptjs");
const cli = require("nodemon/lib/cli");
class Turmas {
  async lista(res) {
    const response = await client.query("SELECT * FROM turmas");
    return res.json(response.rows);
  }
  async cadastrar(turmas, res) {
    const response = await client.query(`INSERT INTO public.turmas
    (idturma, nome_turma, cursos_idcursos)
    VALUES(uuid_generate_v4(), '${turmas.nome}', '${turmas.idcursos}');`);
    return res.status(201).json(turmas);
  }
  async listarUm(id, res) {
    const response = await client.query(
      `SELECT idturma, nome_turma, cursos_idcursos
      FROM turmas WHERE idturma='${id}';`
    );
    return res.status(201).json(response.rows);
  }
  async atualizar(id, turmas, res) {
    `SELECT * FROM turmas 
    WHERE (nome_turma ' = ${turmas.nome}' AND  cursos_idcursos' = ${turmas.idcursos}`;
    try {
      const verificacaoUser = await client.query(
        `SELECT * FROM turmas 
        WHERE nome_turma = '${turmas.nome}' AND  cursos_idcursos = '${turmas.idcursos}'`
      );
      if (verificacaoUser.rowCount) {
        return res.status(401).json({
          error: "Não foi possível atualizar a turma. Verifique o nome ou ID!",
        });
      }
      const response = await client.query(`UPDATE public.turmas
    SET nome_turma='${turmas.nome}', cursos_idcursos='${turmas.idcursos}'
    WHERE idturma='${id}';
    `);
      return res
        .status(201)
        .json({ message: "Atualização feita com Sucesso!" });
    } catch (error) {
      return res.status(400).json(error.message);
    }
  }
  async deletar(id, turmas, res) {
    `DELETE FROM turmas WHERE (idturma =${id})`;
    try {
      const verificaoTurma = await client.query(
        `DELETE FROM turmas WHERE idturma= '${id}'`
      );
      if (!verificaoTurma.rowCount) {
        return res.status(404).json({
          error:
            "Esta turma não foi encontrado na base de dados. Verifique o ID!",
        });
      }
      const response = await client.query(
        `DELETE FROM turmas WHERE idturma= '${id}'`
      );
      return res
        .status(200)
        .json({ message: "Turma encontrada e deletada com sucesso!!" });
    } catch (error) {
      return res.status(400).json(error.message);
    }
  }
}
module.exports = new Turmas();
