import React, { useState } from 'react';
import axios from 'axios';
import './donationForm.css';

const DonationForm = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [amount, setAmount] = useState('0');

    const handleSubmit = async (event) => {
        event.preventDefault();

        const donation = {
            username,
            email,
            amount: Number(amount)
        };

        try{
            const response = await axios.post('http://localhost:5000/donate', donation);
            console.log(response.data);

            let options = {
                "key": "rzp_test_rra6k5Tcivl0qu", // Replace with your Razorpay key ID
                "amount": amount * 100, // Convert to smallest currency unit
                "currency": "INR",
                "name": "Donation",
                "description": "Test Transaction",
                "handler": function (response){
                    // Call your server to verify the payment
                    fetch('/donate/verify-payment', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            razorpayPaymentId: response.razorpay_payment_id,
                            razorpayOrderId: response.razorpay_order_id,
                            razorpaySignature: response.razorpay_signature
                        })
                    });

                    alert('Payment Successful');
                    // Reset the form
                    setUsername('');
                    setEmail('');
                    setAmount('0');
                },
                "prefill": {
                    "name": username,
                    "email": email
                },
                "theme": {
                    "color": "#7ae600"
                }
            };

            const rzp1 = new window.Razorpay(options);
            rzp1.open();
        } catch (error) {
            console.error(error);
        }
    };
    return (
        <form onSubmit={handleSubmit} className="donation-form">
            <h1>Donation Form</h1>
            <label>
                Username:
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
            </label>
            <label>
                Email:
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </label>
            <label>
                Donation Amount:
                <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} min="1" required />
            </label>
            <button type="submit">Donate</button>
        </form>
    );
};

export default DonationForm;