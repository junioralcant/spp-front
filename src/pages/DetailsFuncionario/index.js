import React, { useState, useEffect } from "react";
import { formatToTimeZone } from "date-fns-timezone";

import { Container, Content, Dados, Details, Button } from "./styles";
import Sidebar from "../../components/Sidebar";

import api from "../../services/api";

export default function DetailsFuncionario({ match, history }) {
  const [employee, setEmployee] = useState([]);

  useEffect(() => {
    async function loadEmployee() {
      const { id } = match.params;
      const response = await api.get(`/funcionarios/${id}`);

      setEmployee(response.data);
    }

    if (match.params.id) {
      loadEmployee();
    }
  }, [match.params]);

  const birthDate = formatToTimeZone(employee.dataNascimento, "DD-MM-YYYY", {
    timeZone: "Europe/Berlin"
  });

  const admissionDate = formatToTimeZone(employee.dataAdmissao, "DD-MM-YYYY", {
    timeZone: "Europe/Berlin"
  });

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
                Nome: <small>{employee.nome}</small>
              </li>
              <li>
                RG: <small>{employee.rg}</small>
              </li>
              <li>
                CPF: <small>{employee.cpf}</small>
              </li>
              <li>
                CNH: <small>{employee.cnh}</small>
              </li>
              <li>
                PIS: <small>{employee.pis}</small>
              </li>
              <li>
                Data Nascimento: <small>{birthDate}</small>
              </li>

              <li>
                Data Admissão: <small>{admissionDate}</small>
              </li>
              <li>
                Cargo: <small>{employee.cargo}</small>
              </li>
              <li>
                Telefone: <small>{employee.telefone}</small>
              </li>
              <li>
                Whatsapp: <small>{employee.whatsapp}</small>
              </li>
            </ul>
          </Details>

          <Details>
            <header>
              <strong>Endereço</strong>
            </header>
            <ul>
              <li>
                Estado: <small>{employee.estado}</small>
              </li>
              <li>
                Cidade: <small>{employee.cidade}</small>
              </li>
              <li>
                Bairro: <small>{employee.bairro}</small>
              </li>
              <li>
                Rua: <small>{employee.endereco}</small>
              </li>

              <li>
                Número da Casa: <small>{employee.numeroCasa}</small>
              </li>
              <li>
                CEP: <small>{employee.cep}</small>
              </li>
            </ul>
          </Details>

          <Details>
            <header>
              <strong> Dados Bancários</strong>
            </header>
            <ul>
              <li>
                Banco: <small>{employee.banco}</small>
              </li>
              <li>
                Agência : <small>{employee.contaBancaria}</small>
              </li>
              <li>
                Conta: <small>{employee.contaBancaria}</small>
              </li>
              <li>
                Tipo de Conta: <small>{employee.tipoConta}</small>
              </li>
            </ul>
          </Details>
        </Dados>
        <div>
          <Button
            onClick={() => {
              history.push("/funcionario");
            }}
          >
            Voltar
          </Button>
        </div>
      </Content>
    </Container>
  );
}
