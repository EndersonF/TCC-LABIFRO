const client = require("../database/connect");
const bcrypt = require("bcryptjs");
const { database } = require("pg/lib/defaults");
const res = require("express/lib/response");
class Usuarios {
  async lista(res) {
    const response = await client.query(
      "SELECT idusuario, user_nome, user_email, user_status, user_tipo, user_cpf, user_numero FROM usuarios"
    );
    return res.status(201).json(response.rows);
  }
  async listarUm(id, res) {
    const response = await client.query(
      `SELECT idusuario, user_nome, user_email, user_status, user_tipo, user_cpf, user_numero FROM usuarios WHERE idusuario='${id}';`
    );
    return res.status(201).json(response.rows);
  }

  async cadastrar(usuario, res) {
    `SELECT * FROM usuarios 
    WHERE (user_nome ' = ${usuario.nome}' AND  user_email' = ${usuario.email}`;
    try {
      const verificacaoUser = await client.query(
        `SELECT * FROM usuarios 
        WHERE user_nome = '${usuario.nome}' AND  user_email = '${usuario.email}'`
      );
      if (verificacaoUser.rowCount) {
        return res.status(401).json({
          error: "Usuário já existente, favor trocar o nome ou email.",
        });
      }
      const response = await client.query(`INSERT INTO public.usuarios
    (idusuario, user_nome, user_email, user_senha, user_status, user_tipo, user_cpf, user_numero)
    VALUES(uuid_generate_v4(), '${usuario.nome}', '${
        usuario.email
      }', '${bcrypt.hashSync(usuario.senha)}','${usuario.status}', ${
        usuario.tipo
      }, '${usuario.cpf}', ${usuario.numero});`);
      return res
        .status(201)
        .send({ message: " Usuário(a) Cadastrado com Sucesso." });
    } catch (error) {
      return res.status(400).json(error.message);
    }
  }

  async atualizar(id, usuario, res) {
    `SELECT * FROM usuarios 
    WHERE (user_nome ' = ${usuario.nome}' AND  user_email' = ${usuario.email}`;
    try {
      const verificacaoUser = await client.query(
        `SELECT * FROM usuarios 
        WHERE user_nome = '${usuario.nome}' AND  user_email = '${usuario.email}'`
      );
      if (verificacaoUser.rowCount) {
        return res.status(401).json({
          error:
            "Não foi possível alterar o usuário, já existe um mesmo cadastro com o mesmo nome ou email.",
        });
      }
      const response = await client.query(`UPDATE public.usuarios
    SET user_nome='${usuario.nome}', user_email='${usuario.email}', user_status='${usuario.status}', user_tipo=${usuario.tipo}, user_cpf='${usuario.cpf}', user_numero='${usuario.numero}'
    WHERE idusuario='${id}';
    `);
      return res
        .status(201)
        .json({ message: "Atualização feita com Sucesso!" });
    } catch (error) {
      return res.status(400).json(error.message);
    }
  }
  async deletar(id, usuario, res) {
    `DELETE FROM usuarios WHERE (idusuario =${id})`;
    try {
      const verification = await client.query(
        `DELETE FROM usuarios WHERE idusuario= '${id}'`
      );
      if (!verification.rowCount) {
        return res.status(404).json({
          error:
            "Este usuário(a) não foi encontrado na base de dados. Verifique o ID!",
        });
      }
      const response = await client.query(
        `DELETE FROM usuarios WHERE idusuario= '${id}'`
      );
      return res
        .status(200)
        .json({ message: "Usuário(a) encontrado e deletado com sucesso!" });
    } catch (error) {
      return res.status(400).json(error.message);
    }
  }
}
module.exports = new Usuarios();
