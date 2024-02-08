import fs from 'fs';
import chalk from 'chalk';

function extraiLinks(texto) {
    const regex = /\[([^[\]]*?)\]\((https?:\/\/[^\s?#.].[^\s]*)\)/gm;
    const compare = [...texto.matchAll(regex)];

    const resultados = compare.map(compare => ({[compare[1]]: [compare[2]]}))

    return resultados.length !== 0 ? resultados : 'não há links no arquivo';
}

function trataErro(erro) {
    console.log(erro);

    throw new Error(chalk.bgRed(erro.code, 'arquivo não encontrado no diretório informado.'));
}

// Sincrono
function pegaArquivo(caminhoArquivo) {
    const encoding = 'utf-8';

    fs.readFile(caminhoArquivo, encoding, (erro,texto) => {
        if(erro) {
            trataErro(erro);
        }

        console.log(chalk.blueBright(texto))
    })
}

// Assincrono - promoses com then
function pegaArquivoAssinc(caminhoArquivo) {
    const encoding = 'utf-8';

    fs.promises.readFile(caminhoArquivo, encoding)
        .then((texto) => console.log(chalk.greenBright(texto)))
        .catch(trataErro)
}

// Assincrono - async await
async function pegaArquivoAssincV2(caminhoArquivo) {
    try {
        const encoding = 'utf-8';
        const texto = await fs.promises.readFile(caminhoArquivo, encoding);

        return extraiLinks(texto);
    } catch (erro) {
        trataErro(erro)
    }
}

// //encadear métodos para colorir texto, cor de fundo e texto em negrito
// console.log(chalk.blue.bgWhite.bold('Alura'));
// //receber múltiplos argumentos
// console.log(chalk.blue('curso', 'de', 'Node.js'));
// //métodos aninhados
// console.log(chalk.red('vermelho', chalk.underline.bgBlue('azul')));
// // uso de template strings e placeholders
// console.log(`
// CPU: ${chalk.red('90%')}
// RAM: ${chalk.green('40%')}
// DISK: ${chalk.yellow('70%')}
// `);

// pegaArquivo('./arquivos/texto.md');

// pegaArquivoAssinc('./arquivos/texto.md');

// pegaArquivoAssincV2('./arquivos/texto.md');

// console.log(result)
// pegaArquivoAssincV2('./arquivos/');

// pegaArquivoAssincV2('./arquivos/texto.md')

export default pegaArquivoAssincV2;