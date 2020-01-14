import React, { useState, useEffect } from "react";
import { Form, Input, Select } from "unform";
import { formatToTimeZone } from "date-fns-timezone";
import toastr from "toastr";
import "toastr/build/toastr.min.css";

import { Container, ContentForm } from "../../styles/form";
import Sidebar from "../../components/Sidebar";

import api from "../../services/api";
import estados from "../../services/estados";

export default function CadFuncionario({ history, match }) {
  const [data, setData] = useState({});

  async function handlerSubmit(data) {
    if (!match.params.id) {
      if (
        !data.nome ||
        !data.rg ||
        !data.cpf ||
        !data.dataNascimento ||
        !data.dataAdmissao ||
        !data.telefone ||
        !data.endereco ||
        !data.numeroCasa ||
        !data.bairro ||
        !data.cidade ||
        !data.estado ||
        !data.cep ||
        !data.agenciaBancaria ||
        !data.contaBancaria ||
        !data.tipoConta ||
        !data.banco ||
        !data.pis
      ) {
        toastr.error(`Preencha todos os campos obrigatórios (*)!
        `);
      } else {
        try {
          await api.postOrPut("/funcionarios", match.params.id, data);
          toastr.success(`Funcionários cadastrado com sucesso!
          `);
          setTimeout(() => history.go(0), 1000);
        } catch (error) {
          toastr.error(error.response.data.error);
        }
      }
    } else {
      try {
        await api.postOrPut("/funcionarios", match.params.id, data);
        toastr.success(`Alteração feita com sucesso!
        `);
        history.push("/funcionario");
      } catch (error) {
        toastr.error(error.response.data.error);
      }
    }
  }

  useEffect(() => {
    async function loadData() {
      if (match.params.id) {
        const { id } = match.params;
        const response = await api.get(`/funcionarios/${id}`);

        setData(response.data);
      }
    }

    if (match.params.id) {
      loadData();
    }
  }, [match.params, match.params.id]);

  useEffect(
    () => {
      if (match.params.id) {
        const birthDate = formatToTimeZone(data.dataNascimento, "YYYY-MM-DD", {
          timeZone: "Europe/Berlin"
        });

        const admissionDate = formatToTimeZone(
          data.dataAdmissao,
          "YYYY-MM-DD",
          {
            timeZone: "Europe/Berlin"
          }
        );

        setData({
          ...data,
          dataNascimento: birthDate,
          dataAdmissao: admissionDate
        });
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [data.dataNascimento, data.dataAdmissao, match.params.id]
  );

  const accountType = [
    { id: "Corrente", title: "Corrente" },
    { id: "Poupança", title: "Poupança" }
  ];

  return (
    <Container>
      <Sidebar />
      <Form initialData={data} onSubmit={handlerSubmit}>
        <h1>Cadastro de Funcionários</h1>
        <ContentForm>
          <div>
            <Input name="nome" label="Nome *" />

            <Input name="rg" label="RG *" />

            <Input name="cpf" label="CPF *" />

            <Input name="cnh" label="CNH" />

            <Input
              type="date"
              name="dataNascimento"
              label="Data Nascimento *"
            />

            <Input type="date" name="dataAdmissao" label="Data Admissão *" />

            <Input name="cargo" label="Cargo" />

            <Input name="telefone" label="Telefone *" />

            <Input name="whatsapp" label="Whatsapp" />

            <Input name="email" type="email" label="Email" />

            <Input name="endereco" label="Endereço *" />
          </div>
          <div>
            <Input name="numeroCasa" label="Número Casa *" />

            <Input name="bairro" label="Bairro *" />

            <Input name="cidade" label="Cidade *" />

            <Select
              name="estado"
              options={estados}
              value={data.estado}
              label="Estado *"
            />

            <Input name="cep" label="CEP *" />

            <Input name="salarioFixo" label="Salário Fixo" />

            <Input name="agenciaBancaria" label="Agência Bancária *" />

            <Input name="contaBancaria" label="Conta Bancária *" />

            <Select
              name="tipoConta"
              options={accountType}
              value={data.tipoConta}
              label="Tipo de Conta *"
            />

            <Input name="banco" label="Banco *" />

            <Input name="pis" label="PIS *" />
          </div>
        </ContentForm>
        <div className="buttons">
          <button type="submit">Salvar</button>
          {match.params.id && (
            <button
              onClick={() => history.push("/funcionario")}
              className="canceled"
              type="submit"
            >
              Cancelar
            </button>
          )}
        </div>
      </Form>
    </Container>
  );
}
