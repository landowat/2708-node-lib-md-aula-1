import chalk from 'chalk';
import fs from 'fs';
import pegaArquivoAssincV2 from './index.js';

const parametros = process.argv;

function imprimeLinks(listaLinks, nomeDoArquivo) {
    // console.log(`${caminho}/${nomeDoArquivo}`);
    console.log(
        chalk.yellowBright('Lista de Links'),
        chalk.black.bgGreen(nomeDoArquivo), 
        listaLinks
    );
}

async function processaTexto(parametros) {
    const caminho = parametros[2];

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
        imprimeLinks(result, caminho);
    }
    else if(fs.lstatSync(caminho).isDirectory) {
        const arquivos = await fs.promises.readdir(caminho);
        arquivos.forEach(async (nomeDoArquivo) => {
            const lista = await pegaArquivoAssincV2(`${caminho}/${nomeDoArquivo}`);
            imprimeLinks(lista, nomeDoArquivo);
        })  
    }
}

processaTexto(parametros);