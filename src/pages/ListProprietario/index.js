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

export default function ListProprietario({ history }) {
  const [owners, setOwners] = useState([]);
  const [numberPage, setNumberPage] = useState(1);
  const [ownersRest, setOwnersRest] = useState([]);

  useEffect(() => {
    async function loadOwners(page = numberPage) {
      const response = await api.get(`/proprietarios?page=${page}`);
      const { docs, ...restStore } = response.data;

      setOwners(docs);
      setOwnersRest(restStore);
    }

    loadOwners();
  }, [numberPage]);

  async function destroy(id) {
    await api.delete(`/proprietarios/${id}`);
    const response = await api.get("/proprietarios");

    const { docs, ...restWoner } = response.data;
    setOwners(docs);
    setOwnersRest(restWoner);
  }

  async function filterName(e) {
    if (e.target.value !== "") {
      const response = await api.get(`/proprietarios?nome=${e.target.value}`);
      setOwners(response.data.docs);
    } else {
      const response = await api.get("/proprietarios");
      setOwners(response.data.docs);
    }
  }

  async function filterCnpjCpf(e) {
    if (e.target.value !== "") {
      const response = await api.get(
        `/proprietarios?cnpj_cpf=${e.target.value}`
      );
      setOwners(response.data.docs);
    } else {
      const response = await api.get("/proprietarios");
      setOwners(response.data.docs);
    }
  }

  function pagePrevious() {
    if (numberPage === 1) return;
    const numberOfPages = numberPage - 1;
    setNumberPage(numberOfPages);
  }

  function pageNext() {
    if (numberPage === ownersRest.pages) return;
    const numberOfPages = numberPage + 1;

    setNumberPage(numberOfPages);
  }

  return (
    <Container>
      <SideBar />
      <Content>
        <h1>Proprietários</h1>
        <Pesquisa>
          <input
            onChange={filterName}
            type="text"
            name="nome"
            placeholder="Pesquisar por nome"
          />

          <input
            onChange={filterCnpjCpf}
            type="text"
            name="nome"
            placeholder="Pesquisar por CNPJ/CPF"
          />
        </Pesquisa>
        <Table>
          <table>
            <thead>
              <tr>
                <th>Nome</th>
                <th>CNPJ</th>
                <th>CEP</th>
                <th>Estado</th>
                <th>Cidade</th>
                <th>Bairro</th>
                <th>Endereço</th>
                <th>Número do Estabelecimento</th>
                <th>Telefone</th>
                <th>Whatsapp</th>
                <th>Ação</th>
              </tr>
            </thead>
            <tbody>
              {owners.map(woner => {
                return (
                  <tr key={woner._id}>
                    <td>{woner.nome}</td>
                    <td>{woner.cnpj}</td>
                    <td>{woner.cep}</td>
                    <td>{woner.estado}</td>
                    <td>{woner.cidade}</td>
                    <td>{woner.bairro}</td>
                    <td>{woner.endereco}</td>
                    <td>{woner.numeroCasa}</td>
                    <td>{woner.telefone}</td>
                    <td>{woner.whatsapp}</td>
                    <td>
                      <Link to={`/cadproprietario/${woner._id}`}>
                        <IoMdCreate />
                      </Link>
                      <Link
                        to="#"
                        onClick={() => {
                          if (
                            window.confirm(`Deseja excluir o(a) ${woner.nome}`)
                          )
                            destroy(woner._id);
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
              Quantidade de proprietarios: <small>{ownersRest.total}</small>
            </strong>
            <strong>
              Número de páginas: <small>{ownersRest.pages}</small>
            </strong>
            <strong>
              Página atual: <small>{ownersRest.page}</small>
            </strong>
          </Dados>
          <button onClick={pageNext}>Próximo</button>
        </Footer>
      </Content>
    </Container>
  );
}
