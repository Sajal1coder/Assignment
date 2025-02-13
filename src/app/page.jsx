'use client'
import React from 'react';
import '../app/globals.css'
import { useSelector, useDispatch } from 'react-redux';

import Chart from 'chart.js/auto';
import { fetchExchangeRates } from '../../Redux/store'; // Ensure this is correctly imported
import Dashboard from './Component/dashboard';
import { Transactions } from './Component/transaction';
import { Budget } from './Component/budget';

const App = () => {
    const dispatch = useDispatch();
    React.useEffect(() => {
        dispatch(fetchExchangeRates());
    }, [dispatch]);

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold text-center mb-4">Personal Finance Tracker</h1>
            <div className=" grid-cols-1 md:grid-cols-2 sm:grid-cols-3 gap-2">
                <Dashboard />
                <Transactions/>
                <Budget />
            </div>
        </div>
    );
};

export default App;
