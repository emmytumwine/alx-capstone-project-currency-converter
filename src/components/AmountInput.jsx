const AmountInput = ({ amount, onAmountChange }) => {
  return (
    <div>
      <label className="block text-gray-700 text-sm font-bold mb-2">Amount</label>
      <input
        type="number"
        className="w-full bg-gray-200 border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        value={amount}
        onChange={onAmountChange}
        min="0"
      />
    </div>
  );
};

export default AmountInput;
