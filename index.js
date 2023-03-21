const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");

async function fazUploadNoBucket() {
  const cliente = new S3Client({
    forcePathStyle: true,
    credentials: {
      accessKeyId: "S3RVER",
      secretAccessKey: "S3RVER"
    },
    endpoint: "http://localhost:4569"
  });

  const comandoUpload = new PutObjectCommand({
    Bucket: "alunos-csv-local",
    Key: "cadastrar_alunos.csv",
    Body: Buffer.from("1234")
  })

  await cliente.send(comandoUpload);
}

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
  console.log("Função 'cadastrarAlunos' foi executada por um evento do S3! Informações do evento: ");
  console.log(evento);
};
