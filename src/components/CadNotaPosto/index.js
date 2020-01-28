import React, { useState, useEffect } from "react";
import { formatToTimeZone } from "date-fns-timezone";
import { Form, Input, Select as SelectUnform } from "unform";
import Select from "react-select";
import toastr from "toastr";
import "toastr/build/toastr.min.css";

import { colorStyle } from "../../styles/select";
import { Container, ContentForm } from "../../styles/form";
import api from "../../services/api";

export default function CadNotaPosto({ history, match }) {
  const [data, setData] = useState({});
  const [drivers, setDrivers] = useState();
  const [lines, setLines] = useState();
  const [gasStations, setGasStations] = useState();
  const [vehicles, setVehicles] = useState();
  const [selectDrivers, setSelectDrivers] = useState();
  const [selectGasStations, setSelectGasStations] = useState();
  const [selectLines, setSelectLines] = useState();
  const [selectVehicles, setSelectVehicles] = useState();

  useEffect(() => {
    async function loadDriver() {
      const response = await api.get("/funcionarios");
      setDrivers(response.data.docs);
    }

    loadDriver();
  }, []);

  useEffect(() => {
    async function loadGasStations() {
      const response = await api.get("/postos");
      setGasStations(response.data.docs);
    }

    loadGasStations();
  }, []);

  useEffect(() => {
    async function loadVehicles() {
      const response = await api.get("/veiculos");
      setVehicles(response.data.docs);
    }

    loadVehicles();
  }, []);

  useEffect(() => {
    async function loadLines() {
      const response = await api.get("/linhas");
      setLines(response.data.docs);
    }

    loadLines();
  }, []);

  async function handlerSubmit(data) {
    if (!match.params.id) {
      if (
        !data.valorUnitario ||
        !data.quantidade ||
        !selectDrivers ||
        !selectGasStations ||
        !data.tipoDePagamento
      ) {
        toastr.error(`Preencha todos os campos obrigatórios (*)!
        `);
      } else {
        try {
          data.motorista = selectDrivers;
          data.posto = selectGasStations;
          data.veiculo = selectVehicles;
          data.linha = selectLines;
          await api.postOrPut("/notaspostos", match.params.id, data);
          toastr.success(`Nota Posto cadastrado com sucesso!
          `);
          setTimeout(() => history.go(0), 1000);
        } catch (error) {
          toastr.error(error.response.data.error);
        }
      }
    } else {
      try {
        data.motorista = selectDrivers;
        data.posto = selectGasStations;
        data.veiculo = selectVehicles;
        data.linha = selectLines;
        await api.postOrPut("/notaspostos", match.params.id, data);
        toastr.success(`Alteração feita com sucesso!`);
        history.push("/notaposto");
        setTimeout(() => history.go(0), 1000);
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
        const response = await api.get(`/notaspostos/${id}`);

        setData(response.data);
      }
    }

    if (match.params.id) {
      loadData();
    }
  }, [match.params, match.params.id]);

  useEffect(
    () => {
      if (match.params.id) {
        const dataNote = formatToTimeZone(data.data, "YYYY-MM-DD", {
          timeZone: "Europe/Berlin"
        });

        setData({
          ...data,
          data: dataNote
        });
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [data.data, match.params.id]
  );

  const optionsExistentsGasStations = data.posto != null && {
    id: data.posto._id,
    name: data.posto.nome
  };
  const optionsExistentsDrivers = data.motorista != null && {
    id: data.motorista._id,
    name: data.motorista.nome
  };
  const optionsExistentsVehicles = data.veiculo != null && {
    id: data.veiculo._id,
    placa: data.veiculo.placa
  };
  const optionsExistentsLines = data.linha != null && {
    id: data.linha._id,
    name: data.linha.nome
  };

  useEffect(() => {
    if (match.params.id) {
      setSelectDrivers(optionsExistentsDrivers.id);
      setSelectGasStations(optionsExistentsGasStations.id);
      setSelectVehicles(optionsExistentsVehicles.id);
      setSelectLines(optionsExistentsLines.id);
    }
  }, [
    optionsExistentsDrivers.id,
    optionsExistentsGasStations.id,
    optionsExistentsVehicles.id,
    optionsExistentsLines.id
  ]);

  function setStore(value) {
    setSelectGasStations(value);
  }

  function setDriver(value) {
    setSelectDrivers(value);
  }

  function setVehicle(value) {
    setSelectVehicles(value);
  }

  function setLine(value) {
    setSelectLines(value);
  }

  function canceled() {
    history.push("/notaposto");
    setTimeout(() => history.go(0), 100);
  }

  const pagamento = [
    { id: "Avista", title: "Avista" },
    { id: "A prazo", title: "A prazo" },
    { id: "Transferência", title: "Transferência" }
  ];

  return (
    <Container>
      <Form initialData={data} onSubmit={handlerSubmit}>
        <h1>Cadastro de Nota Posto</h1>
        <ContentForm>
          <div>
            <div className="select">
              <span>Posto *</span>
              <Select
                options={gasStations}
                placeholder={optionsExistentsGasStations.name}
                styles={colorStyle}
                getOptionLabel={posto => posto.nome}
                getOptionValue={posto => posto._id}
                onChange={value => setStore(value._id)}
              />
            </div>
            <div className="select">
              <span>Motorista *</span>
              <Select
                options={drivers}
                placeholder={optionsExistentsDrivers.name}
                styles={colorStyle}
                getOptionLabel={driver => driver.nome}
                getOptionValue={driver => driver._id}
                onChange={value => setDriver(value._id)}
              />
            </div>
            <div className="select">
              <span>Placa do Veículo</span>
              <Select
                options={vehicles}
                placeholder={optionsExistentsVehicles.placa}
                styles={colorStyle}
                getOptionLabel={vehicle => vehicle.placa}
                getOptionValue={vehicle => vehicle._id}
                onChange={value => setVehicle(value._id)}
              />
            </div>
            <div className="select">
              <span>Linha *</span>
              <Select
                options={lines}
                placeholder={optionsExistentsLines.name}
                styles={colorStyle}
                getOptionLabel={line => line.nome}
                getOptionValue={line => line._id}
                onChange={value => setLine(value._id)}
              />
            </div>
            <Input name="numeroDaOrdem" label="Número da Ordem" />
          </div>

          <div>
            <Input name="valorUnitario" label="Valor Unitário *" />
            <Input name="quantidade" label="Quantidade *" />
            <SelectUnform
              name="tipoDePagamento"
              options={pagamento}
              value={data.tipoDePagamento}
              label="Tipo de Pagamento *"
            />
            <Input type="date" name="data" label="Data" />
          </div>
        </ContentForm>
        <div className="buttons">
          <button type="submit">Salvar</button>
          {match.params.id && (
            <button onClick={canceled} className="canceled" type="button">
              Cancelar
            </button>
          )}
        </div>
      </Form>
    </Container>
  );
}
