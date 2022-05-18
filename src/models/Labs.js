const client = require("../database/connect");
class Labs {
  async lista(res) {
    const response = await client.query("SELECT * FROM laboratorios");
    return res.json(response.rows);
  }
  async listarUmLaboratorio(id, res) {
    const response = await client.query(
      `SELECT idlaboratorios, lab_chave, lab_nome, lab_tipo, lab_descricao, lab_status, lab_capacidade FROM public.laboratorios WHERE idlaboratorios='${id}';`
    );
    return res.status(201).json(response.rows);
  }
  async cadastrar(laboratorio, res) {
    const response = await client.query(`INSERT INTO public.laboratorios
    (idlaboratorios, lab_chave, lab_nome, lab_tipo, lab_descricao, lab_status, lab_capacidade)
    VALUES(uuid_generate_v4(), ${laboratorio.chave}, '${laboratorio.nome}', ${laboratorio.tipo}, '${laboratorio.descricao}',
     ${laboratorio.status}, ${laboratorio.capacidade});`);
    return res.json(laboratorio);
  }
  async atualizar(id, laboratorio, res) {
    const response =
      await client.query(`UPDATE public.laboratorios SET lab_chave=${laboratorio.chave}, lab_nome='${laboratorio.nome}', lab_tipo=${laboratorio.tipo}, lab_descricao='${laboratorio.descricao}', 
    lab_status=${laboratorio.status}, lab_capacidade=${laboratorio.capacidade} WHERE idlaboratorios='${id}';`);
    return res.json(laboratorio);
  }
  async deletar(id, laboratorio, res) {
    `DELETE from laboratorios WHERE (idlaboratorios =${id})`;
    try {
      const verification = await client.query(
        `DELETE FROM laboratorios WHERE idlaboratorios= '${id}'`
      );
      if (!verification.rowCount) {
        return res.status(401).json({
          error: "Laboratório não existente, favor verificar o ID.",
        });
      }
      const response = await client.query(
        `DELETE FROM laboratorios WHERE idlaboratorios= '${id}'`
      );
      return res
        .status(200)
        .json({ message: "Laboratório encontrado e deletado com Sucesso!" });
    } catch (error) {
      return res.status(400).json(error.message);
    }
  }
}

module.exports = new Labs();
