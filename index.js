const { S3Client, PutObjectCommand, GetObjectCommand } = require("@aws-sdk/client-s3");
const { join } = require("path");
const { readFile } = require("fs/promises");

function criaClienteS3Local() {
  return new S3Client({
    forcePathStyle: true,
    credentials: {
      accessKeyId: "S3RVER",
      secretAccessKey: "S3RVER"
    },
    endpoint: "http://localhost:4569"
  });
}

async function fazUploadNoBucket() {
  const cliente = criaClienteS3Local();

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

async function obtemDadosDoCsvDoBucket(nome, chave) {
  const cliente = criaClienteS3Local();
  const comando = new GetObjectCommand({ Bucket: nome, Key: chave });

  const resposta = await cliente.send(comando);
  const dadosCsv = await resposta.Body.transformToString("utf-8");

  return dadosCsv;
}

module.exports.cadastrarAlunos = async (evento) => {
  const eventoS3 = evento.Records[0].s3;

  const nomeBucket = eventoS3.bucket.name;
  const chaveBucket = decodeURIComponent(eventoS3.object.key.replace(/\+/g), " ");

  const dadosCsv = await obtemDadosDoCsvDoBucket(nomeBucket, chaveBucket);

  console.log(dadosCsv);
};
