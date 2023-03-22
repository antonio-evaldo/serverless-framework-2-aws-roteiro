const { parse } = require("fast-csv");

function converteDadosCsv(dadosCsv) {
  const stream = parse()
    .on("data", (aluno) => console.log(aluno))
    .on("error", () => console.log("Erro na conversão do CSV."))
    .on("end", () => console.log("Conversão finalizada"));

  stream.write(dadosCsv);
  stream.end();
}

module.exports = { converteDadosCsv };