import chalk from "chalk";

function criaLista (listaDeLinks) {
    return listaDeLinks.map((objetoLink) => Object.values(objetoLink).join());
}

async function checaStatusUrl(arrLinks) {
    const arrStatus = Promise
    .all(
        arrLinks.map(async (url) => {
            try {
                const response = await fetch(url);
                return response.status;
            } catch (erro) {
                return manejaErros(erro);
            }
        })
    )
    return arrStatus;
}

function manejaErros(erro) {
    if(erro.cause.code === 'ENOTFOUND') {
        return 'Url não encontrada.';
    } else {
        return 'Ocorreu um erro inesperado.';
    }
}

export default async function listaValidada(listaDeLinks) {
    const links =  criaLista(listaDeLinks);
    const status = await checaStatusUrl(links);
    console.log(status);

    return listaDeLinks.map((objeto, valor) => ({
        ...objeto,
        status: status[valor],
    }));
}