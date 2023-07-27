import './App.css';
import React from 'react';
import QuaggaBarcodeScanner from './Scanner/QuaggaBarcodeScanner/QuaggaBarcodeScanner';

const App = () => {
    return (
        <div className='App'>
            <QuaggaBarcodeScanner />
        </div>
    );
};

export default App;
