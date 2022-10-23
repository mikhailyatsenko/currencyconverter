import Main from "../components/Main";
import { useState } from "react";

function Converter() {
  const [output, setOutput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function convertRequest(currencyData) {
    setIsLoading(true);
    sendToBackend(currencyData.fromCurrency, currencyData.toCurrency, currencyData.fromAmount);
  }

  function sendToBackend(from, to, fromAmount) {
    const url = `https://vast-hollows-60031.herokuapp.com?from=${from}&to=${to}`;
    fetch(url)
      .then((response) => response.json())
      .then((response) => {
        console.log("ответ от бекенда", response);
        setOutput(Math.round(response.rate * fromAmount * 1000) / 1000);
        setIsLoading(false);
      });
  }

  return <Main convertRequest={convertRequest} output={output} isLoading={isLoading} />;
}

export default Converter;
