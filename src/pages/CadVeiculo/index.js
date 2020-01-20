import React, { useState, useEffect } from "react";
import { Form, Input, Select as SelectUnform } from "unform";
import Select from "react-select";
import toastr from "toastr";
import "toastr/build/toastr.min.css";

import { Container, ContentForm } from "../../styles/form";
import Sidebar from "../../components/Sidebar";
import { colorStyle } from "../../styles/select";
import { Header } from "./styles";

import api from "../../services/api";

export default function CadVeiculo({ history, match }) {
  const [data, setData] = useState({});
  const [owners, setOwners] = useState();
  const [selectOwner, setSelectOwner] = useState();

  useEffect(() => {
    async function loadOwner() {
      const response = await api.get("/proprietarios");
      setOwners(response.data.docs);
    }

    loadOwner();
  }, []);

  async function handlerSubmit(data) {
    if (!match.params.id) {
      if (
        !selectOwner ||
        !data.tipo ||
        !data.status ||
        !data.modelo ||
        !data.ano
      ) {
        toastr.error(`Preencha todos os campos obrigatórios (*)!
        `);
      } else {
        try {
          data.proprietario = selectOwner;
          await api.postOrPut("/veiculos", match.params.id, data);
          toastr.success(`Veículo cadastrado com sucesso!
          `);
          setTimeout(() => history.go(0), 1000);
        } catch (error) {
          toastr.error(error.response.data.error);
        }
      }
    } else {
      try {
        data.proprietario = selectOwner;
        await api.postOrPut("/veiculos", match.params.id, data);
        toastr.success(`Alteração feita com sucesso!
        `);
        history.push("/veiculo");
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
        const response = await api.get(`/veiculos/${id}`);

        setData(response.data);
      }
    }

    if (match.params.id) {
      loadData();
    }
  }, [match.params, match.params.id]);

  const optionsExistents = data.proprietario != null && {
    id: data.proprietario._id,
    name: data.proprietario.nome
  };

  function setOwner(value) {
    setSelectOwner(value);
  }

  const status = [
    { id: "Próprio", title: "Próprio" },
    { id: "Alugado", title: "Alugado" }
  ];

  return (
    <Container>
      <Sidebar />
      <Form initialData={data} onSubmit={handlerSubmit}>
        <Header>
          <h1>Cadastro de Veículo</h1>
          <button onClick={() => history.push("/cadproprietario")}>
            Cadastar proprietário
          </button>
        </Header>

        <ContentForm>
          <div>
            <div className="select">
              <span>Proprietário *</span>
              <Select
                options={owners}
                placeholder={optionsExistents.name}
                styles={colorStyle}
                getOptionLabel={employee => employee.nome}
                getOptionValue={employee => employee._id}
                onChange={value => setOwner(value._id)}
              />
            </div>
            <Input name="tipo" label="Tipo *" />
            <SelectUnform
              name="status"
              options={status}
              value={data.status}
              label="Status"
            />
            <Input name="modelo" label="Modelo *" />
          </div>

          <div>
            <Input name="ano" label="Ano *" />
            <Input name="placa" label="Placa" />
            <Input name="chassi" label="Chassi" />
            <Input name="numeroDeSerie" label="Número de Série" />
          </div>
        </ContentForm>
        <div className="buttons">
          <button type="submit">Salvar</button>
          {match.params.id && (
            <button
              onClick={() => history.push("/veiculo")}
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
