import React, { Component } from "react";
import { Routes, Route } from "react-router-dom";
import Main from "./Components/Main/Main";
import PokeInfo from "./Components/PokeInfo/PokeInfo";
import Prueba from "./Components/PokeInfo/prueba";

export default class routerURL extends Component {
  render() {
    return (
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/pokemon/:id" element={<PokeInfo />} />
      </Routes>
    );
  }
}