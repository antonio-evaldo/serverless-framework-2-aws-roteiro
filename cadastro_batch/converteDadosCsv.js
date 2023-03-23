const { parse } = require("fast-csv");

async function converteDadosCsv(dadosCsv) {
  const resultado = await new Promise((resolver, rejeitar) => {
    const alunos = [];

    const stream = parse({ headers: ["nome", "email"], renameHeaders: true })
      .on("data", (aluno) => {
        console.log(aluno);
        alunos.push(aluno);
      })
      .on("error", () => rejeitar(new Error("Erro na conversão do arquivo CSV.")))
      .on("end", () => {
        console.log("Conversão finalizada");
        resolver(alunos);
      });
  
    stream.write(dadosCsv);
    stream.end();
  });

  if (resultado instanceof Error) throw resultado;

  return resultado;
}

module.exports = { converteDadosCsv };