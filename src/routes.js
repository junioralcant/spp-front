import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import Home from "./pages/Home";
import CadFuncionario from "./pages/CadFuncionario";
import CadEncarregado from "./pages/CadEncarregado";
import CadLinha from "./pages/CadLinha";
import CadHotel from "./pages/Hotel";
import CadLoja from "./pages/Loja";
import CadRestaurante from "./pages/Restaurante";
import CadPosto from "./pages/Posto";
import CadProprietario from "./pages/Proprietario";
import CadVeiculo from "./pages/Veiculo";

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
      {/* <PrivateRoute path="/" exact component={Main} />
      <PrivateRoute path="/financeiro" component={Financeiro} />
      <PrivateRoute exact path="/produto" component={Produto} />
      <PrivateRoute path="/produto/edit/:id" component={Produto} /> */}

      <Route path="*" component={() => <h1>Page not found</h1>} />
    </Switch>
  </BrowserRouter>
);

export default Routes;
