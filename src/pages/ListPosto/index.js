import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IoIosTrash, IoMdCreate, IoMdAddCircleOutline } from "react-icons/io";

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

export default function ListPosto({ history }) {
  const [gasStations, setGasStations] = useState([]);
  const [numberPage, setNumberPage] = useState(1);
  const [gasStationsRest, setGasStationsRest] = useState([]);

  useEffect(() => {
    async function loadGasStations(page = numberPage) {
      const response = await api.get(`/postos?page=${page}`);
      const { docs, ...restGasStatios } = response.data;

      setGasStations(docs);
      setGasStationsRest(restGasStatios);
    }

    loadGasStations();
  }, [numberPage]);

  async function destroy(id) {
    await api.delete(`/postos/${id}`);
    const response = await api.get("/postos");

    const { docs, ...restGasStatios } = response.data;
    setGasStations(docs);
    setGasStationsRest(restGasStatios);
  }

  async function filterName(e) {
    if (e.target.value !== "") {
      const response = await api.get(`/postos?nome=${e.target.value}`);
      setGasStations(response.data.docs);
    } else {
      const response = await api.get("/postos");
      setGasStations(response.data.docs);
    }
  }

  async function filterCnpjCpf(e) {
    if (e.target.value !== "") {
      const response = await api.get(`/postos?cnpj_cpf=${e.target.value}`);
      setGasStations(response.data.docs);
    } else {
      const response = await api.get("/postos");
      setGasStations(response.data.docs);
    }
  }

  function pagePrevious() {
    if (numberPage === 1) return;
    const numberOfPages = numberPage - 1;
    setNumberPage(numberOfPages);
  }

  function pageNext() {
    if (numberPage === gasStationsRest.pages) return;
    const numberOfPages = numberPage + 1;

    setNumberPage(numberOfPages);
  }

  return (
    <>
      <SideBar />

      <Container>
        <Content>
          <h1>Postos</h1>
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
                  <th>CNPJ/CPF</th>
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
                {gasStations.map(gasStation => {
                  return (
                    <tr key={gasStation._id}>
                      <td>{gasStation.nome}</td>
                      <td>{gasStation.cnpj}</td>
                      <td>{gasStation.cep}</td>
                      <td>{gasStation.estado}</td>
                      <td>{gasStation.cidade}</td>
                      <td>{gasStation.bairro}</td>
                      <td>{gasStation.endereco}</td>
                      <td>{gasStation.numeroCasa}</td>
                      <td>{gasStation.telefone}</td>
                      <td>{gasStation.whatsapp}</td>
                      <td>
                        <Link to={`/cadposto/${gasStation._id}`}>
                          <IoMdCreate />
                        </Link>
                        <Link to={`/detailsposto/${gasStation._id}`}>
                          <IoMdAddCircleOutline />
                        </Link>
                        <Link
                          to="#"
                          onClick={() => {
                            if (
                              window.confirm(
                                `Deseja excluir o(a) ${gasStation.nome}`
                              )
                            )
                              destroy(gasStation._id);
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
                Quantidade de Postos: <small>{gasStationsRest.total}</small>
              </strong>
              <strong>
                Número de páginas: <small>{gasStationsRest.pages}</small>
              </strong>
              <strong>
                Página atual: <small>{gasStationsRest.page}</small>
              </strong>
            </Dados>
            <button onClick={pageNext}>Próximo</button>
          </Footer>
        </Content>
      </Container>
    </>
  );
}
