import { Link } from "react-router-dom";

function Main(props) {
  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-24 mx-auto text-center">
        <div className="flex flex-col text-center w-full">
          <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">Currency Converter</h1>
        </div>
        {!props.isLoading && !props.output && (
          <div>
            <p className="text-base text-center pb-1">To convert currency write for expamle "15 eur in uah"</p>

            <form className="flex justify-center" onSubmit={props.convertRequest}>
              <input
                type="text"
                id="converter"
                className="w-50 bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-transparent focus:ring-2 focus:ring-indigo-200 text-lg outline-none text-gray-700 py-1 px-3 leading-[2.1rem] transition-colors duration-200 ease-in-out"
              />

              <button className="text-white bg-indigo-500 border-0 py-2 px-8 mx-1 focus:outline-none hover:bg-indigo-600 rounded text-lg">Convert</button>
            </form>
          </div>
        )}
        {props.isLoading && (
          <svg role="status" className="inline w-8 h-8 text-gray-200 animate-spin fill-indigo-500" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
        )}
        {!props.isLoading && props.output && (
          <div>
            <p className="text-xl text-center">{props.output}</p>
            <button onClick={props.reset} className="text-white bg-indigo-500 border-0 py-2 px-4 mx-1 focus:outline-none hover:bg-indigo-600 rounded mt-2 leading-8">
              Convert another currency
            </button>
          </div>
        )}
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
