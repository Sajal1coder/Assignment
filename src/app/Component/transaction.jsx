import { addTransaction, editTransaction, deleteTransaction } from '../../../Redux/store';
import { useSelector, useDispatch } from 'react-redux';
import React, { useState } from 'react';
import TransactionForm from './transactionform';

export const Transactions = () => {
    const transactions = useSelector(state => state.transactions);
    const exchangeRates = useSelector(state => state.exchangeRates.rates);
    const dispatch = useDispatch();
    const [editingTransaction, setEditingTransaction] = useState(null);
    const [displayCurrency, setDisplayCurrency] = useState('USD');

    const handleAdd = (transaction) => {
        dispatch(addTransaction({ ...transaction, id: Date.now() }));
        setEditingTransaction(null);
    };

    const handleEdit = (transaction) => {
        dispatch(editTransaction(transaction));
        setEditingTransaction(null);
    };

    const handleDelete = (id) => {
        dispatch(deleteTransaction(id));
    };

    return (
        <div className="p-4">
            <div className="bg-white p-4 rounded shadow mb-4">
                <h2 className="text-xl font-bold">Add Transaction</h2>
                <TransactionForm onSave={handleAdd} />
            </div>
            <div className="bg-white p-4 rounded shadow">
                <h2 className="text-xl font-bold">Transactions</h2>
                <div className="mb-4">
                    <label className="block text-gray-700">Display in Currency</label>
                    <select value={displayCurrency} onChange={(e) => setDisplayCurrency(e.target.value)} className="w-full p-2 border rounded">
                        {Object.keys(exchangeRates).map((currency) => (
                            <option key={currency} value={currency}>{currency}</option>
                        ))}
                    </select>
                </div>
                <table className="w-full mt-4">
                    <thead>
                        <tr>
                            <th className="border p-2">Type</th>
                            <th className="border p-2">Category</th>
                            <th className="border p-2">Amount ({displayCurrency})</th>
                            <th className="border p-2">Date</th>
                            <th className="border p-2">Description</th>
                            <th className="border p-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {transactions.map(transaction => (
                            <tr key={transaction.id}>
                                <td className="border p-2">{transaction.type}</td>
                                <td className="border p-2">{transaction.category}</td>
                                <td className="border p-2">
                                    {exchangeRates[displayCurrency] 
                                        ? (transaction.amount * exchangeRates[displayCurrency]).toFixed(2) 
                                        : transaction.amount} {displayCurrency}
                                </td>
                                <td className="border p-2">{transaction.date}</td>
                                <td className="border p-2">{transaction.description}</td>
                                <td className="border p-2">
                                    <button onClick={() => setEditingTransaction(transaction)} className="text-blue-500 mr-2">edit</button>
                                    <button onClick={() => handleDelete(transaction.id)} className="text-red-500">delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {editingTransaction && (
                    <div className="mt-4">
                        <h2 className="text-xl font-bold">Edit Transaction</h2>
                        <TransactionForm transaction={editingTransaction} onSave={handleEdit} />
                    </div>
                )}
            </div>
        </div>
    );
};
