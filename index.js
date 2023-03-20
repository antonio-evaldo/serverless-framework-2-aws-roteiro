module.exports.simulandoUploadDoCSV = async (evento) => {
  try {
    console.log("Simule aqui o upload do arquivo...");

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
