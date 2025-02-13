import { useSelector } from 'react-redux';
import React, { useState, useEffect } from 'react';

const TransactionForm = ({ transaction, onSave }) => {
    const exchangeRates = useSelector(state => state.exchangeRates.rates); // Get exchange rates
    const categories = useSelector(state => state.categories);
    const [formData, setFormData] = useState(transaction || { type: 'income', category: 'Food', amount: 0, date: '', description: '', currency: 'USD' });
    const [convertedAmount, setConvertedAmount] = useState(formData.amount);

    // Update converted amount whenever currency or amount changes
    useEffect(() => {
        if (exchangeRates[formData.currency]) {
            setConvertedAmount((formData.amount / exchangeRates[formData.currency]).toFixed(2)); // Convert to base USD
        }
    }, [formData.amount, formData.currency, exchangeRates]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave({ ...formData, amount: parseFloat(convertedAmount) }); // Save in base currency
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow">
            <div className="mb-4">
                <label className="block text-gray-700">Type</label>
                <select name="type" value={formData.type} onChange={handleChange} className="w-full p-2 border rounded">
                    <option value="income">Income</option>
                    <option value="expense">Expense</option>
                </select>
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">Category</label>
                <select name="category" value={formData.category} onChange={handleChange} className="w-full p-2 border rounded">
                    {categories.map(category => (
                        <option key={category} value={category}>{category}</option>
                    ))}
                </select>
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">Amount</label>
                <input type="number" name="amount" value={formData.amount} onChange={handleChange} className="w-full p-2 border rounded" />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">Currency</label>
                <select name="currency" value={formData.currency} onChange={handleChange} className="w-full p-2 border rounded">
                    {Object.keys(exchangeRates).map((currency) => (
                        <option key={currency} value={currency}>{currency}</option>
                    ))}
                </select>
            </div>
            <p className="text-gray-700">Converted Amount (USD): ${convertedAmount}</p>
            <div className="mb-4">
                <label className="block text-gray-700">Date</label>
                <input type="date" name="date" value={formData.date} onChange={handleChange} className="w-full p-2 border rounded" />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">Description</label>
                <input type="text" name="description" value={formData.description} onChange={handleChange} className="w-full p-2 border rounded" />
            </div>
            <button type="submit" className="bg-blue-500 text-white p-2 rounded">Save</button>
        </form>
    );
};

export default TransactionForm;
