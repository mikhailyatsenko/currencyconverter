import { Link } from "react-router-dom";
import { useRef } from "react";

function Main(props) {
  const fromCurrency = useRef();
  const toCurrency = useRef();
  const fromAmount = useRef();
  const toAmount = useRef();

  function getAndSendData() {
    fromAmount.current.value = fromAmount.current.value.replace(/[^\d.]/g, "");
    const currencyData = {
      fromCurrency: fromCurrency.current.value,
      toCurrency: toCurrency.current.value,
      fromAmount: fromAmount.current.value,
    };

    if (currencyData.fromAmount) {
      props.convertRequest(currencyData);
      console.log("данные, которые берем со страницы", currencyData);
    }
  }

  return (
    <section className="height100 flex items-center text-gray-600 body-font">
      {props.isLoading && (
        <div className="load-bar">
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
        </div>
      )}
      <div className="container mx-auto text-center">
        <div className="flex flex-col text-center w-full">
          <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">Currency Converter</h1>
        </div>
        <div>
          <p className="text-base text-center pb-1">To convert currency type amount fill in the following fields:</p>

          <div className="py-1 flex justify-center flex-wrap">
            <input
              onChange={getAndSendData}
              ref={fromAmount}
              placeholder="from"
              required
              autoFocus
              autoComplete="off"
              id="converter"
              size="7"
              className="mr-1 bg-gray-100 bg-opacity-50 border border-x-0 border-t-0 border-gray-300 focus:bg-transparent focus:ring-indigo-200 outline-none text-gray-700 py-1 px-3 transition-colors duration-200 ease-in-out"
            />
            <select onChange={getAndSendData} ref={fromCurrency} id="currencies" className="max-w-fit border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 bg-indigo-200">
              <option value="UAH">UAH</option>
              <option value="EUR">EUR</option>
              <option value="USD">USD</option>
              <option value="GBP">GBP</option>
            </select>
          </div>
          <div className="py-1 flex justify-center flex-wrap">
            <input value={props.output} ref={toAmount} readOnly placeholder="to" id="converter" size="7" className="mr-1 border border-x-0 border-t-0 border-gray-300 focus:ring-indigo-200 outline-none text-gray-700 py-1 px-3 transition-colors duration-200 ease-in-out cursor-default" />
            <select ref={toCurrency} onChange={getAndSendData} id="currencies" className="max-w-fit border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 bg-indigo-200">
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
              <option value="UAH">UAH</option>
              <option value="GBP">GBP</option>
            </select>
          </div>
        </div>

        <p className="text-base mb-2 text-center">
          ...or click{" "}
          <Link className="font-bold text-indigo-500 hover:text-indigo-400" to="/rates">
            here
          </Link>{" "}
          to watch rates
        </p>
      </div>
    </section>
  );
}

export default Main;
