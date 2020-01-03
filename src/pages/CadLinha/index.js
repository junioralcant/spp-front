import React, { useState, useEffect } from "react";
import { Form, Input } from "unform";
import Select from "react-select";
import toastr from "toastr";
import "toastr/build/toastr.min.css";

import { Container, ContentForm } from "./styles";
import Sidebar from "../../components/Sidebar";
import { colorStyle } from "../../styles/select";

import api from "../../services/api";
export default function CadLinha({ history, match }) {
  const [data, setData] = useState({});
  const [inCharges, setInCharges] = useState({});
  const [selectIncharge, setSelectIncharge] = useState();

  useEffect(() => {
    async function loadInCharge() {
      const response = await api.get("/encarregados");
      setInCharges(response.data.docs);
    }

    loadInCharge();
  }, []);

  async function handlerSubmit(data) {
    if (!match.params.id) {
      if (
        !data.nome ||
        !selectIncharge ||
        !data.cidadeInicio ||
        !data.cidadeFim ||
        !data.qtdTratores ||
        !data.qtdTratoristas ||
        !data.qtdTrabalhadoresManual
      ) {
        toastr.error(`Preencha todos os campos obrigatórios (*)!
        `);
      } else {
        try {
          data.encarregado = selectIncharge;
          await api.postOrPut("/linhas", match.params.id, data);
          toastr.success(`Linha cadastrado com sucesso!
          `);
          setTimeout(() => history.go(0), 1000);
        } catch (error) {
          toastr.error(error.response.data.error);
        }
      }
    } else {
      try {
        data.encarregado = selectIncharge;
        await api.postOrPut("/linhas", match.params.id, data);
        toastr.success(`Alteração feita com sucesso!
        `);
        history.push("/");
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
        const response = await api.get(`/linhas/${id}`);

        setData(response.data);
      }
    }

    if (match.params.id) {
      loadData();
    }
  }, [match.params, match.params.id]);

  const optionsExistents = [
    data.encarregado != null && {
      id: data.encarregado._id,
      name: data.encarregado.nome
    }
  ];

  console.log(data);

  function setInCharge(value) {
    setSelectIncharge(value);
  }
  return (
    <Container>
      <Sidebar />
      <Form initialData={data} onSubmit={handlerSubmit}>
        <h1>Cadastro de Linha</h1>
        <ContentForm>
          <div>
            <Input name="nome" label="Nome *" />
            <div className="select">
              <span>Encarregado *</span>

              <Select
                options={inCharges}
                name="funcionario.nome"
                placeholder={optionsExistents.map(fun => {
                  return fun.name;
                })}
                styles={colorStyle}
                getOptionLabel={incharge => incharge.funcionario.nome}
                getOptionValue={incharge => incharge._id}
                onChange={value => setInCharge(value._id)}
              />
            </div>
            <Input name="cidadeInicio" label="Cidade Início *" />
            <Input name="cidadeFim" label="Cidade Fim *" />
          </div>
          <div>
            <Input name="qtdTratores" label="Quantidade de Tratores *" />
            <Input name="qtdTratoristas" label="Quantidade de Tratoristas *" />
            <Input
              name="qtdTrabalhadoresManual"
              label="Quantidade de Trabalhadores Manual *"
            />
          </div>
        </ContentForm>
        <div className="buttons">
          <button type="submit">Salvar</button>
          {match.params.id && (
            <button
              onClick={() => history.push("/encarregado")}
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
