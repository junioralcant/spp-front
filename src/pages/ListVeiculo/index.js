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

export default function ListVehicle({ history }) {
  const [vehicles, setVehicles] = useState([]);
  const [numberPage, setNumberPage] = useState(1);
  const [vehiclesRest, setVehiclesRest] = useState([]);

  useEffect(() => {
    async function loadVehicles(page = numberPage) {
      const response = await api.get(`/veiculos?page=${page}`);
      const { docs, ...restVehicles } = response.data;

      setVehicles(docs);
      setVehiclesRest(restVehicles);
    }

    loadVehicles();
  }, [numberPage]);

  async function destroy(id) {
    await api.delete(`/veiculos/${id}`);
    const response = await api.get("/veiculos");

    const { docs, ...restVehicles } = response.data;
    setVehicles(docs);
    setVehiclesRest(restVehicles);
  }

  async function filterModel(e) {
    if (e.target.value !== "") {
      const response = await api.get(`/veiculos?modelo=${e.target.value}`);
      setVehicles(response.data.docs);
    } else {
      const response = await api.get("/veiculos");
      setVehicles(response.data.docs);
    }
  }

  async function filterBoard(e) {
    if (e.target.value !== "") {
      const response = await api.get(`/veiculos?placa=${e.target.value}`);
      setVehicles(response.data.docs);
    } else {
      const response = await api.get("/veiculos");
      setVehicles(response.data.docs);
    }
  }

  async function filterChassi(e) {
    if (e.target.value !== "") {
      const response = await api.get(`/veiculos?chassi=${e.target.value}`);
      setVehicles(response.data.docs);
    } else {
      const response = await api.get("/veiculos");
      setVehicles(response.data.docs);
    }
  }

  function pagePrevious() {
    if (numberPage === 1) return;
    const numberOfPages = numberPage - 1;
    setNumberPage(numberOfPages);
  }

  function pageNext() {
    if (numberPage === vehiclesRest.pages) return;
    const numberOfPages = numberPage + 1;

    setNumberPage(numberOfPages);
  }

  return (
    <>
      <SideBar />

      <Container>
        <Content>
          <h1>Veículos</h1>
          <Pesquisa>
            <input
              onChange={filterModel}
              type="text"
              name="nome"
              placeholder="Pesquisar por modelo"
            />

            <input
              onChange={filterBoard}
              type="text"
              name="nome"
              placeholder="Pesquisar por placa"
            />

            <input
              onChange={filterChassi}
              type="text"
              name="nome"
              placeholder="Pesquisar por chassi"
            />
          </Pesquisa>
          <Table>
            <table>
              <thead>
                <tr>
                  <th>Tipo</th>
                  <th>Proprietário</th>
                  <th>Placa</th>
                  <th>Chassi</th>
                  <th>Número de Série</th>
                  <th>Status</th>
                  <th>Ano</th>
                  <th>Modelo</th>
                  <th>Ação</th>
                </tr>
              </thead>
              <tbody>
                {vehicles.map(vehicle => {
                  return (
                    <tr key={vehicle._id}>
                      <td>{vehicle.tipo}</td>
                      <td>{vehicle.proprietario.nome}</td>
                      <td>{vehicle.placa}</td>
                      <td>{vehicle.chassi}</td>
                      <td>{vehicle.numeroDeSerie}</td>
                      <td>{vehicle.status}</td>
                      <td>{vehicle.ano}</td>
                      <td>{vehicle.modelo}</td>
                      <td>
                        <Link to={`/cadveiculo/${vehicle._id}`}>
                          <IoMdCreate />
                        </Link>
                        <Link
                          to="#"
                          onClick={() => {
                            if (
                              window.confirm(
                                `Deseja excluir o(a) veículo com placa ${vehicle.placa} ?`
                              )
                            )
                              destroy(vehicle._id);
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
                Quantidade de Veículos: <small>{vehiclesRest.total}</small>
              </strong>
              <strong>
                Número de páginas: <small>{vehiclesRest.pages}</small>
              </strong>
              <strong>
                Página atual: <small>{vehiclesRest.page}</small>
              </strong>
            </Dados>
            <button onClick={pageNext}>Próximo</button>
          </Footer>
        </Content>
      </Container>
    </>
  );
}
