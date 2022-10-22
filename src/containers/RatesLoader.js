import Rates from "../components/Rates";
import React, { useState, useEffect } from "react";

function RatesLoader() {
  const [outputRates, setOutputRates] = useState("");
  const [mainCurrency, setMainCurrency] = useState("UAH");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getRateFromLs();
  }, [mainCurrency, getRateFromLs]);

  function changeMainCurrency(event) {
    setMainCurrency(event.target.value);
    console.log(event.target.value);
  }

  function getRateFromLs() {
    let keyName = "ratesTo" + mainCurrency;
    const data = localStorage.getItem(keyName);
    if (!data) {
      return sendRequestToBackend();
    }
    const ratesFromLs = JSON.parse(data);
    if (Date.now() > ratesFromLs.ttl) {
      localStorage.removeItem(keyName);
      return sendRequestToBackend();
    }
    console.log("получаем курсы валют из локал сторадж", ratesFromLs.rates);
    setIsLoading(false);
    return setOutputRates(ratesFromLs.rates);
  }

  function sendRequestToBackend() {
    let url = `https://vast-hollows-60031.herokuapp.com/rates?to=${mainCurrency}`;
    fetch(url)
      .then((response) => response.json())
      .then((response) => {
        console.log("получаем курсы валют с бекэнда", response);
        saveRatesToLs(response);
        setOutputRates(response);
        setIsLoading(false);
      });
  }

  function saveRatesToLs(response) {
    let keyName = "ratesTo" + mainCurrency;
    const data = {
      rates: response,
      ttl: Date.now() + 1800000, //saving rate in LS for 30 min
    };
    localStorage.setItem(keyName, JSON.stringify(data));
  }

  return <Rates outputRates={outputRates} changeMainCurrency={changeMainCurrency} isLoading={isLoading} />;
}

export default RatesLoader;
