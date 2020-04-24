import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IoIosTrash, IoMdCreate } from "react-icons/io";

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

export default function ListLinha({ history }) {
  const [lines, setLines] = useState([]);
  const [numberPage, setNumberPage] = useState(1);
  const [linesRest, setLinesRest] = useState([]);

  useEffect(() => {
    async function loadLines(page = numberPage) {
      const response = await api.get(`/linhas?page=${page}`);
      const { docs, ...restEmployee } = response.data;

      setLines(docs);
      setLinesRest(restEmployee);
    }

    loadLines();
  }, [numberPage]);

  async function destroy(id) {
    await api.delete(`/linhas/${id}`);
    const response = await api.get("/linhas");

    const { docs, ...restEmployee } = response.data;
    setLines(docs);
    setLinesRest(restEmployee);
  }

  async function filterName(e) {
    if (e.target.value !== "") {
      const response = await api.get(`/linhas?nome=${e.target.value}`);
      setLines(response.data.docs);
    } else {
      const response = await api.get("/linhas");
      setLines(response.data.docs);
    }
  }

  function pagePrevious() {
    if (numberPage === 1) return;
    const numberOfPages = numberPage - 1;
    setNumberPage(numberOfPages);
  }

  function pageNext() {
    if (numberPage === linesRest.pages) return;
    const numberOfPages = numberPage + 1;

    setNumberPage(numberOfPages);
  }

  return (
    <>
      <SideBar />

      <Container>
        <Content>
          <h1>Linhas</h1>
          <Pesquisa>
            <input
              onChange={filterName}
              type="text"
              name="nome"
              placeholder="Pesquisar por nome"
            />
          </Pesquisa>
          <Table>
            <table>
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>Cidade Início</th>
                  <th>Cidade Fim</th>
                  <th>Encarregado</th>
                  <th>QTD Tratores</th>
                  <th>QTD Tratoristas</th>
                  <th>QTD Trabalhadores Manual</th>
                  <th>Ação</th>
                </tr>
              </thead>
              <tbody>
                {lines.map(line => {
                  return (
                    <tr key={line._id}>
                      <td>{line.nome}</td>
                      <td>{line.cidadeInicio}</td>
                      <td>{line.cidadeFim}</td>
                      <td>{line.funcionario.nome}</td>
                      <td>{line.qtdTratores}</td>
                      <td>{line.qtdTratoristas}</td>
                      <td>{line.qtdTrabalhadoresManual}</td>
                      <td>
                        <Link to={`/cadlinha/${line._id}`}>
                          <IoMdCreate />
                        </Link>
                        <Link
                          to="#"
                          onClick={() => {
                            if (
                              window.confirm(`Deseja excluir o(a) ${line.nome}`)
                            )
                              destroy(line._id);
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
                Quantidade de Linhas: <small>{linesRest.total}</small>
              </strong>
              <strong>
                Número de páginas: <small>{linesRest.pages}</small>
              </strong>
              <strong>
                Página atual: <small>{linesRest.page}</small>
              </strong>
            </Dados>
            <button onClick={pageNext}>Próximo</button>
          </Footer>
        </Content>
      </Container>
    </>
  );
}
