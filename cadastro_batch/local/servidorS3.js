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
  const nomeArquivo = "cadastrar_alunos.csv";
  const caminhoArquivo = join(__dirname, nomeArquivo);
  const dadosCsv = await readFile(caminhoArquivo, "utf-8");
  
  const cliente = criaClienteS3Local();

  const comandoUpload = new PutObjectCommand({
    Bucket: "alunos-csv-local",
    Key: nomeArquivo,
    Body: dadosCsv
  })

  await cliente.send(comandoUpload);
}

async function obtemDadosDoCsvDoBucket(nome, chave) {
  const cliente = criaClienteS3Local();
  const comando = new GetObjectCommand({ Bucket: nome, Key: chave });

  const resposta = await cliente.send(comando);
  const dadosCsv = await resposta.Body.transformToString("utf-8");

  return dadosCsv;
}

module.exports = {
  fazUploadNoBucket,
  obtemDadosDoCsvDoBucket
}