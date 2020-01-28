import React, { useState, useEffect } from "react";
import { formatToTimeZone } from "date-fns-timezone";
import { Form, Input, Select as SelectUnform } from "unform";
import Select from "react-select";
import toastr from "toastr";
import "toastr/build/toastr.min.css";

import { colorStyle } from "../../styles/select";
import { Container, ContentForm } from "../../styles/form";
import api from "../../services/api";

export default function CadNotaLoja({ history, match }) {
  const [data, setData] = useState({});
  const [inCharges, setInCharges] = useState();
  const [vehicles, setVehicles] = useState();
  const [lines, setLines] = useState();
  const [stores, setStores] = useState();
  const [selectInCharges, setSelectInCharge] = useState();
  const [selectStores, setSelectStores] = useState("");
  const [selectVehicles, setSelectVehicles] = useState();
  const [selectLines, setSelectLines] = useState();

  useEffect(() => {
    async function loadInCharges() {
      const response = await api.get("/encarregados");
      setInCharges(response.data.docs);
    }

    loadInCharges();
  }, []);

  useEffect(() => {
    async function loadStore() {
      const response = await api.get("/lojas");
      setStores(response.data.docs);
    }

    loadStore();
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
        !data.total ||
        !data.data ||
        !selectInCharges ||
        !selectStores ||
        !data.tipoDePagamento
      ) {
        toastr.error(`Preencha todos os campos obrigatórios (*)!
        `);
      } else {
        try {
          data.encarregado = selectInCharges;
          data.loja = selectStores;
          data.veiculo = selectVehicles;
          data.linha = selectLines;
          await api.postOrPut("/notaslojas", match.params.id, data);
          toastr.success(`Nota Loja cadastrado com sucesso!
          `);
          setTimeout(() => history.go(0), 1000);
        } catch (error) {
          toastr.error(error.response.data.error);
        }
      }
    } else {
      try {
        data.encarregado = selectInCharges;
        data.loja = selectStores;
        data.veiculo = selectVehicles;
        data.linha = selectLines;
        await api.postOrPut("/notaslojas", match.params.id, data);
        toastr.success(`Alteração feita com sucesso!`);
        history.push("/notaloja");
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
        const response = await api.get(`/notaslojas/${id}`);

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

  const optionsExistentsStores = data.loja != null && {
    id: data.loja._id,
    name: data.loja.nome
  };
  const optionsExistentsInCharges = data.encarregado != null && {
    id: data.encarregado._id,
    name: data.encarregado.nome
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
      setSelectStores(optionsExistentsStores.id);
      setInCharge(optionsExistentsInCharges.id);
      setSelectVehicles(optionsExistentsVehicles.id);
      setSelectLines(optionsExistentsLines.id);
    }
  }, [
    match.params,
    optionsExistentsStores.id,
    optionsExistentsInCharges.id,
    optionsExistentsVehicles.id,
    optionsExistentsLines.id
  ]);

  function setStore(value) {
    setSelectStores(value);
  }

  function setInCharge(value) {
    setSelectInCharge(value);
  }

  function setVehicle(value) {
    setSelectVehicles(value);
  }

  function setLine(value) {
    setSelectLines(value);
  }

  function canceled() {
    history.push("/notaloja");
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
        <h1>Cadastro de Nota Loja</h1>
        <ContentForm>
          <div>
            <div className="select">
              <span>Loja</span>
              <Select
                options={stores}
                placeholder={optionsExistentsStores.name}
                styles={colorStyle}
                getOptionLabel={loja => loja.nome}
                getOptionValue={loja => loja._id}
                onChange={value => setStore(value._id)}
              />
            </div>
            <div className="select">
              <span>Encarregado</span>
              <Select
                options={inCharges}
                placeholder={optionsExistentsInCharges.name}
                styles={colorStyle}
                getOptionLabel={inCharge => inCharge.nome}
                getOptionValue={inCharge => inCharge._id}
                onChange={value => setInCharge(value._id)}
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
              <span>Linha</span>
              <Select
                options={lines}
                placeholder={optionsExistentsLines.name}
                styles={colorStyle}
                getOptionLabel={line => line.nome}
                getOptionValue={line => line._id}
                onChange={value => setLine(value._id)}
              />
            </div>
            <Input name="tipoDeCompra" label="Tipo de Compra" />
          </div>

          <div>
            <Input name="numeroDeOrdem" label="Número da Ordem" />

            <SelectUnform
              name="tipoDePagamento"
              options={pagamento}
              value={data.tipoDePagamento}
              label="Tipo de Pagamento *"
            />
            <Input name="observacao" label="Observação" />
            <Input name="total" label="total" />
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
