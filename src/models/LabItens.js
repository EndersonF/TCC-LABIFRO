const client = require("../database/connect");
const bcrypt = require("bcryptjs");
class LabItens {
  async lista(res) {
    const response = await client.query("SELECT * FROM laboratorios_has_itens");
    return res.json(response.rows);
  }
  async listarUm(id, res) {
    const response = await client.query(
      `SELECT laboratorios_idlaboratorios, itens_iditens, lab_qtd FROM laboratorios_has_itens WHERE laboratorios_idlaboratorios ='${id}';`
    );
    return res.status(201).json(response.rows);
  }

  async cadastrar(labItem, res) {
    console.log(labItem);
    const response =
      await client.query(`INSERT INTO public.laboratorios_has_itens
    (laboratorios_idlaboratorios, itens_iditens, lab_qtd)VALUES('${labItem.idLab}', '${labItem.idItem}', ${labItem.qtd});`);
    return res.json(labItem);
  }

  async atualizar(id, labItem, res) {
    const response = await client.query(`UPDATE public.laboratorios_has_itens
    SET laboratorios_idlaboratorios='${labItem.idLab}', itens_iditens='${labItem.idItem}', lab_qtd = ${labItem.qtd}
    WHERE laboratorios_idlaboratorios='${id}';`);
    return res.status(201).json(labItem);
  }
  async deletar(id, labItem, res) {
    `DELETE FROM laboratorios_has_itens WHERE (laboratorios_idlaboratorios =${id})`;
    try {
      const verification = await client.query(
        `DELETE FROM laboratorios_has_itens WHERE laboratorios_idlaboratorios = '${id}'`
      );
      if (!verification.rowCount) {
        return res.status(404).json({
          error:
            "Não foi possível deletar o item, favor verificar se o ID do item está correto. Verifique o ID! ",
        });
      }
      const response = await client.query(
        `DELETE FROM laboratorios_has_itens WHERE laboratorios_idlaboratorios = '${id}'`
      );
      return res
        .status(200)
        .json({ message: "Item encontrado deletado com sucesso!" });
    } catch (error) {
      return res.status(400).json(error.message);
    }
  }
}

module.exports = new LabItens();
