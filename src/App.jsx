import { useState, useEffect } from "react";
import { InputBox } from "./components";
import useCurrencyInfo from "./hooks/useCurrencyInfo";
function App() {
  const [amount, setAmount] = useState(0);
  const [from, setFrom] = useState("usd");
  const [to, setTo] = useState("inr");
  const [convertedAmount, setConvertedAmount] = useState(0);

  const currencyInfo = useCurrencyInfo(from);
  const option = Object.keys(currencyInfo);

  const swap = () => {
    setFrom(to);
    setTo(from);
    setConvertedAmount(amount);
    setAmount(convertedAmount);
  };

  const convert = () => {
    setConvertedAmount(amount * currencyInfo[to]);
  };

  useEffect(() => {
    convert();
  }, [amount, from, to, convertedAmount, option, currencyInfo]);

  return (
    <div
      className="w-full h-screen flex flex-wrap justify-center items-center bg-cover bg-no-repeat"
      style={{
        backgroundImage: `url('https://www.bria.com.ph/wp-content/uploads/2022/07/Exchange-Rates.png')`,
      }}
    >
      <div className="w-full">
        <div className="w-full max-w-md mx-auto border border-gray-60 rounded-lg p-5 backdrop-blur-sm bg-white/30">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              convert();
            }}
          >
            <h1 className="text-center my-2 text-2xl backdrop-blur-sm text-green-950 font-bold">
              CURRENCY CONVERTER
            </h1>

            <div className="w-full mb-1 text-black">
              <InputBox
                label="From"
                amount={amount}
                currencyOption={option}
                onCurrencyChange={(currency) => setFrom(currency)}
                selectCurrency={from}
                onAmountChange={(amount) => setAmount(amount)}
              />
            </div>
            <div className="relative w-full h-0.5 text-black">
              <button
                type="button"
                className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 text-black px-2 py-0.5 size-16"
                onClick={swap}
              >
                <img src="https://cdn-icons-png.flaticon.com/128/2200/2200324.png" alt="buttonpng" border="0"/>

              </button>
            </div>
            <div className="w-full mt-1 mb-4 text-black">
              <InputBox
                label="To"
                amount={convertedAmount}
                currencyOption={option}
                onCurrencyChange={(currency) => setTo(currency)}
                selectCurrency={to}
                amountDisable
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
export default App;
