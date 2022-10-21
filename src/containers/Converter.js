import Main from "../components/Main";
import { useState } from "react";

function Converter() {
  const [output, setOutput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function convertRequest(currencyData) {
    setIsLoading(true);
    getRateFromLs(currencyData.fromCurrency, currencyData.toCurrency, currencyData.fromAmount);
  }

  function getRateFromLs(from, to, fromAmount) {
    let keyName = from + to;
    const data = localStorage.getItem(keyName);
    if (!data) {
      return sendToBackend(from, to, fromAmount);
    }
    const rateFromLs = JSON.parse(data);
    if (Date.now() > rateFromLs.ttl) {
      localStorage.removeItem(keyName);
      return sendToBackend(from, to, fromAmount);
    }
    console.log("взято из ЛС", Math.round(rateFromLs.rate * fromAmount * 1000) / 1000);
    return setOutput(Math.round(rateFromLs.rate * fromAmount * 1000) / 1000);
  }

  function sendToBackend(from, to, fromAmount) {
    const url = `http://localhost:3001?from=${from}&to=${to}`;
    fetch(url)
      .then((response) => response.json())
      .then((response) => {
        console.log("ответ от бекенда", response);
        saveRateToLs(from, to, response.rate);
        setOutput(Math.round(response.rate * fromAmount * 1000) / 1000);
        setIsLoading(false);
      });
  }

  function saveRateToLs(from, to, rate) {
    let keyName = from + to;
    const data = {
      rate: rate,
      ttl: Date.now() + 3600000, //saving rate in LS for an hour
    };
    localStorage.setItem(keyName, JSON.stringify(data));
  }

  return <Main convertRequest={convertRequest} output={output} isLoading={isLoading} />;
}

export default Converter;
