local = require("knex")({
  client: "mysql",
  connection: {
    host: "127.0.0.1",
    user: "root",
    password: "123456",
    database: "local"
  }
})

cloud = require("knex")({
  client: "mysql",
  connection: {
    host: "127.0.0.1",
    user: "root",
    password: "123456",
    database: "cloud"
  }
})

module.exports.process = async function(table, select, date) {
  const info = await local
    .select(select)
    .from(table)
    .where("date", "=", date)
    .catch(error =>
      console.log(`Erro na tabela: ${table} - ${error.sqlMessage}`)
    )
    .finally(() => {
      local.destroy()
    })

  cloud(table)
    .insert(info)
    .then(() =>
      console.log(
        `Exportação finalizada com sucesso para a tabela: ${table} | ${new Date().toLocaleString(
          "pt-br"
        )}`
      )
    )
    .catch(error =>
      console.log(`Erro na tabela: ${table} - ${error.sqlMessage}`)
    )
    .finally(() => {
      cloud.destroy()
    })
}

module.exports.processFull = async function(table, select) {
  const info = await local
    .select(select)
    .from(table)
    .catch(error =>
      console.log(`Erro na tabela: ${table} - ${error.sqlMessage}`)
    )
    .finally(() => {
      local.destroy()
    })
  cloud(table)
    .insert(info)
    .then(() =>
      console.log(
        `Exportação FULL finalizada com sucesso para a tabela: ${table} | ${new Date().toLocaleString(
          "pt-br"
        )}`
      )
    )
    .catch(error =>
      console.log(`Erro na tabela: ${table} - ${error.sqlMessage}`)
    )
    .finally(() => {
      cloud.destroy()
    })
}
