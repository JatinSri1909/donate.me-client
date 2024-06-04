import React from 'react';
import './App.css';
import DonationForm from './components/donationForm';

const App = () => {
    return (
        <div className="App">
            <div className="header-bar">
                <h1>Donate.me</h1>
            </div>
            <DonationForm />
        </div>
    );
};

export default App;