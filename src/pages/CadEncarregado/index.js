import React, { useState, useEffect } from "react";
import { Form, Input } from "unform";
import Select from "react-select";
import toastr from "toastr";
import "toastr/build/toastr.min.css";

import { Container, ContentForm } from "../../styles/form";
import Sidebar from "../../components/Sidebar";
import { colorStyle } from "../../styles/select";

import api from "../../services/api";

export default function CadEncarregado({ history, match }) {
  const [data, setData] = useState({});
  const [employees, setEmployees] = useState();
  const [selectEmplo, setSelectEmplo] = useState();

  useEffect(() => {
    async function loadEmployees() {
      const response = await api.get("/funcionarios");
      setEmployees(response.data.docs);
    }

    loadEmployees();
  }, []);

  async function handlerSubmit(data) {
    if (!match.params.id) {
      if (!data.setor || !selectEmplo) {
        toastr.error(`Preencha todos os campos obrigatórios (*)!
        `);
      } else {
        try {
          data.funcionario = selectEmplo;
          await api.postOrPut("/encarregados", match.params.id, data);
          toastr.success(`Encarregado cadastrado com sucesso!
          `);
          setTimeout(() => history.go(0), 1000);
        } catch (error) {
          toastr.error(error.response.data.error);
        }
      }
    } else {
      try {
        data.funcionario = selectEmplo;
        await api.postOrPut("/encarregados", match.params.id, data);
        toastr.success(`Alteração feita com sucesso!
        `);
        history.push("/encarregado");
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
        const response = await api.get(`/encarregados/${id}`);

        setData(response.data);
      }
    }

    if (match.params.id) {
      loadData();
    }
  }, [match.params, match.params.id]);

  const optionsExistents = data.funcionario != null && {
    id: data.funcionario._id,
    name: data.funcionario.nome
  };

  function setEmployee(value) {
    setSelectEmplo(value);
  }

  return (
    <Container>
      <Sidebar />
      <Form initialData={data} onSubmit={handlerSubmit}>
        <h1>Cadastro de Encarregado</h1>
        <ContentForm>
          <div className="select">
            <span>Funcionários</span>
            <Select
              options={employees}
              name="funcionario.nome"
              placeholder={optionsExistents.name}
              styles={colorStyle}
              getOptionLabel={employee => employee.nome}
              getOptionValue={employee => employee._id}
              onChange={value => setEmployee(value._id)}
            />
          </div>
          <div>
            <Input name="setor" label="Setor" />
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
