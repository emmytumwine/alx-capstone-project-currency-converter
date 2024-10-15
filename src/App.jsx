import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CurrencySelector from './components/CurrencySelector';
import AmountInput from './components/AmountInput';
import ConversionResult from './components/ConversionResult';

const App = () => {
  const [currencies, setCurrencies] = useState([]);
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [amount, setAmount] = useState(1);
  const [convertedAmount, setConvertedAmount] = useState(null);
  const [error, setError] = useState(null);

  const API_KEY = '2388ea6309b9d0ef0eae2863'; // Your valid API key
  const API_URL = `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/`;

  // Fetch the available currencies and rates on component mount
  useEffect(() => {
    const fetchCurrencies = async () => {
      try {
        const response = await axios.get(`${API_URL}${fromCurrency}`);
        const rates = response.data.conversion_rates;
        setCurrencies(Object.keys(rates));
      } catch (error) {
        console.error('Error fetching currencies:', error);
        setError('Failed to fetch currencies. Please try again later.');
      }
    };
    fetchCurrencies();
  }, [fromCurrency]);

  // Handle the conversion when the amount or selected currencies change
  useEffect(() => {
    if (fromCurrency && toCurrency && amount) {
      const fetchConversionRate = async () => {
        try {
          const response = await axios.get(`${API_URL}${fromCurrency}`);
          const rate = response.data.conversion_rates[toCurrency];
          const result = (amount * rate).toFixed(2);
          setConvertedAmount(result);
        } catch (error) {
          console.error('Error converting currencies:', error);
          setError('Conversion failed. Please try again.');
        }
      };
      fetchConversionRate();
    }
  }, [fromCurrency, toCurrency, amount]);

  return (
    <div className="app-container">
      <h1 className="text-3xl font-bold text-center mb-8">Currency Converter</h1>

      {/* Display error message if an error occurs */}
      {error && <p className="text-red-500 text-center">{error}</p>}

      <div className="conversion-box">
        <CurrencySelector
          currencies={currencies}
          selectedCurrency={fromCurrency}
          onCurrencyChange={e => setFromCurrency(e.target.value)}
          label="From Currency"
        />
        <CurrencySelector
          currencies={currencies}
          selectedCurrency={toCurrency}
          onCurrencyChange={e => setToCurrency(e.target.value)}
          label="To Currency"
        />
        <AmountInput
          amount={amount}
          onAmountChange={e => setAmount(e.target.value)}
        />
        {convertedAmount && (
          <ConversionResult result={`${convertedAmount} ${toCurrency}`} />
        )}
      </div>
    </div>
  );
};

export default App;
