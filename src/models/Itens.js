const client = require("../database/connect");
const bcrypt = require("bcryptjs");
class Itens {
  async lista(res) {
    const response = await client.query("SELECT * FROM itens");
    return res.json(response.rows);
  }
  async listarUmItem(id, res) {
    const response = await client.query(
      `SELECT iditens, nome_itens, descricao_itens FROM itens WHERE iditens='${id}';`
    );
    return res.status(201).json(response.rows);
  }
  async cadastrar(itens, res) {
    const response = await client.query(`INSERT INTO public.itens
    (iditens, nome_itens, descricao_itens)
    VALUES(uuid_generate_v4(), '${itens.nome}', '${itens.descricao}');`);
    return res.status(201).send({ message: "Item cadastrado com Sucesso!" });
  }
  async atualizar(id, itens, res) {
    const response = await client.query(`UPDATE public.itens
    SET nome_itens='${itens.nome}', descricao_itens='${itens.descricao}'
    WHERE iditens='${id}';`);
    try {
      const verificationID = await client.query(`
      SELECT * FROM itens WHERE iditens ='${id}'`);
      if (!verificationID.rowCount) {
        return res
          .status(404)
          .json({ error: "Não foi possível atualizar a tabela Itens, pois o ID não se encontra na base de dados!" });
      }
      return res.status(201).json({ message: "Item atualizado com sucesso!" });
    } catch (error) {
      return res.status(400).json(error.message);
    }
  }
  async deletar(id, itens, res) {
    `DELETE FROM itens WHERE (iditens =${id})`;
    try {
      const verification = await client.query(
        `DELETE FROM itens WHERE iditens ='${id}'`
      );
      if (!verification.rowCount) {
        return res
          .status(404)
          .json({
            error: "Item não foi encontrado na base de dados. Verifique o ID!"
          });
      }
      const response = await client.query(
        `DELETE FROM itens WHERE iditens='${id}'`
      );
      return res
        .status(200)
        .json({ message: "Item encontrado deletado com sucesso!" });
    } catch (error) {
      return res.status(400).json(error.message);
    }
  }
}

module.exports = new Itens();
