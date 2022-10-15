import React from "react";
import Converter from "./containers/Converter";
import RatesLoader from "./containers/RatesLoader";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Converter />} />
        <Route path="/rates" element={<RatesLoader />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
