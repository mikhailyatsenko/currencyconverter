import Main from "../components/Main";
import { useState } from "react";

function Converter() {
  const [output, setOutput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function convertRequest(event) {
    event.preventDefault();

    setIsLoading(true);

    const whatToConvert = event.target.converter.value;
    const whatToConvertArray = whatToConvert.split(" ");
    const url = `https://vast-hollows-60031.herokuapp.com?amount=${whatToConvertArray[0]}&from=${whatToConvertArray[1]}&to=${whatToConvertArray[3]}`;

    fetch(url)
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        setOutput(`${Math.round(response.fromAmount * 100) / 100} ${response.from} is ${Math.round(response.toAmount * 100) / 100} ${response.to}`);
        setIsLoading(false);
      });
  }

  function reset() {
    setOutput("");
  }

  return <Main convertRequest={convertRequest} output={output} isLoading={isLoading} reset={reset} />;
}

export default Converter;
