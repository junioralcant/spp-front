import React, { useState, useEffect } from "react";
import { formatToTimeZone } from "date-fns-timezone";
import { Form, Input } from "unform";
import Select from "react-select";
import toastr from "toastr";
import "toastr/build/toastr.min.css";

import { colorStyle } from "../../styles/select";
import { Container, ContentForm } from "../../styles/form";
import api from "../../services/api";

export default function CadNotaHotel({ history, match }) {
  const [data, setData] = useState({});
  const [inCharges, setInCharges] = useState();
  const [hotels, setHotels] = useState();
  const [selectInCharges, setSelectInCharge] = useState();
  const [selectHotels, setSelectHotels] = useState("");

  useEffect(() => {
    async function loadInCharges() {
      const response = await api.get("/encarregados");
      setInCharges(response.data.docs);
    }

    loadInCharges();
  }, []);

  useEffect(() => {
    async function loadHotel() {
      const response = await api.get("/hotels");
      setHotels(response.data.docs);
    }

    loadHotel();
  }, []);

  async function handlerSubmit(data) {
    if (!match.params.id) {
      if (
        !data.valorUnitario ||
        !data.quantidade ||
        !selectInCharges ||
        !selectHotels
      ) {
        toastr.error(`Preencha todos os campos obrigatórios (*)!
        `);
      } else {
        try {
          data.encarregado = selectInCharges;
          data.hotel = selectHotels;
          await api.postOrPut("/notashotels", match.params.id, data);
          toastr.success(`Nota Hotel cadastrado com sucesso!
          `);
          setTimeout(() => history.go(0), 1000);
        } catch (error) {
          toastr.error(error.response.data.error);
        }
      }
    } else {
      try {
        data.encarregado = selectInCharges;
        data.hotel = selectHotels;
        await api.postOrPut("/notashotels", match.params.id, data);
        toastr.success(`Alteração feita com sucesso!`);
        history.push("/notahotel");
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
        const response = await api.get(`/notashotels/${id}`);

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

  const optionsExistentsHotels = data.hotel != null && {
    id: data.hotel._id,
    name: data.hotel.nome
  };
  const optionsExistentsInCharges = data.encarregado != null && {
    id: data.encarregado._id,
    name: data.encarregado.nome
  };

  useEffect(() => {
    if (match.params.id) {
      setSelectHotels(optionsExistentsHotels.id);
      setSelectInCharge(optionsExistentsInCharges.id);
    }
  }, [match.params, optionsExistentsHotels.id, optionsExistentsInCharges.id]);

  function setHotel(value) {
    setSelectHotels(value);
  }

  function setInCharge(value) {
    setSelectInCharge(value);
  }

  function canceled() {
    history.push("/notahotel");
    setTimeout(() => history.go(0), 100);
  }

  return (
    <Container>
      <Form initialData={data} onSubmit={handlerSubmit}>
        <h1>Cadastro de Nota Hotel</h1>
        <ContentForm>
          <div>
            <div className="select">
              <span>Hotel</span>
              <Select
                options={hotels}
                placeholder={optionsExistentsHotels.name}
                styles={colorStyle}
                getOptionLabel={hotel => hotel.nome}
                getOptionValue={hotel => hotel._id}
                onChange={value => setHotel(value._id)}
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
            <Input name="valorUnitario" label="Valor Unitário" />
          </div>

          <div>
            <Input name="quantidade" label="Quantidade" />
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
