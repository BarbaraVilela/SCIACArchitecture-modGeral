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
//    var url = 'https://sciac-api-fake.azurewebsites.net';
var url = process.env.urlAPIEstruturaOrg;


    axios.get(url)
        .then(function (response) {

            //Verifica o status da resposta
            if (response.status == 200) {
                //Atualiza cada registro, conforme dado recebido
                response.data.forEach(elemento => {
                    atualizaElementoEstrutura(elemento);
                });

            } else
                console.log(response.status + ': ' + response.data)
            throw error;

        }).catch(function (error) {
            // handle error
            console.log(error);
            throw error;
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