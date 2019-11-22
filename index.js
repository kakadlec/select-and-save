const config = require("./config")

const tabela1 = { tabela: "demo", colunas: ["key", "democol", "date"] }

async function main(type, date) {
  if (type === "full") {
    console.log(`Carga Inicial | ${new Date().toLocaleString("pt-br")}`)
    config.processFull(tabela1.tabela, tabela1.colunas)
  } else if (type === "incremental") {
    console.log(`Caraga Incremental | ${new Date().toLocaleString("pt-br")}`)
    config.process(tabela1.tabela, tabela1.colunas, date)
  } else {
    console.log(
      "Parâmetro inválido ou ausente, informe 'full' para uma carga total, ou 'incremental AAAA-MM-DD' para uma carga do dia"
    )
  }
}

main(process.argv[2], process.argv[3])
