import Rates from "../components/Rates";
import React, { useState, useEffect } from "react";

function RatesLoader() {
  const [outputRates, setOutputRates] = useState("");
  const [mainCurrency, setMainCurrency] = useState("UAH");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    let url = `https://vast-hollows-60031.herokuapp.com/rates?to=${mainCurrency}`;
    fetch(url)
      .then((response) => response.json())
      .then((response) => {
        console.log("получаем курсы валют с бекэнда", response);
        setOutputRates(response);
        setIsLoading(false);
      });
  }, [mainCurrency]);

  function changeMainCurrency(event) {
    setMainCurrency(event.target.value);
    console.log(event.target.value);
  }

  return <Rates outputRates={outputRates} changeMainCurrency={changeMainCurrency} isLoading={isLoading} />;
}

export default RatesLoader;
