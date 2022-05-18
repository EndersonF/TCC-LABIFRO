const client = require("../database/connect");
const bcrypt = require("bcryptjs");
const res = require("express/lib/response");
class Cursos {
  async lista(res) {
    const response = await client.query("SELECT * FROM cursos");
    return res.json(response.rows);
  }
  async listarUmCurso(id, res) {
    const response = await client.query(
      `SELECT idcursos, nome_curso, turno_curso FROM cursos WHERE idcursos='${id}';`
    );
    return res.status(201).json(response.rows);
  }
  async cadastrar(cursos, res) {
    `SELECT * FROM cursos 
    WHERE (nome_curso ' = ${cursos.nome}' AND  turno_curso' = ${cursos.turno}`;
    try {
      const verificacaoCurso = await client.query(
        `SELECT * FROM cursos 
        WHERE nome_curso = '${cursos.nome}' AND  turno_curso = '${cursos.turno}'`
      );
      if (verificacaoCurso.rowCount) {
        return res.status(401).json({
          error: "Curso já existente, favor trocar o curso ou turno.",
        });
      }
      const response = await client.query(`INSERT INTO public.cursos
    (idcursos, nome_curso,turno_curso)
    VALUES(uuid_generate_v4(), '${cursos.nome}', ${cursos.turno});`);
      return res.status(201).send({ message: "Curso cadastrado com Sucesso!" });
    } catch (error) {
      return res.status(400).json(error.message);
    }
  }
  async atualizar(id, cursos, res) {
    `SELECT * FROM cursos 
    WHERE (nome_curso ' = ${cursos.nome}' AND  turno_curso' = ${cursos.turno}`;
    try {
      const verificacaoCurso = await client.query(
        `SELECT * FROM cursos 
        WHERE nome_curso = '${cursos.nome}' AND  turno_curso = '${cursos.turno}'`
      );
      if (verificacaoCurso.rowCount) {
        return res.status(401).json({
          error: "Curso já existente, favor trocar o curso ou turno.",
        });
      }
      const response = await client.query(`UPDATE public.cursos
    SET nome_curso='${cursos.nome}', turno_curso=${cursos.turno}
    WHERE idcursos='${id}';`);
      return res
        .status(201)
        .json({ message: "Atualização feita com Sucesso!" });
    } catch (error) {
      return res.status(400).json(error.message);
    }
  }
  async deletar(id, curso, res) {
    `DELETE FROM cursos WHERE (idcursos =${id})`;
    try {
      const verification = await client.query(
        `DELETE FROM cursos WHERE idcursos= '${id}'`
      );
      if (!verification.rowCount) {
        return res.status(404).json({
          error:
            "Este curso não foi encontrado na base de dados. Verifique o ID!",
        });
      }
      const response = await client.query(
        `DELETE FROM cursos WHERE idcursos= '${id}'`
      );
      return res
        .status(200)
        .json({ message: "Curso encontrado e deletado com Sucesso!" });
    } catch (error) {
      return res.status(400).json(error.message);
    }
  }
}

module.exports = new Cursos();
