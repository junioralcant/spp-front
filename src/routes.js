import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import Home from "./pages/Home";
import CadFuncionario from "./pages/CadFuncionario";
import CadEncarregado from "./pages/CadEncarregado";

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/home" component={Home} />
      <Route exact path="/cadfuncionario" component={CadFuncionario} />
      <Route path="/cadfuncionario/:id" component={CadFuncionario} />
      <Route exact path="/cadencarregado" component={CadEncarregado} />
      <Route path="/cadencarregado/:id" component={CadEncarregado} />

      {/* <PrivateRoute path="/" exact component={Main} />
      <PrivateRoute path="/financeiro" component={Financeiro} />
      <PrivateRoute exact path="/produto" component={Produto} />
      <PrivateRoute path="/produto/edit/:id" component={Produto} /> */}

      <Route path="*" component={() => <h1>Page not found</h1>} />
    </Switch>
  </BrowserRouter>
);

export default Routes;
