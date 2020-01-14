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

export default function ListEncarregado({ history }) {
  const [inCharges, setInCharges] = useState([]);
  const [numberPage, setNumberPage] = useState(1);
  const [inChargesRest, setInChargesRest] = useState([]);

  useEffect(() => {
    async function loadInCharges(page = numberPage) {
      const response = await api.get(`/encarregados?page=${page}`);
      const { docs, ...restEmployee } = response.data;

      setInCharges(docs);
      setInChargesRest(restEmployee);
    }

    loadInCharges();
  }, [numberPage]);

  async function destroy(id) {
    await api.delete(`/encarregados/${id}`);
    const response = await api.get("/encarregados");

    const { docs, ...restEmployee } = response.data;
    setInCharges(docs);
    setInChargesRest(restEmployee);
  }

  async function filterName(e) {
    if (e.target.value !== "") {
      const response = await api.get(`/encarregados?nome=${e.target.value}`);
      setInCharges(response.data.docs);
    } else {
      const response = await api.get("/encarregados");
      setInCharges(response.data.docs);
    }
  }

  function pagePrevious() {
    if (numberPage === 1) return;
    const numberOfPages = numberPage - 1;
    setNumberPage(numberOfPages);
  }

  function pageNext() {
    if (numberPage === inChargesRest.pages) return;
    const numberOfPages = numberPage + 1;

    setNumberPage(numberOfPages);
  }

  return (
    <Container>
      <SideBar />
      <Content>
        <h1>Encarregado</h1>
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
                <th>Setor</th>
                <th>Ação</th>
              </tr>
            </thead>
            <tbody>
              {inCharges.map(inCharge => {
                return (
                  <tr key={inCharge._id}>
                    <td>
                      {!inCharge.funcionario ? null : inCharge.funcionario.nome}
                    </td>
                    <td>{inCharge.setor}</td>
                    <td>
                      <Link to={`/cadencarregado/${inCharge._id}`}>
                        <IoMdCreate />
                      </Link>
                      <Link
                        to="#"
                        onClick={() => {
                          if (
                            window.confirm(
                              `Deseja excluir o(a) ${
                                !inCharge.funcionario
                                  ? null
                                  : inCharge.funcionario.nome
                              }`
                            )
                          )
                            destroy(inCharge._id);
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
              Quantidade de Encarregado: <small>{inChargesRest.total}</small>
            </strong>
            <strong>
              Número de páginas: <small>{inChargesRest.pages}</small>
            </strong>
            <strong>
              Página atual: <small>{inChargesRest.page}</small>
            </strong>
          </Dados>
          <button onClick={pageNext}>Próximo</button>
        </Footer>
      </Content>
    </Container>
  );
}
