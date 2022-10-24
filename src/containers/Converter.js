import Main from "../components/Main";
import { useState } from "react";

function Converter() {
  const [output, setOutput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function convertRequest(currencyData) {
    setIsLoading(true);
    sendToBackend(currencyData.fromCurrency, currencyData.toCurrency, currencyData.fromAmount);
  }

  async function sendToBackend(from, to, fromAmount) {
    const url = `http://localhost:3001?from=${from}&to=${to}`;
    let response = await fetch(url);
    let result = await response.json();
    console.log("пришло от бекенда", result);
    setOutput(Math.round(result.rate * fromAmount * 1000) / 1000);
    setIsLoading(false);
  }

  return <Main convertRequest={convertRequest} output={output} isLoading={isLoading} />;
}

export default Converter;
