import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Home from "./pages/Home";
import CadFuncionario from "./pages/CadFuncionario";
import CadEncarregado from "./pages/CadEncarregado";
import CadLinha from "./pages/CadLinha";
import CadHotel from "./pages/CadHotel";
import CadLoja from "./pages/CadLoja";
import CadRestaurante from "./pages/CadRestaurante";
import CadPosto from "./pages/CadPosto";
import CadProprietario from "./pages/CadProprietario";
import CadVeiculo from "./pages/CadVeiculo";
import ListFuncionario from "./pages/ListFuncionario";
import ListLinha from "./pages/ListLinha";
import ListEncarregado from "./pages/ListEncarregado";
import ListHotel from "./pages/ListHotel";
import ListLoja from "./pages/ListLoja";
import ListPosto from "./pages/ListPosto";
import ListRestaurante from "./pages/ListRestaurante";
import ListVeiculo from "./pages/ListVeiculo";
import ListProprietario from "./pages/ListProprietario";

import DetailsFuncionario from "./pages/DetailsFuncionario";
import DetailsHotel from "./pages/DetailsHotel";
import DetailsLoja from "./pages/DetailsLoja";
import DetailsRestaurante from "./pages/DetailsRestaurante";

import NotaHotel from "./pages/NotaHotel";
import NotaLoja from "./pages/NotaLoja";
import NotaPosto from "./pages/NotaPosto";
import NotaRestaurante from "./pages/NotaRestaurante";
import NotaFazenda from "./pages/NotaFazenda";

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/home" component={Home} />
      <Route exact path="/cadfuncionario" component={CadFuncionario} />
      <Route path="/cadfuncionario/:id" component={CadFuncionario} />
      <Route exact path="/cadencarregado" component={CadEncarregado} />
      <Route path="/cadencarregado/:id" component={CadEncarregado} />
      <Route exact path="/cadlinha" component={CadLinha} />
      <Route path="/cadlinha/:id" component={CadLinha} />
      <Route exact path="/cadhotel" component={CadHotel} />
      <Route path="/cadhotel/:id" component={CadHotel} />
      <Route exact path="/cadloja" component={CadLoja} />
      <Route path="/cadloja/:id" component={CadLoja} />
      <Route exact path="/cadrestaurante" component={CadRestaurante} />
      <Route path="/cadrestaurante/:id" component={CadRestaurante} />
      <Route exact path="/cadposto" component={CadPosto} />
      <Route path="/cadposto/:id" component={CadPosto} />
      <Route exact path="/cadproprietario" component={CadProprietario} />
      <Route path="/cadproprietario/:id" component={CadProprietario} />
      <Route exact path="/cadveiculo" component={CadVeiculo} />
      <Route path="/cadveiculo/:id" component={CadVeiculo} />
      <Route path="/funcionario" component={ListFuncionario} />
      <Route path="/detailsfuncionario/:id" component={DetailsFuncionario} />
      <Route path="/linha" component={ListLinha} />
      <Route path="/encarregado" component={ListEncarregado} />
      <Route path="/hotel" component={ListHotel} />
      <Route path="/detailshotel/:id" component={DetailsHotel} />
      <Route path="/loja" component={ListLoja} />
      <Route path="/detailsloja/:id" component={DetailsLoja} />
      <Route path="/posto" component={ListPosto} />
      <Route path="/proprietario" component={ListProprietario} />
      <Route path="/veiculo" component={ListVeiculo} />
      <Route path="/restaurante" component={ListRestaurante} />
      <Route path="/detailsrestaurante/:id" component={DetailsRestaurante} />
      <Route exact path="/notahotel" component={NotaHotel} />
      <Route path="/notahotel/:id" component={NotaHotel} />
      <Route exact path="/notaloja" component={NotaLoja} />
      <Route path="/notaloja/:id" component={NotaLoja} />
      <Route exact path="/notaposto" component={NotaPosto} />
      <Route path="/notaposto/:id" component={NotaPosto} />
      <Route exact path="/notarestaurante" component={NotaRestaurante} />
      <Route path="/notarestaurante/:id" component={NotaRestaurante} />
      <Route exact path="/notafazenda" component={NotaFazenda} />
      <Route path="/notafazenda/:id" component={NotaFazenda} />

      {/* <PrivateRoute path="/" exact component={Main} />
      <PrivateRoute path="/financeiro" component={Financeiro} />
      <PrivateRoute exact path="/produto" component={Produto} />
      <PrivateRoute path="/produto/edit/:id" component={Produto} /> */}

      <Route path="*" component={() => <h1>Page not found</h1>} />
    </Switch>
  </BrowserRouter>
);

export default Routes;
