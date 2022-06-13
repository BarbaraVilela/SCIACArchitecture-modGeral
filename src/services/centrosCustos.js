#!/usr/bin/env node

const axios = require('axios').default;
const centrosCustosRepository = require('../repositories/centrosCustos');

function getAll() {
    return centrosCustosRepository.getAll();
};

/*
Responsável por buscar os dados da estrutura organizacional no serviço disponibilizado pelo Sistema de Estrutura Organizacional
e atualizar os dados de Centros de Custos contidos na base"
*/
function updateAll() {
    //Busca os dados na API Fake construída para simular o serviço disponibilizado pelo Sistema de Estrutura Organizacional

var url = process.env.urlAPIEstruturaOrg || 'https://sciac-api-fake.azurewebsites.net';
console.log(process.env.urlAPIEstruturaOrg ? "Encontrada informação de url configurada no ambiente" : "Configuração de url não encontrada no ambiente");

    axios.get(url)
        .then(function (response) {
            console.log("Acesso ao url da Estrutura Organizacional realizado com sucesso...");

            //Verifica o status da resposta
            if (response.status == 200) {
                //Atualiza cada registro, conforme dado recebido
                console.log("Inicia a atualização dos dados de centros de custos");
                response.data.forEach(elemento => {
                    console.log("Elemento 1: " + elemento.nomeUnidadeOrgacional)
                    atualizaElementoEstrutura(elemento);
                });

            } else
            throw new Error("Erro ao acessar o serviço da Estrutura Organizacional. Status code inesperado: " + response.status)

        }).catch(function (error) {
            // handle error
            console.log(error);
            console.log("Erro ao conectar-se ao serviço da Estrutura Organizacional");
            throw new Error("Erro ao conectar-se ao serviço da Estrutura Organizacional" + error.message);
        });
};

function atualizaElementoEstrutura(elemento) {
    //Encontra o elemento na base
    let centroCusto = centrosCustosRepository.getByIdUnidadeOrg(elemento.idUnidadeOrganizacional);

    //Se o centro de custo já existe na base, atualiza-o:
    if (centroCusto) {
        centroCusto.nome = elemento.nomeUnidadeOrgacional;
        centroCusto.sigla = elemento.siglaUnidadeOrganizacional;

        centrosCustosRepository.update(centroCusto);

        //Caso contrário, cria-o:
    } else {
        const centroCustoNovo = {
            id: undefined,
            nome: elemento.nomeUnidadeOrgacional,
            sigla: elemento.siglaUnidadeOrganizacional,
            idUnidadeOrganizacional: elemento.idUnidadeOrganizacional
        }

        centrosCustosRepository.add(centroCustoNovo);
    }
};

module.exports = {
    getAll,
    updateAll
};