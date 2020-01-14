import React, { useState, useEffect } from "react";

import { Container, Content, Dados, Details, Button } from "./styles";
import Sidebar from "../../components/Sidebar";

import api from "../../services/api";

export default function DetailsLoja({ match, history }) {
  const [loja, setLoja] = useState([]);

  useEffect(() => {
    async function loadLoja() {
      const { id } = match.params;
      const response = await api.get(`/lojas/${id}`);

      setLoja(response.data);
    }

    if (match.params.id) {
      loadLoja();
    }
  }, [match.params]);

  return (
    <Container>
      <Sidebar />
      <Content>
        <Dados>
          <Details>
            <header>
              <strong>Dados Pessoas</strong>
            </header>
            <ul>
              <li>
                Nome: <small>{loja.nome}</small>
              </li>
              <li>
                Proprietário: <small>{loja.proprietario}</small>
              </li>
              <li>
                CPF/CNPJ: <small>{loja.cnpj}</small>
              </li>
              <li>
                Telefone: <small>{loja.telefone}</small>
              </li>
              <li>
                Whatsapp: <small>{loja.whatsapp}</small>
              </li>
            </ul>
          </Details>

          <Details>
            <header>
              <strong>Endereço</strong>
            </header>
            <ul>
              <li>
                Estado: <small>{loja.estado}</small>
              </li>
              <li>
                Cidade: <small>{loja.cidade}</small>
              </li>
              <li>
                Bairro: <small>{loja.bairro}</small>
              </li>
              <li>
                Rua: <small>{loja.endereco}</small>
              </li>

              <li>
                Número: <small>{loja.numeroCasa}</small>
              </li>
              <li>
                CEP: <small>{loja.cep}</small>
              </li>
            </ul>
          </Details>

          <Details>
            <header>
              <strong> Dados Bancários</strong>
            </header>
            <ul>
              <li>
                Banco: <small>{loja.banco}</small>
              </li>
              <li>
                Agência : <small>{loja.agenciaBancaria}</small>
              </li>
              <li>
                Conta: <small>{loja.contaBancaria}</small>
              </li>
              <li>
                Tipo de Conta: <small>{loja.tipoConta}</small>
              </li>
            </ul>
          </Details>
        </Dados>
        <div>
          <Button
            onClick={() => {
              history.push("/loja");
            }}
          >
            Voltar
          </Button>
        </div>
      </Content>
    </Container>
  );
}
