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
    //        var url = 'https://sciac-api-fake.azurewebsites.net';
    var url = 'http://localhost:8910';

    axios.get(url, { proxy: false })
        .then(function (response) {

            //Verifica o status da resposta
            if (response.status == 200) {

                //Atualiza cada registro, conforme dado recebido
                response.data.forEach(elemento => {
                    atualizaElementoEstrutura(elemento);
                });

                return 'Finalmente passamos por mais um bizil';

            } else
                console.log(response.status + ': ' + response.data)
            return 'Erro: Não foi possível conectar-se ao sistema de origem dos dados';

        }).catch(function (error) {
            // handle error
            console.log(error);
            return 'Erro: Não foi possível conectar-se ao sistema de origem dos dados';
        });
};

function atualizaElementoEstrutura(elemento) {
    console.log("Atualizando...");
    console.log(elemento);

    //Encontra o elemento na base
    let centroCusto = centrosCustosRepository.getByIdUnidadeOrg(elemento.idUnidadeOrganizacional);
    console.log(centroCusto);

    //Se o centro de custo já existe na base, atualiza-o:
    if (centroCusto) {
        centroCusto.nome = elemento.nomeUnidadeOrgacional;
        centroCusto.sigla = elemento.siglaUnidadeOrganizacional;

        console.log(centroCusto);
        centrosCustosRepository.update(centroCusto);

        //Caso contrário, cria-o:
    } else {
        console.log("Cria um novo centro de custo");
        const centroCustoNovo = {
            id: undefined,
            nome: elemento.nomeUnidadeOrgacional,
            sigla: elemento.siglaUnidadeOrganizacional,
            idUnidadeOrganizacional: elemento.idUnidadeOrganizacional
        }

        centrosCustosRepository.add(centroCustoNovo);
        console.log(centroCustoNovo);
    }
};

module.exports = {
    getAll,
    updateAll
};