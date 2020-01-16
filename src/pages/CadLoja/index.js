import React, { useState, useEffect } from "react";
import { Form, Input, Select } from "unform";
import toastr from "toastr";
import "toastr/build/toastr.min.css";

import { Container, ContentForm } from "../../styles/form";
import Sidebar from "../../components/Sidebar";

import api from "../../services/api";
import estados from "../../services/estados";

export default function CadLoja({ history, match }) {
  const [data, setData] = useState({});

  async function handlerSubmit(data) {
    if (!match.params.id) {
      if (
        !data.nome ||
        !data.proprietario ||
        !data.cnpj ||
        !data.endereco ||
        !data.cidade ||
        !data.bairro ||
        !data.estado ||
        !data.numeroCasa ||
        !data.cep ||
        !data.telefone
      ) {
        toastr.error(`Preencha todos os campos obrigatórios (*)!
        `);
      } else {
        try {
          await api.postOrPut("/lojas", match.params.id, data);
          toastr.success(`Loja cadastrada com sucesso!
          `);
          setTimeout(() => history.go(0), 1000);
        } catch (error) {
          toastr.error(error.response.data.error);
        }
      }
    } else {
      try {
        await api.postOrPut("/lojas", match.params.id, data);
        toastr.success(`Alteração feita com sucesso!
        `);
        history.push("/loja");
      } catch (error) {
        toastr.error(error.response.data.error);
      }
    }
  }

  //update
  useEffect(() => {
    async function loadData() {
      if (match.params.id) {
        const { id } = match.params;
        const response = await api.get(`/lojas/${id}`);

        setData(response.data);
      }
    }

    if (match.params.id) {
      loadData();
    }
  }, [match.params, match.params.id]);

    const accountType = [
      { id: "Corrente", title: "Corrente" },
      { id: "Poupança", title: "Poupança" }
    ];

  return (
    <Container>
      <Sidebar />
      <Form initialData={data} onSubmit={handlerSubmit}>
        <h1>Cadastro de Loja</h1>
        <ContentForm>
          <div>
            <Input name="nome" label="Nome da Loja *" />
            <Input name="proprietario" label="Nome do Proprietário *" />
            <Input name="cnpj" label="CNPJ/CPF *" />
            <Input name="endereco" label="Endereco *" />
            <Input name="bairro" label="Bairro *" />
            <Input name="cidade" label="Cidade *" />
            <Select
              name="estado"
              options={estados}
              value={data.estado}
              label="Estado"
            />
            <Input name="numeroCasa" label="Número da Loja *" />
          </div>
          <div>
            <Input name="cep" label="CEP *" />
            <Input name="telefone" label="Telefone *" />
            <Input name="whatsapp" label="Whatsapp" />
            <Input name="agenciaBancaria" label="Agência Bancária" />

            <Input name="contaBancaria" label="Conta Bancária" />

            <Select
              name="tipoConta"
              options={accountType}
              value={data.tipoConta}
              label="Tipo de Conta"
            />

            <Input name="banco" label="Banco" />
          </div>
        </ContentForm>
        <div className="buttons">
          <button type="submit">Salvar</button>
          {match.params.id && (
            <button
              onClick={() => history.push("/loja")}
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
