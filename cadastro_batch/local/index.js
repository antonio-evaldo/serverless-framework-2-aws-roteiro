const { fazUploadNoBucket, obtemDadosDoCsvDoBucket } = require("./servidorS3");

module.exports.simulandoUploadDoCSV = async (evento) => {
  try {
    await fazUploadNoBucket();

    return {
      statusCode: 200,
      body: JSON.stringify({
        mensagem: "Simulando upload de arquivo..."
      })
    }
  } catch (erro) {
    return {
      statusCode: erro.statusCode || 500,
      body: JSON.stringify(erro)
    }
  }
}

module.exports.cadastrarAlunos = async (evento) => {
  const eventoS3 = evento.Records[0].s3;

  const nomeBucket = eventoS3.bucket.name;
  const chaveBucket = decodeURIComponent(eventoS3.object.key.replace(/\+/g), " ");

  const dadosCsv = await obtemDadosDoCsvDoBucket(nomeBucket, chaveBucket);

  console.log(dadosCsv);
};
