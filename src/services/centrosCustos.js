const axios = require('axios').default;
const CentrosCustosRepository = require('../repositories/centrosCustos');

const centrosCustosRepository = new CentrosCustosRepository();

class CentrosCustosServices {

    getAll() {
        return centrosCustosRepository.getAll();
    };

    /*
    Responsável por buscar os dados da estrutura organizacional no serviço disponibilizado pelo Sistema de Estrutura Organizacional
    e atualizar os dados de Centros de Custos contidos na base"
    */
    updateAll() {
        //Busca os dados na API Fake construída para simular o serviço disponibilizado pelo Sistema de Estrutura Organizacional
        var url = "https://sciac-api-fake.azurewebsites.net/";

        axios.get(url)
            .then(function (response) {

                //Verifica o status da resposta
                if (response.status == 200) {

                    //Atualiza cada registro, conforme dado recebido
                    response.data.forEach(element => {
                        atualizaElementoEstrutura(element);
                    });

                    return getAll();

                } else
                    return 'error: Não foi possível conectar-se ao sistema de origem dos dados';

            }).catch(function (error) {
                // handle error
                console.log(error);
                return 'error: ' + error.message;
            });
    };

    atualizaElementoEstrutura(elemento) {
        console.log(elemento.nome);
    };

}

module.exports = CentrosCustosServices;