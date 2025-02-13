import { useSelector, useDispatch } from 'react-redux';
import React, { useEffect, useState } from 'react';
import { setBudget,updateSpent,fetchExchangeRates } from '../../../Redux/store';
export const Budget = () => {
    const budget = useSelector(state => state.budget);
    const dispatch = useDispatch();
    const [monthlyBudget, setMonthlyBudget] = React.useState(budget.monthlyBudget);
    const exchangeRates = useSelector(state => state.exchangeRates.rates);
    const exchangeStatus = useSelector(state => state.exchangeRates.status);
    const transactions = useSelector(state => state.transactions);
    const [currency, setCurrency] = useState('USD');
    const handleSave = () => {
        dispatch(setBudget(monthlyBudget));
    };
    useEffect(() => {
        const totalSpent = transactions
            .filter(t => t.type === 'expense')
            .reduce((acc, t) => acc + Number(t.amount), 0);
        dispatch(updateSpent(totalSpent)); // Update Redux store
    }, [transactions, dispatch]);
    const convertCurrency = (amount) => {
        return currency === 'USD' ? amount : (amount * (exchangeRates[currency] || 1)).toFixed(2);
    };

    return (
        <div className="p-4">
            <div className="bg-white p-4 rounded shadow">
                
                <h2 className="text-xl font-bold">Set Monthly Budget</h2>
                <div className="mb-4">
                    <label className="block text-gray-700">Monthly Budget</label>
                    
                    <input type="number" value={monthlyBudget} onChange={(e) => setMonthlyBudget(e.target.value)} className="w-full p-2 border rounded" />
                </div>
                <button onClick={handleSave} className="bg-blue-500 text-white p-2 rounded">Save</button>
            </div>
            <div className="bg-white p-4 rounded shadow mt-4">
                <h2 className="text-xl font-bold">Budget Overview</h2>
                <select
                    value={currency}
                    onChange={(e) => setCurrency(e.target.value)}
                    className="border p-2 rounded"
                >
                    <option value="USD">USD</option>
                    <option value="EUR">EUR</option>
                    <option value="INR">INR</option>
                    <option value="GBP">GBP</option>
                </select>
                <p className="text-gray-700">Monthly Budget: {convertCurrency(budget.monthlyBudget)} {currency}</p>
                <p className="text-gray-700">Spent: {convertCurrency(budget.spent)} {currency}</p>
                <p className={`text-2xl ${budget.spent > budget.monthlyBudget ? 'text-red-500' : 'text-green-500'}`}>
                    {budget.spent > budget.monthlyBudget ? 'Over Budget' : 'Within Budget'}
                </p>
            </div>
        </div>
    );
};