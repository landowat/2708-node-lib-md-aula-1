import chalk from 'chalk';
import fs from 'fs';
import pegaArquivoAssincV2 from './index.js';
import validaLinks from './http-validacao.js'

const parametros = process.argv;

async function imprimeLinks(validacao, listaLinks, nomeDoArquivo) {
    // console.log(`${caminho}/${nomeDoArquivo}`);

    if (validacao) {
        console.log(
            chalk.yellowBright('Lista Validada'),
            chalk.black.bgGreen(nomeDoArquivo), 
            await validaLinks(listaLinks)
        );
    } else {
        console.log(
            chalk.yellowBright('Lista de Links'),
            chalk.black.bgGreen(nomeDoArquivo), 
            listaLinks
        );
    }
}

async function processaTexto(parametros) {
    const caminho = parametros[2];
    const validacao = parametros[3] === '--validacao'

    try {
        fs.lstatSync(caminho);
    } catch(erro) {
        if(erro.code === 'ENOENT'){
            console.log('Diretório não encontrado');
            return; 
        } 
    }

    if(fs.lstatSync(caminho).isFile()) {
        const result =  await pegaArquivoAssincV2(caminho);
        imprimeLinks(validacao, result, caminho);
    }
    else if(fs.lstatSync(caminho).isDirectory) {
        const arquivos = await fs.promises.readdir(caminho);
        arquivos.forEach(async (nomeDoArquivo) => {
            const lista = await pegaArquivoAssincV2(`${caminho}/${nomeDoArquivo}`);
            imprimeLinks(validacao, lista, nomeDoArquivo);
        })  
    }
}

processaTexto(parametros);