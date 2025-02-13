import { useSelector, useDispatch } from 'react-redux';
import { Line } from 'react-chartjs-2';
import { useState } from 'react';
const Dashboard = () => {
    const transactions = useSelector(state => state.transactions);
    const budget = useSelector(state => state.budget);
    const dispatch = useDispatch();
    const exchangeRates = useSelector(state => state.exchangeRates.rates);
    const exchangeStatus = useSelector(state => state.exchangeRates.status);

    const [currency, setCurrency] = useState('USD');
    const totalIncome = transactions.filter(t => t.type === 'income').reduce((acc, t) => acc +Number( t.amount), 0);
    const totalExpenses = transactions.filter(t => t.type === 'expense').reduce((acc, t) => acc + Number(t.amount), 0);
    const savings = totalIncome - totalExpenses;
    const convertCurrency = (amount) => {
        return currency === 'USD' ? amount : (amount * (exchangeRates[currency] || 1)).toFixed(2);
    };
 
    const data = {
        labels: transactions.map(t => t.date),
        datasets: [
            {
                label: 'Income',
                data: transactions.filter(t => t.type === 'income').map(t => t.amount),
                borderColor: 'green',
                fill: false
            },
            {
                label: 'Expenses',
                data: transactions.filter(t => t.type === 'expense').map(t => t.amount),
                borderColor: 'red',
                fill: false
            }
        ]
    };

    return (
        <div className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white p-4 rounded shadow">
                    <h2 className="text-xl font-bold">Total Income</h2>
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
                    <p className="text-green-500 text-2xl">{convertCurrency(totalIncome)} {currency}</p>
                </div>
                <div className="bg-white p-4 rounded shadow">
                    <h2 className="text-xl font-bold">Total Expenses</h2>
                    <p className="text-red-500 text-2xl">{convertCurrency(totalExpenses)} {currency}</p>
                </div>
                <div className="bg-white p-4 rounded shadow">
                    <h2 className="text-xl font-bold">Savings</h2>
                    <p className="text-blue-500 text-2xl">{convertCurrency(savings)} {currency}</p>
                </div>
            </div>
            <div className="bg-white p-4 rounded shadow mt-4">
                <h2 className="text-xl font-bold">Spending & Income Chart</h2>
                <Line data={data} />
            </div>
        </div>
    );
};
export default Dashboard;