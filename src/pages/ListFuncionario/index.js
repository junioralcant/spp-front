import React, { useEffect, useState } from "react";
import { formatToTimeZone } from "date-fns-timezone";
import { Link } from "react-router-dom";
import { IoIosTrash, IoMdAddCircleOutline, IoMdCreate } from "react-icons/io";

import api from "../../services/api";
import SideBar from "../../components/Sidebar";
import {
  Container,
  Table,
  Pesquisa,
  Content,
  Footer,
  Dados
} from "../../styles/list";

export default function ListFuncionario({ history }) {
  const [employees, setEmployees] = useState([]);
  const [numberPage, setNumberPage] = useState(1);
  const [employeesRest, setEmployeesRest] = useState([]);

  useEffect(() => {
    async function loadEmployees(page = numberPage) {
      const response = await api.get(`/funcionarios?page=${page}`);
      const { docs, ...restEmployee } = response.data;

      setEmployees(docs);
      setEmployeesRest(restEmployee);
    }

    loadEmployees();
  }, [numberPage]);

  async function destroy(id) {
    await api.delete(`/funcionarios/${id}`);
    const response = await api.get("/funcionarios");

    const { docs, ...restEmployee } = response.data;
    setEmployees(docs);
    setEmployeesRest(restEmployee);
  }

  async function filterName(e) {
    if (e.target.value !== "") {
      const response = await api.get(`/funcionarios?nome=${e.target.value}`);
      setEmployees(response.data.docs);
    } else {
      const response = await api.get("/funcionarios");
      setEmployees(response.data.docs);
    }
  }

  async function filterCpf(e) {
    if (e.target.value !== "") {
      const response = await api.get(`/funcionarios?cpf=${e.target.value}`);
      setEmployees(response.data.docs);
    } else {
      const response = await api.get("/funcionarios");
      setEmployees(response.data.docs);
    }
  }

  async function filterRg(e) {
    if (e.target.value !== "") {
      const response = await api.get(`/funcionarios?rg=${e.target.value}`);
      setEmployees(response.data.docs);
    } else {
      const response = await api.get("/funcionarios");
      setEmployees(response.data.docs);
    }
  }

  function pagePrevious() {
    if (numberPage === 1) return;
    const numberOfPages = numberPage - 1;
    setNumberPage(numberOfPages);
  }

  function pageNext() {
    if (numberPage === employeesRest.pages) return;
    const numberOfPages = numberPage + 1;

    setNumberPage(numberOfPages);
  }

  return (
    <Container>
      <SideBar />
      <Content>
        <h1>Funcionários</h1>
        <Pesquisa>
          <input
            onChange={filterName}
            type="text"
            name="nome"
            placeholder="Pesquisar por nome"
          />
          <input
            onChange={filterCpf}
            type="text"
            name="cpf"
            placeholder="Pesquisar por cpf"
          />
          <input
            onChange={filterRg}
            type="text"
            name="rg"
            placeholder="Pesquisar por rg"
          />
        </Pesquisa>
        <Table>
          <table>
            <thead>
              <tr>
                <th>Nome</th>
                <th>RG</th>
                <th>CPF</th>
                <th>Data Nascimento</th>
                <th>Salário Fixo</th>
                <th>Cargo</th>
                <th>Endereço</th>
                <th>Cidade</th>
                <th>Estado</th>
                <th>Bairro</th>
                <th>Telefone</th>
                <th>Ação</th>
              </tr>
            </thead>
            <tbody>
              {employees.map(employee => {
                const dataNascimento = formatToTimeZone(
                  employee.dataNascimento,
                  "DD-MM-YYYY",
                  {
                    timeZone: "Europe/Berlin"
                  }
                );
                return (
                  <tr key={employee._id}>
                    <td>{employee.nome}</td>
                    <td>{employee.rg}</td>
                    <td>{employee.cpf}</td>
                    <td>{dataNascimento}</td>
                    <td>{employee.salarioFixo}</td>
                    <td>{employee.cargo}</td>
                    <td>{employee.endereco}</td>
                    <td>{employee.cidade}</td>
                    <td>{employee.estado}</td>
                    <td>{employee.bairro}</td>
                    <td>{employee.telefone}</td>
                    <td>
                      <Link to={`/cadfuncionario/${employee._id}`}>
                        <IoMdCreate />
                      </Link>
                      <Link to={`/detailsfuncionario/${employee._id}`}>
                        <IoMdAddCircleOutline />
                      </Link>
                      <Link
                        to="#"
                        onClick={() => {
                          if (
                            window.confirm(
                              `Deseja excluir o(a) ${employee.nome}`
                            )
                          )
                            destroy(employee._id);
                        }}
                      >
                        <IoIosTrash />
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </Table>
        <Footer>
          <button onClick={pagePrevious}>Anterior</button>
          <Dados>
            <strong>
              Quantidade de Funcionários: <small>{employeesRest.total}</small>
            </strong>
            <strong>
              Número de páginas: <small>{employeesRest.pages}</small>
            </strong>
            <strong>
              Página atual: <small>{employeesRest.page}</small>
            </strong>
          </Dados>
          <button onClick={pageNext}>Próximo</button>
        </Footer>
      </Content>
    </Container>
  );
}
