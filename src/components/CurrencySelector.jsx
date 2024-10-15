const CurrencySelector = ({ currencies, selectedCurrency, onCurrencyChange, label }) => {
  return (
    <div>
      <label className="block text-gray-700 text-sm font-bold mb-2">{label}</label>
      <select
        className="w-full bg-gray-200 border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        value={selectedCurrency}
        onChange={onCurrencyChange}
      >
        {currencies.map((currency, index) => (
          <option key={index} value={currency}>
            {currency}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CurrencySelector;
